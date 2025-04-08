import { config } from 'react-transition-group'
import { render, RenderResult, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { AutoComplete, AutoCompleteProps, DataSourceType } from './autoComplete'
import { vi } from 'vitest'

// 禁用动画
config.disabled = true
const testArray = [
  {value: 'ab', number: 11},
  {value: 'abc', number: 1},
  {value: 'b', number: 4},
  {value: 'c', number: 15},
]
const renderOption = (item: DataSourceType) => {
  const itemWithNumber = item as DataSourceType<{ value: string; number: number }>
  return (
    <>name: {itemWithNumber.value}</>
  )
}
const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {return testArray.filter(item => item.value.includes(query))},
  onSelect: vi.fn(),
  placeholder: 'auto-complete',
}
const testPropsWithCustomRender: AutoCompleteProps = {
  ...testProps,
  placeholder: 'auto-complete-2',
  renderOption
}
const testPropsWithAsync: AutoCompleteProps = {
  ...testProps,
  fetchSuggestions: (query) => {
    return new Promise<DataSourceType[]>((resolve) => {
      setTimeout(() => {
        resolve(testArray.filter(item => item.value.includes(query)))
      }, 1000)
    })
  },
  placeholder: 'auto-complete-3',
}

let wrapper: RenderResult, inputNode: HTMLInputElement

describe('test AutoComplete component', () => {
    beforeEach(() => {
      wrapper = render(<AutoComplete {...testProps}/>)
      inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    })
    it('test basic AutoComplete behavior', async () => {
      // input change
      fireEvent.change(inputNode, {target: { value: 'ab'}})
      await waitFor(() => {
        expect(wrapper.queryByText('ab')).toBeInTheDocument()
      })
      // should have two suggestion items
      expect(wrapper.container.querySelectorAll('.at-suggestion-item').length).toEqual(2)
      //click the first item
      fireEvent.click(wrapper.getByText('ab'))
      expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
      expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
      //fill the input
      expect(inputNode.value).toBe('ab')
    })
    it('should provide keyboard support', async () => {
      fireEvent.change(inputNode, {target: { value: 'ab'}})
      await waitFor(() => {
        expect(wrapper.queryByText('ab')).toBeInTheDocument()
      })
      const firstItem = wrapper.container.querySelector('.at-suggestion-item:first-child') as HTMLLIElement
      const secondItem = wrapper.container.querySelector('.at-suggestion-item:nth-child(2)') as HTMLLIElement
      expect(firstItem).toBeInTheDocument()
      expect(secondItem).toBeInTheDocument()
      //keydown on input
      fireEvent.keyDown(inputNode, {code: 'ArrowDown'})
      expect(firstItem).toHaveClass('item-highlighted')
      //keydown on first item
      fireEvent.keyDown(firstItem, {code: 'Enter'})
      expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    })
    it('click outside should hide the dropdown', async () => {
        fireEvent.change(inputNode, {target: { value: 'ab'}})
        await waitFor(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })
        //click outside
        fireEvent.click(document)
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    })
    it('renderOption should generate the right template', async () => {
        cleanup()
        const wrapper = render(<AutoComplete {...testPropsWithCustomRender}/>)
        const inputNode = wrapper.getByPlaceholderText('auto-complete-2') as HTMLInputElement
        fireEvent.change(inputNode, {target: { value: 'ab'}})
        await waitFor(() => {
            expect(wrapper.queryByText('name: ab')).toBeInTheDocument()
        })
    })
    it('async fetchSuggestions should work', async () => {
        cleanup()
        const wrapper = render(<AutoComplete {...testPropsWithAsync}/>)
        const inputNode = wrapper.getByPlaceholderText('auto-complete-3') as HTMLInputElement
        fireEvent.change(inputNode, {target: { value: 'ab'}})
        await waitFor(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        },{
            timeout: 2000
        })
        expect(wrapper.container.querySelectorAll('.at-suggestion-item').length).toEqual(2)
        fireEvent.click(wrapper.getByText('ab'))
        expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
        expect(inputNode.value).toBe('ab')
    })
})