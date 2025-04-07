// import React, { Component } from "react";
// import { Children } from "react";
import { ButtonType,Button } from "./button";
import { Meta,StoryObj} from "@storybook/react";
import { ButtonSize } from './button';
import { fn } from "@storybook/test";

const meta= {
    title: '通用组件/Button 按钮',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        layout:'centered',
        docs:{
          name:'Button 按钮'
        },
    },
    argTypes:{
        size:{
            options:[
                ButtonSize.Large,
                ButtonSize.Medium,
                ButtonSize.Small,
            ],
            control:{
                type:'select',
            },
        },
        onClick:{
          action: 'clicked',
        },
        btnType:{

            options:[
                ButtonType.Primary,
                ButtonType.Default,
                ButtonType.Success,
                ButtonType.Warning,
                ButtonType.Danger,
                ButtonType.Link,
                ButtonType.Text,
            ],
            control:{
                type:'select',
            },
        },
        disabled:{
            control:{
                type:'boolean',
            },
        },
        className:{
            control:{
                type:'text',
            },
        },
        href:{

            control:{
                type:'text',
            },
        }
    },
    args:{
      onClick: fn()
    }
} satisfies Meta<typeof Button>;
export default meta


type Story = StoryObj<typeof Button>;
// const Template:Story = {
//   parameters:{
//     layout:'centered',
//   },
//   render: (args: ButtonProps) => (
//       <Button {...args} />
//   )
// }
const ListAllTemplate:Story = {
  parameters:{
    layout:'centered',
  },
  render: (args) => (
    <>
      <Button btnType={ButtonType.Default} {...args}>Default</Button>
      <Button btnType={ButtonType.Primary} {...args}>Primary</Button>
      <Button btnType={ButtonType.Warning} {...args}>Warning</Button>
      <Button btnType={ButtonType.Danger} {...args}>Danger</Button>
      <Button btnType={ButtonType.Success} {...args}>Success</Button>
      <Button btnType={ButtonType.Link} {...args}>Link</Button>
      <Button btnType={ButtonType.Text} {...args}>Text</Button>
    </>
  )
}
export const DefaultButton:Story = {
  name:'默认按钮',
  args:{
    children:'Default Button',
    size:ButtonSize.Medium,
  },
  parameters:{
    docs:{
        description:{
            story:'什么都不用做，它就是这样的',
        },
    },
  }
}
export const Primary:Story = {
  name:'带有情景色',
  args:{
    size:ButtonSize.Medium,
  },
  parameters:{
    docs:{
        description:{
            story:'带有情景色的按钮，在某些场景下使用',
        },
    },
  },
  render(args){
   return <>
      <Button btnType={ButtonType.Primary} {...args}>Primary</Button>
      <Button btnType={ButtonType.Warning} {...args}>Warning</Button>
      <Button btnType={ButtonType.Danger} {...args}>Danger</Button>
      <Button btnType={ButtonType.Success} {...args}>Success</Button>
      <Button btnType={ButtonType.Link} {...args}>Link</Button>
      <Button btnType={ButtonType.Text} {...args}>Text</Button>
    </>
  }
}
// 不同尺寸
export const BigSize:Story = {
  ...ListAllTemplate,
  name:'大尺寸按钮',
  args:{
    size:ButtonSize.Large,
  },
  parameters:{
    docs:{
        description:{
            story:'这个按钮比较大',
        },
    },
  },
}
// 不同尺寸
export const SmallSize:Story = {
  ...ListAllTemplate,
  name:'小尺寸按钮',
  args:{
    size:ButtonSize.Small,
  },
  parameters:{
    docs:{
        description:{
            story:'当然，这个按钮也可以很小',
        },
    },
  },
}
// 不同尺寸
export const Disabled:Story = {
  ...ListAllTemplate,
  name:'禁用按钮',
  args:{
    disabled:true,
  },
  parameters:{
    docs:{
        description:{
            story:'这个按钮是禁用的，点了也没用',
        },
    },
  },
}

