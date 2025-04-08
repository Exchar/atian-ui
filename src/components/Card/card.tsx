import classNames from "classnames";
import React from "react";

export interface CardProps{
    className?:string;
    style?:React.CSSProperties;
    children?:React.ReactNode;
    header?:string | React.ReactNode;
    footer?:string | React.ReactNode;
    extra?:string | React.ReactNode;
}
export default function Card(props: CardProps){
    const {header,footer,extra,className,style,children} = props
    const classes = classNames('at-card',className)
    return (
        <div className={classes} style={style}>
            {
                header && <div className="at-card-header">
                    <div className="at-card-header-title">{header}</div>
                    {extra && <div className="at-card-header-extra">{extra}</div>}
                </div>
            }
            <div className="at-card-body">
                {children}
            </div>
            {
                footer && <div className="at-card-footer">{footer}</div>
            }
        </div>
    )
}