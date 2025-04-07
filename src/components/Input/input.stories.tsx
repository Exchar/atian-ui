import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Input } from './input';
// import { Default } from '../Menu/menu.stories';
import { getStoryDescConfig } from '../../utils/storyUtil';
// import { Disabled } from '../Button/button.stories';


const meta = {
    title: '表单组件/Input 输入框',
    component: Input,
    tags: ['autodocs'],
    parameters: {
        layout:'centered',
        docs:{
          name:'Input 输入框',
        },
    },
    args:{
        onChange:fn(),
        onFocus:fn()
    }
} satisfies Meta<typeof Input>;
export default meta;

export const DefaultInput: StoryObj<typeof Input> = {
    name: '默认输入框',
    args:{
        placeholder:'请输入内容',
    },
    parameters:{
        ...getStoryDescConfig('这是一个默认的输入框')
    }
}

export const UseIconInput: StoryObj<typeof Input> = {
    name: '使用Icon图标',
    args:{
        placeholder:'请输入内容',
        icon:'search'
    },
    parameters:{
        ...getStoryDescConfig('如果需要使用图标，可以使用icon属性，使用`icon="图标名"`，图标可以是[fontawesome](https://fontawesome.com/icons)的任意图标')
    }
}

export const PrependInput: StoryObj<typeof Input> = {
    name: '前置内容',
    args:{
        placeholder:'请输入内容',
        prepend:'https://'
    },
    parameters:{
        ...getStoryDescConfig('如果需要在输入框前面添加内容，可以使用prepend属性')
    }
}

export const AppendInput: StoryObj<typeof Input> = {
    name: '后置内容',
    args:{
        placeholder:'请输入内容',
        append:'@qq.com'
    },
    parameters:{
        ...getStoryDescConfig('如果需要在输入框后面添加内容，可以使用`append`属性')
        }
}

export const AddFixInput: StoryObj<typeof Input> = {
    name: '前置、后置内容',
    args:{
        placeholder:'请输入内容',
        append:'@qq.com',
        prepend:'https://'
    },
    parameters:{
        ...getStoryDescConfig('如果需要在输入框后面添加内容，可以使用`append`属性')
        }
}

export const BigSizeInput: StoryObj<typeof Input> = {
    name: '大尺寸',
    args:{
        placeholder:'请输入内容',
        size:'lg'
    },
    parameters:{
        ...getStoryDescConfig('这是一个大尺寸的输入框,传入`size="lg"`即可')
    }
}

export const SmallSizeInput: StoryObj<typeof Input> = {
    name: '小尺寸',
    args:{
        placeholder:'请输入内容',
        size:'sm'   
    },
    parameters:{
        ...getStoryDescConfig('这是一个小尺寸的输入框，传入`size="sm"`即可')
    }
}

export const DisabledInput: StoryObj<typeof Input> = {
    name: '禁用状态',
    args:{
        placeholder:'请输入内容',
        disabled:true
    },
    parameters:{
        ...getStoryDescConfig('这是一个禁用状态的输入框，传入`disabled=true`即可')
    }
}

export const PasswordInput: StoryObj<typeof Input> = {
    name: '密码输入框',
    args:{
        placeholder:'请输入内容',
        type:'password'
    },
    parameters:{
        ...getStoryDescConfig('这是一个密码输入框，传入`type="password"`即可')
    }
}
