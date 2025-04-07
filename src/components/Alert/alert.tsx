import React, { useState } from "react";
import classNames from 'classnames';
import Button, { ButtonType } from '../Button/button';
import Transition from "../Transition";
import Icon from "../Icon/icon";

export enum AlertSize{
    Large = 'lg',
    Medium = 'md',
    Small = 'sm'
}
export type AlertType = "success" | "default" | "danger" | "warning";
interface AlertProps{
    alertType?: AlertType,
    alertSize?: AlertSize
    title?: string,
    message?: string,
    children?: React.ReactNode,
    closeable?: boolean,
    onClose?: ()=> void
}

export default function Alert(props:AlertProps) {
    const {
         alertType = "default",
         children,
         title = '',
         message = '',
         closeable = true,
         onClose,
         alertSize = AlertSize.Medium
        } = props;
    const classes = classNames('at-alert',{
        [`at-alert-${alertType}`]:alertType,
        [`at-alert-${alertSize}`]:alertSize
    })    
    const [visible,setVisible] = useState(true);
    const handleCloseAlert = (e: React.MouseEvent)=> {
        e.preventDefault();
        // e.stopPropagation();
        if(onClose){
            onClose()
        }
        console.log('close alert');
        setVisible(false);
    }
    return (
        <Transition in={visible} timeout={300} presetAnimate={['fadeInDownBig','fadeOutUpBig']}>
            <div className={classes}>
                <div className="at-alert-title">
                    {title && <p className="at-alert-title">{title}</p>}
                </div>
                <div className="at-alert-content">
                {
                    children ? children : <p>{message}</p>
                }
                </div>
                {
                    closeable && (
                        <span className="at-alert-close">
                        <Button btnType={ButtonType.Text} onClick={handleCloseAlert}>
                            <Icon icon='xmark' size="lg"></Icon>
                        </Button>
                    </span>
                    )
                }
            </div>
        </Transition>


    )
}
