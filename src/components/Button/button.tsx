import classNames from "classnames";
import React from "react";

export enum ButtonSize{
    Large  = 'lg',
    Small = 'sm',
    Medium = 'md'
}

export enum ButtonType{
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Success = 'success',
    Link = 'link',
    Text = 'text',
    Warning = 'warning'
}

export interface BaseButtonProps{
    /** 按钮类型 */
    className?:string;
    /** 是否禁用 */
    disabled?:boolean;
    /** 按钮大小 */
    size?:`${ButtonSize}`;
    /** 按钮类型 */
    btnType?:`${ButtonType}`;
    /** 按钮内容 */
    children:React.ReactNode;
    /** 链接地址，当 btnType 为 Link 时有效 */
    href?:string;
}
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
/**
 * 页面中最常用的按钮组件，你可以使用它来触发事件或提交表单。
 * ### 引入方法
 * ```javascript
 * import { Button } from 'at-ui'
 * ```
 * ### 代码示例
 * @param props
 * @returns 
 */
export const Button = ({
    btnType = 'default',
    disabled = false,
    size = 'md',
    children = '',
    href = '',
    className,
    ...restProps}:ButtonProps)=>{
    const classes = classNames('at-btn',className, {
        [`at-btn-${btnType}`]:btnType,
        [`at-btn-${size}`]:size,
        'disabled':disabled
    })
    if(btnType === ButtonType.Link && href){
        return (
            <a href={href} className={classes} {...restProps}>
                {children}
            </a>
        )
    }
    return (
        <button className={classes} disabled={disabled} {...restProps}>
            {children}
        </button>
    )
}
export default Button;