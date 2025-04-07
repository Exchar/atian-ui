import classNames from "classnames";
import { useContext, useRef, useState } from "react";
import { MenuContext } from "./menu";
import React from "react";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";


export interface SubMenuProps {
    index?: string,
    title: string,
    className?: string,
    children: React.ReactNode
}

export const SubMenu:React.FC<SubMenuProps> = (props)=> {
    const {
        index,
        title,
        className,
        children,
    } = props;
    const context = useContext(MenuContext)
    const openedSubmenus = context.defaultOpenSubmenus as string[]
    const isOpened = (index && context.mode==='vertical') ? openedSubmenus.includes(index):false
    const [menuOpen,setMenuOpen] = useState(isOpened)
    const classes = classNames('at-menu-item submenu-item',className,{
        'is-active': context.index===index,
        'is-opened': menuOpen,
        'is-vertical': context.mode==='vertical',
    })
    const handleClick = (e:React.MouseEvent)=> {
        e.preventDefault();
        setMenuOpen(!menuOpen)
    }
    let timer:undefined|string|NodeJS.Timeout;
    const handleMouse = (e:React.MouseEvent,toggle:boolean)=> {
        // console.log('handleMouse',toggle);
        
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(()=> {
            setMenuOpen(toggle)
        },300)
        // setMenuOpen(toggle)
    }
    const clickEvents = context.mode==='vertical' ? {
        onClick: handleClick
    }:{}
    const hoverEvents = context.mode!=='vertical' ? {
        onMouseOver: (e:React.MouseEvent)=>{handleMouse(e,true)},
        onMouseLeave: (e:React.MouseEvent)=>{handleMouse(e,false)},
    }:{}
    const nodeRef = useRef(null)
    const renderChildren = ()=> {
        const subMenuClasses = classNames('at-submenu',{
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children,(child,i)=> {
            const childElement = child as React.ReactElement<SubMenuProps,React.FunctionComponent<SubMenuProps>>;
            const {name} = childElement.type;
            if(name ==='MenuItem'){
                return React.cloneElement(childElement,{
                    index: `${index}-${i}`
                })
            }else{
                console.error('Warning: SubMenu has a child which is not a MenuItem component')
            }
        })

        return (
            <Transition 
            in={menuOpen} 
            timeout={300} 
            animation="zoom-in-top"
            // presetAnimate={context.mode==='vertical'?['fadeInUp','fadeOutDown']:['flipInY','flipOutX']}
            nodeRef={nodeRef}
            unmountOnExit
            appear
            >
                    <ul ref={nodeRef} className={subMenuClasses}>
                        {childrenComponent}
                    </ul>
            </Transition>

        )
    }
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
                <Icon icon='chevron-down'></Icon>
            </div>
            {renderChildren()}
        </li>
    )
}

export default SubMenu