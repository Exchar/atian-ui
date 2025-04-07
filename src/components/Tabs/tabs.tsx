import classNames from 'classnames';
import React, { useState } from 'react';
import { TabItemProps } from './tab-item';

export type TabsType = 'card' | 'line'
type SelectCallback = (selectIndex: string) => void
export interface TabsProps{
    defaultIndex?: number|string,
    className?: string,
    style?: React.CSSProperties,
    children?: React.ReactNode,
    onSelect?: SelectCallback,
    type?: TabsType,
    tabsHeight?: number
}
export default function Tabs(props:TabsProps){
    const {
        className,
        style,
        children,
        defaultIndex = '0',
        onSelect,
        type = 'line',
        tabsHeight = 32
    } = props
    const [currentActive,setActive] = useState(defaultIndex.toString())
    const classes = classNames('at-tabs',className,{
        [`nav-${type}`]: type
    })
    const handleClick = (index: string)=> {
        setActive(index)
        if(onSelect){
            onSelect(index)
        }
    }
    console.log('currentActive',currentActive);
    
    const renderNavLinks = ()=> {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.ReactElement<TabItemProps,React.FunctionComponent<TabItemProps>>;
            const {label,disabled} = childElement.props
            const classes = classNames('at-tabs-nav-item',{
                'is-active': currentActive === index.toString(),
                'is-disabled': disabled
            })
            return (
                <li
                className={classes}
                key={`nav-item-${index}`}
                onClick={()=> {handleClick(index.toString())}}
                style={{
                    height: `${tabsHeight}px`,
                    lineHeight: `${tabsHeight}px`
                }}
                >
                    {label}
                </li>
            )
          })
    }
    const renderContent = ()=> {
        return React.Children.map(children, (child, index) => {
            if (index.toString() === currentActive) {
              return child
            }
          })
    }
    return (
        <div className={classes} style={style}>
                <ul className="at-tabs-nav"          style={{
                    height: `${tabsHeight}px`,
                    lineHeight: `${tabsHeight}px`
                }}>
                    {renderNavLinks()}
                </ul>
            {/* <div className='at-tabs-content'> */}
            <div className='at-tabs-content'>
                {
                    renderContent()
                }
            </div>
        </div>
    )
}