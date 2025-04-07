import { Meta, StoryObj } from '@storybook/react';
import {Menu, MenuProps} from './menu';
import {MenuItem} from './menu-item';
import SubMenu from './submenu';
import { fn } from '@storybook/test';

const meta = {
  title: '通用组件/Menu 菜单',
    component: Menu,
    tags: ['autodocs'],
    parameters: {
        layout:'centered',
        docs:{
          name:'Menu 菜单',
        },
    },
    argTypes:{  
        mode:{
            options:[
                'horizontal',
                'vertical',
            ],
            control:{
                type:'radio',
            },
        },
        defaultIndex:{
            control:{
                type:'text',
            },
        },
        onSelect:{
            action:'onSelect',
        },
        style:{
            description:'菜单的样式',
            control:{
                type:'object',
            },
        },
        defaultOpenSubmenus:{
            control:{
                type:'object',
            },
        }
    },
    args:{
        defaultIndex: '0',
        onSelect: fn()
    },
    subcomponents:{
        'SubMenu':SubMenu,
        'MenuItem':MenuItem,
    }
} satisfies Meta<typeof Menu>;
export default meta;

type Story = StoryObj<typeof Menu>;
const Template: Story = {
    args:{
        onSelect: fn()
    },
    parameters:{
        layout:'centered',
    },
    render: (args:MenuProps) => (
        <Menu {...args}>
            <MenuItem>link 1</MenuItem>
            <MenuItem>link 2</MenuItem>
            <MenuItem>link 3</MenuItem>
        </Menu>
    )
}
const allTemplate: Story = {
    parameters:{
        layout:'centered',
    },
    render: (args:MenuProps) => (
        <Menu {...args}>
            <MenuItem>link 1</MenuItem>
            <MenuItem disabled>link 2</MenuItem>
            <SubMenu title='dropdown'>
                <MenuItem>submenu item 1</MenuItem>
                <MenuItem>submenu item 2</MenuItem>
            </SubMenu>
            <MenuItem>link 3</MenuItem>
        </Menu>
    )
}
export const Default: Story = {
    ...Template,
    name: '最简单的使用'
}
export const DefaultActive: Story = {
    ...Template,
    name: '默认激活',
    args:{
        defaultIndex: '2',
    }
}
export const AddSubMenu: Story = {
    ...allTemplate,
    name: '添加SubMenu 子菜单',
    decorators:[
        (Story) => (
            <div style={{height:'160px'}}>
                {Story()}
            </div>
        )
    ]
}
export const Vertical: Story = {
    ...allTemplate,
    name: '纵向 vertical',
    args:{
        mode: 'vertical'
    }
}
export const DefaultOpenSubMenus: Story = {
    ...allTemplate,
    name: '默认展开子菜单 defaultOpenSubMenus',
    args:{
        defaultOpenSubmenus: ['2'],
        mode: 'vertical'
    }
}