// import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon,FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

export type ThemeProps = 'primary' |'secondary'| 'success' | 'info' | 'warning' | 'danger' | 'light'|'dark'
export interface IconProps extends FontAwesomeIconProps{
    theme?: ThemeProps;
    /** 自定义类名 */
    className?: string;
    children?: React.ReactNode;
}
export default function Icon(props: IconProps) {
    // icon-primary
    const { className, theme,children, ...restProps } = props;
    const classes = classNames('at-icon', className, {
        [`icon-${theme}`]: theme,
    });
    return (
        <>
        <span className="at-icon-wrapper">
            <FontAwesomeIcon className={classes} {...restProps} />
            {children ? <span className="at-icon-text">{children}</span> : null}
        </span>
        </>
        
    )
}