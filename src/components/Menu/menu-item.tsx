import classNames from "classnames";
import { MenuContext } from "./menu";
import { useContext } from "react";
import React from "react";

export interface MenuItemProps{
    index?: string,
    disabled?:boolean,
    className?: string,
    style?: React.CSSProperties,
    children?: React.ReactNode
}


export const MenuItem: React.FC<MenuItemProps> =  (props)=> {
    const {
        index,
        disabled,
        className,
        style,
        children,
    } = props;
    const context = useContext(MenuContext)
    const classes = classNames('at-menu-item',className,{
        'is-disabled': disabled,
        'is-active': context.index === index
    })
    const handleClick = ()=> {
        if(context.onSelect && !disabled && (typeof index==='string')){
            context.onSelect(index)
        }
    }
    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}

export default MenuItem