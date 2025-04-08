import { FC } from "react"
import Menu,{MenuProps} from "./menu"
import MenuItem,{MenuItemProps} from "./menu-item"
import SubMenu,{SubMenuProps} from "./submenu"

export type IMenuComponent = FC<MenuProps> & {
    item:FC<MenuItemProps>,
    subMenu:FC<SubMenuProps>
}

const TransMenu = Menu as IMenuComponent

TransMenu.item = MenuItem
TransMenu.subMenu = SubMenu

export default TransMenu
export * as MenuTypes from './menu'
export * as MenuItemTypes from './menu-item'
export * as SubMenuTypes from './submenu'