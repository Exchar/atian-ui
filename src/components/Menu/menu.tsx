import { createContext, useState } from "react"
import classNames from "classnames"
import { MenuItemProps } from "./menu-item"
import React from "react"

export type MenuMode = 'horizontal'| 'vertical'
type SelectCallback =  (selectIndex:string)=> void
export interface MenuProps{
    /** 菜单的默认选中项 */
    defaultIndex?: string,
    /** 菜单的类型 */
    className?: string,
    /** 显示模式 */
    mode?: `${MenuMode}`,
    /** 自定义style */
    style?: React.CSSProperties,
    /** 选中menu的回调函数 */
    onSelect?: SelectCallback,
    /** 菜单的子元素 */
    children?: React.ReactNode,
    /** 菜单的默认展开子菜单 */
    defaultOpenSubmenus?: string[]
}

interface IMenuContext{
    index: string,
    onSelect?: SelectCallback,
    mode?: `${MenuMode}`,
    defaultOpenSubmenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({index: '0'})
/**
 * 导航菜单组件，可以用来展示网站的导航菜单。
 * ### 引入方法
 * ```javascript
 * import { Menu,MenuItem,SubMenu } from 'atian-ui'
 * ```
 * ### 代码示例
 * @param props 
 * @returns 
 */
export const Menu: React.FC<MenuProps> = (props)=> {
    const {
        className,
        mode = 'horizontal',
        style,
        children,
        defaultIndex = '0',
        onSelect,
        defaultOpenSubmenus = []
    } = props
    const [currentActive,setActive] = useState(defaultIndex)
    const classes = classNames('at-menu',className,{
        [`is-horizontal`]: mode!=='vertical',
        [`is-vertical`]: mode==='vertical',
    })
    const handleClick = (index: string)=> {
        setActive(index)
        if(onSelect){
            onSelect(index)
        }
    }
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive:'0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubmenus,
    }
    const renderChildren = ()=> {
        return React.Children.map(children,(child,index)=> {
            // ReactElement<P, React.FunctionComponent<P>>
            const childElement = child as React.ReactElement<MenuItemProps,React.FunctionComponent<MenuItemProps>>;
            const {displayName} = childElement.type;
            // console.log(childElement,name);
            
            if(displayName === 'MenuItem' || displayName==='SubMenu'){
                return React.cloneElement(childElement,{
                    index: index.toString()
                })
            }else{
                console.error('Warning: Menu has a child which is not a MenuItem component')
            }
        })
    }
    return (
        <ul className={classes} style={style} data-testid='test-menu'>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )

}

export default Menu;