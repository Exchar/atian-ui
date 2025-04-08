import React, { forwardRef, RefObject, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition";
interface DataSourceObject{
    value:string
}

export type DataSourceType<T =  Record<string,any>> = T&DataSourceObject 

export interface AutoCompleteProps extends Omit<InputProps,'onSelect'>{
    /**定义数据源函数，可以返回一个数组或者promise */
    fetchSuggestions: (query:string)=>DataSourceType[] | Promise<DataSourceType[]>,
    /**选中下拉列表项的回调 */
    onSelect?: (item:DataSourceType)=>void,
    /**自定义下拉列表项模板函数 */
    renderOption?: (item:DataSourceType)=> React.ReactElement
    /**下拉列表的样式 */
    dropDownStyle?: React.CSSProperties,
}
interface DropDownProps{
    suggestions:DataSourceType[],
    onSelect:(item:DataSourceType)=>void,
    renderOption?:(item:DataSourceType)=>React.ReactElement,
    dropDownStyle?: React.CSSProperties,
    setShowDropDown:(val:boolean)=>void,
    changeSuggestions:(val:DataSourceType[])=>void,
    ref?: React.Ref<EDropdownProps>,
    loading?:boolean,
    showDropDown?:boolean,
}
interface EDropdownProps{
    handleKeyEvent:(e:React.KeyboardEvent<HTMLInputElement>)=>void,
    setHighlightIndex:(index:number)=>void,
}
const dropDownComponent:React.FC<DropDownProps> = forwardRef<EDropdownProps,DropDownProps>((props,ref) => {
    const {suggestions,onSelect,renderOption,
        dropDownStyle,setShowDropDown,
        showDropDown =  false,
        changeSuggestions,
        loading} = props
    const renderTemplate = useMemo(()=>{
        return renderOption ? renderOption : (item:DataSourceType) => <span>{item.value}</span>
    },[renderOption])
    // 设置高亮
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const highlight = (index: number)=> {
        if(index < 0){
            setHighlightIndex(suggestions.length>= 0 ? suggestions.length - 1 : -1)
        }else if(index >= suggestions.length) {
            setHighlightIndex(suggestions.length>0 ? 0 : -1)
        }else{
            setHighlightIndex(index)
        }

    }
    // 处理键盘事件
    const handleKeyEvent = (e:React.KeyboardEvent<HTMLInputElement>)=> {
        switch(e.code){
            case 'Enter': // enter
            {
                if(suggestions[highlightIndex]){
                    onSelect(suggestions[highlightIndex])
                }
                break;
            }
            case 'ArrowUp': // up
            {
                highlight(highlightIndex - 1)
                break;
            }
            case 'ArrowDown': // down
            {
                console.log('down',highlightIndex);
                highlight(highlightIndex + 1)
                break;
            }
            case 'Escape': // esc
            {
                setShowDropDown(false)
                break;
            }
            default:
                break;
        }
    }
    // 处理点击事件
    useImperativeHandle(ref,()=> ({
        handleKeyEvent,
        setHighlightIndex
    }),[handleKeyEvent])
    const generateSuggestions = useCallback(()=>{
        return suggestions.map((item,index) => {
            const classes = classNames('at-suggestion-item', {
                'item-highlighted': index === highlightIndex
            })
            // 这里的key是index是因为我们没有给item设置唯一的id，实际使用中应该给item设置唯一的id
            return <li key={index} onClick={()=>onSelect(item)} className={classes}>
                {renderTemplate(item)}
            </li>
        })
    },[suggestions,renderTemplate,highlightIndex,onSelect])
    const nodeRef = useRef(null)
    return (
        <Transition 
            in={showDropDown || loading} 
            nodeRef={nodeRef} 
            timeout={300} 
            appear
            animation="zoom-in-top"
            unmountOnExit
            onExited={()=>{
                changeSuggestions([])
            }}
        >
            <ul ref={nodeRef} className="at-suggestion-list" style={dropDownStyle}>
                {loading &&<Icon icon="spinner" spin className="at-suggestion-loading-icon">加载中</Icon>}
                {generateSuggestions()}
            </ul>
        </Transition>

    )
})
const DropDown = React.memo(dropDownComponent, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.suggestions) === JSON.stringify(nextProps.suggestions) 
    && prevProps.loading === nextProps.loading && prevProps.showDropDown === nextProps.showDropDown
    && JSON.stringify(prevProps.dropDownStyle) === JSON.stringify(nextProps.dropDownStyle)
})

/**
 * AutoComplete是一个自动补全的输入框，可以根据输入的内容动态加载数据，常用于搜索框的自动补全。
 * ### 引入方法
 * ```javascript
 * import { AutoComplete } from 'atian-ui'
 * ```
 * ### 代码示例
 * 
 * @param props 
 * @returns 
 */
export function AutoComplete(props:AutoCompleteProps) {
    const {
        fetchSuggestions,
        onSelect,
        value,
        renderOption,
        dropDownStyle,
        ...restProps
    } = props
    const [inputValue, setInputValue] = useState(()=>value as string);
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    const [loading,setLoading] = useState(false)
    const [showDropDown,setShowDropDown] = useState(false)
    const [debouncedValue] = useDebounce(inputValue, 500)
    const dropdownRef = React.useRef<EDropdownProps>(null)
    // 触发搜索的标志位，由于useRef的值不会随着组件的重新渲染而改变，所以可以用来保存状态
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    useClickOutside(componentRef as RefObject<HTMLDivElement>, () => {
        setShowDropDown(false)
    })
    useEffect(()=>{
        // console.log('执行了debounce',debouncedValue);
        
        if(debouncedValue && triggerSearch.current){
            // 触发搜索
            const results = fetchSuggestions(debouncedValue);
            if(results instanceof Promise){
                // 调用返回
                setLoading(true)
                results.then((data)=>{
                    setLoading(false)
                    setShowDropDown(data.length > 0)
                    setSuggestions(data)
                }).catch((err)=>{
                    setLoading(false)
                    throw new Error(err)
                })
            }else{
                setSuggestions(results)
                setShowDropDown(true)
                if(results.length > 0){
                    setShowDropDown(true)
                }
            }

    
        }else{
            setShowDropDown(false)
        }
        if(dropdownRef.current){
            dropdownRef.current.setHighlightIndex(-1)
        }
    },[debouncedValue,fetchSuggestions])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
        const value = (e.target.value || '').trim()
        setInputValue(value)
        triggerSearch.current = true
    }
    const handleDropdownSelect = (item:DataSourceType)=> {
        setInputValue(item.value)
        setShowDropDown(false)
        if(onSelect){
            onSelect(item)
        }
        triggerSearch.current = false
    }
    const handleKeyEvent = (e:React.KeyboardEvent<HTMLInputElement>)=> {
        console.log('handleKeyEvent',e.code,dropdownRef.current);
        if(dropdownRef.current){
            dropdownRef.current.handleKeyEvent(e)
        }
    }

    return (
        <>
        <div className="at-autocomplete" ref={componentRef}>
            <Input {...restProps} value={inputValue} onChange={handleChange} onKeyDown={handleKeyEvent}></Input>
            {<DropDown 
            setShowDropDown={setShowDropDown} 
            showDropDown={showDropDown} 
            loading={loading} 
            ref={dropdownRef} 
            dropDownStyle={dropDownStyle} 
            suggestions={suggestions} 
            changeSuggestions={setSuggestions} 
            onSelect={handleDropdownSelect} 
            renderOption={renderOption}
            ></DropDown>}
        </div>
        </>
    )
}
// custom option
// keyboard support
// debounce
// click outside to hide

export default AutoComplete;