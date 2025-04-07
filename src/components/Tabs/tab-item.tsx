import classNames from "classnames"

export interface TabItemProps{
    label: string |number,
    className?: string,
    style?: React.CSSProperties,
    children?: React.ReactNode
    index?: string,
    isActive?:boolean,
    disabled?:boolean
}
export default function TabItem(props: TabItemProps){
    const {
        className,
        style,
        children,
        isActive = false
    } = props
    const classes = classNames('at-tab-item',className,{
        'is-active': isActive
    })
    return (
        <div className={classes} style={style}>
            {children}
        </div>
    )

}