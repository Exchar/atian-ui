import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import { InputHTMLAttributes, useState } from "react";
import Icon from "../Icon/icon";
type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>,'size'>{
    /**是否禁用 */
    disabled?: boolean;
    /**设置 input 大小 */
    size?: InputSize;
    /**前面的图标 */
    prepend?: string | React.ReactElement;
    /**后面的图标 */
    append?: string | React.ReactElement;
    /**输入框输入值的回调 */
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    /**添加图标，在右侧悬浮添加一个图标，用于提示 */
    icon?: IconProp;
}
/**
 * 输入框组件，可以用来收集用户的信息。当然，你也可以随便写点什么
 * ### 引入方法
 * ```javascript
 * import { Input } from 'at-ui'
 * ```
 * 支持HTMLInput的所有基本属性
 * ### 代码示例
 * 
 * @param props 
 * @returns 
 */
export function Input(props: InputProps) {
    const { disabled, size, icon, prepend, append, style, ...restProps } = props;
    const classes = classNames('at-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend
    });
    return (
        <div className={classes} style={style}>
            {prepend && <span className="at-input-prepend">{prepend}</span>}
            {icon && <span className="at-input-icon"><Icon icon={icon} title={`title-${icon}`}/></span>}
            <input className="at-input-inner" disabled={disabled} {...restProps} />
            {append && <span className="at-input-append">{append}</span>}
        </div>
    );
}
export default Input