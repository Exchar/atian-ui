import Tabs,{TabsProps} from "./tabs";
import TabItem,{TabItemProps}from "./tab-item";
import { FC } from "react";

export type ITabProps = FC<TabsProps> & {
    TabItem: FC<TabItemProps>
}

const TransTabs = Tabs as ITabProps

TransTabs.TabItem = TabItem

export default TransTabs
export * from './tabs'
export * from './tab-item'