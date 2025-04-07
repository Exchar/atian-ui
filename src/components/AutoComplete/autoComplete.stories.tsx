import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { AutoComplete,AutoCompleteProps,DataSourceType } from './autoComplete';
// import { Default } from '../Menu/menu.stories';
import { getStoryDescConfig } from '../../utils/storyUtil';
// import { Disabled } from '../Button/button.stories';
import {action} from '@storybook/addon-actions'



const meta = {
    title: '表单组件/AutoComplete 建议输入框',
    component: AutoComplete,
    tags: ['autodocs'],
    parameters: {
        layout:'centered',
        docs:{
          name:'Input 输入框',
        },
    },
    args:{
        onSelect:fn(),
    }
} satisfies Meta<typeof AutoComplete>;
export default meta;

interface lakerProps{
    value:string,
    number:number
}

export const DefaultAutoComplete: StoryObj<typeof AutoComplete> = {
    name: '最简单的使用',
    args:{
        placeholder:'请输入内容',   
    },
    parameters:{
        ...getStoryDescConfig('这是一个默认的AutoComplete输入框，传入`placeholder="请输入内容"`即可')
    },
    render: (args) => {
        const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD']
        // const lakersWithNumber:lakerProps[] = [
        //     {value: 'bradley', number: 11},
        //     {value: 'pope', number: 1},
        //     {value: 'caruso', number: 3},
        //     {value: 'cook', number: 4},
        //     {value: 'cousins', number: 15},
        //     {value: 'james', number: 23},
        //     {value: 'AD', number: 34},
        // ]
        const handleFetch = (query: string) => lakers.filter(laker => laker.includes(query))
        .map(laker => ({value: laker}))
        return (
            <AutoComplete  
            {...args}
            fetchSuggestions={handleFetch} 
            onSelect={action('selected')}
            ></AutoComplete>
        )
    }
}

export const SampleDataItemComplete: StoryObj<typeof AutoComplete> = {
    name: '自定义模板和复杂数据源',
    args:{
        placeholder:'请输入内容',   
    },
    parameters:{
        ...getStoryDescConfig('这是一个自定义数据源的AutoComplete输入框，使用renderOption自定义列表模板')
    },
    render: (args) => {
        // const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD']
        const lakersWithNumber:lakerProps[] = [
            {value: 'bradley', number: 11},
            {value: 'pope', number: 1},
            {value: 'caruso', number: 3},
            {value: 'cook', number: 4},
            {value: 'cousins', number: 15},
            {value: 'james', number: 23},
            {value: 'AD', number: 34},
        ]
        const handleFetch = (query: string) => lakersWithNumber.filter(laker => laker.value.includes(query))
        const renderOption = (item: DataSourceType<Record<string, any>>) => {
            const typedItem = item as DataSourceType<lakerProps>;
            return (
                <>
                <h2>{typedItem.value}</h2>
                <p>{typedItem.number}</p>
                </>
            )
        }
        return (
            <AutoComplete  
            {...args}
            fetchSuggestions={handleFetch} 
            onSelect={action('selected')}
            renderOption={renderOption}
            dropDownStyle={{
                maxHeight:'300px',
            }}
            ></AutoComplete>
        )
    }
}

const renderAutoCompleteItem = (args:AutoCompleteProps) => {
    const handleFetch = (query: string) => fetch(`https://api.github.com/search/users?q=${query}`)
    .then(res => res.json())
    .then(({items}) => items.slice(0, 10).map((item: any) => ({value: item.login, ...item})))
    return (
        <AutoComplete  
        {...args}
        fetchSuggestions={handleFetch} 
        onSelect={action('selected')}
        ></AutoComplete>
    )
}
export const asyncDataItemComplete: StoryObj<typeof AutoComplete> = {
    name: '异步加载数据',
    args:{
        placeholder:'请输入内容',   
    },
    parameters:{
        ...getStoryDescConfig('这是一个异步加载数据的AutoComplete输入框，fetchSuggestions是一个异步函数，返回`Promise<DataSourceItem<Record<string,any>>>`')
    },
    render:renderAutoCompleteItem
}