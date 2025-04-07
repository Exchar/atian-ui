import React from "react";
import {cleanup, fireEvent, render, RenderResult, waitFor} from '@testing-library/react'

import Menu,{MenuProps,MenuMode} from "./menu";
import MenuItem,{MenuItemProps} from "./menu-item";
import { vi } from "vitest";
import SubMenu from "./submenu";
import { config } from 'react-transition-group'

config.disabled = true
const testProps = {
    defaultIndex: '0',
    onSelect: vi.fn(),
    className: 'test'
}
const testVerticalProps = {
    defaultIndex: '0',
    mode: 'vertical' as MenuMode
}
const generateMenu = (props:MenuProps)=> {
    return (<Menu {...props}>
        <MenuItem>active</MenuItem>
        <MenuItem disabled>disabled</MenuItem>
        <MenuItem>link 3</MenuItem>
        <SubMenu title='dropdown' data-testid='test-submenu'>
          <MenuItem>submenu item 1</MenuItem>
          <MenuItem>submenu item 2</MenuItem>
        </SubMenu>
      </Menu>)
}
const createStyleFile = ()=> {
    const cssFile:string = `
    .at-submenu{
        display: none;}
    .at-submenu.menu-opened{
        display: block; 
    }
    `
    const style = document.createElement('style')
    style.innerHTML = cssFile
    return style
}
let wrapper:RenderResult,menuElement:HTMLElement,activeElement:HTMLElement,disabledElement:HTMLElement
describe('test Menu and MenuItem component',()=> {
    beforeEach(()=> {
        wrapper = render(generateMenu(testProps));
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId('test-menu');
        activeElement = wrapper.getByText('active');
        disabledElement = wrapper.getByText('disabled');
    })
    it('should render corrent Menu and MenuItem based on default Props',()=> {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('at-menu test')
        // expect(menuElement.getElementsByTagName('li').length).toEqual(3)
        expect(menuElement.querySelectorAll(':scope>li').length).toEqual(4)
        expect(activeElement).toHaveClass('at-menu-item is-active')
        expect(disabledElement).toHaveClass('at-menu-item is-disabled')
    })
    it('click items should change active and call the right callback',()=> {
        const thirdItem = wrapper.getByText('link 3');
        // const clickSpy = vi.spyOn(testProps,'onSelect')
        fireEvent.click(thirdItem);
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')

        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })
    it('should render vertical mode when mode is set to vertical',()=> {
        cleanup()
        let wrapper = render(generateMenu(testVerticalProps))
        const menuElement = wrapper.getByTestId('test-menu')

        expect(menuElement).toHaveClass('is-vertical')
    })
    it('should display dropdown items when hover on subMenu',async ()=> {
        // cleanup()
        // const wrapper = render(generateMenu(testProps))
        expect(wrapper.queryByText('submenu item 1')).not.toBeVisible()
        const dropdownElement = wrapper.getByText('dropdown')
        fireEvent.mouseEnter(dropdownElement)
            expect(wrapper.getByText('submenu item 1')).toBeVisible()
        const submenuElement = wrapper.getByText('submenu item 1')
        fireEvent.click(submenuElement)
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(dropdownElement)
        await waitFor(() => {
            expect(submenuElement).not.toBeVisible()
        },{
            timeout: 400
        })

    })
    it('should display doopdown when mode is set to vertical and defaultOpenSubmenus is set',async ()=> {
        cleanup()
        const wrapper = render(generateMenu({
            ...testVerticalProps,
            defaultOpenSubmenus: ['3']
        }))
        // const dropdownElement = wrapper.getByText('dropdown')
        expect(wrapper.queryByText('submenu item 1')).toBeVisible()
    })
})