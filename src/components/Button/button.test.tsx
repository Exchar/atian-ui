import { describe, expect, it,vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
// import App from "../src/App";
import React from "react";
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button";

const defaultProps = {
  onClick: vi.fn()
}

const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'klass'
}

const disabledProps:ButtonProps = {
  disabled: true
}

// describe('button component', () => {
//   it('first react test case', () => {
//     const wrapper = render(<Button>Nice</Button>);
//     const element = wrapper.queryByText('Nice');
//     expect(element).toBeInTheDocument()
//   })
// })


describe('测试按钮功能',()=> {
  it('should render the correct default button', () => {
    render(<Button>default button</Button>)
    const element = screen.getByText('default button') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('at-btn at-btn-default')
    expect(element.disabled).toBeFalsy()
    const clickSpy = vi.spyOn(defaultProps,'onClick')
    fireEvent.click(element)
    defaultProps.onClick()
    expect(clickSpy).toHaveBeenCalled()
  })

  it('should render the correct component based on different props', () => {
    render(<Button {...testProps}>default button</Button>)
    const element = screen.getByText('default button')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('at-btn at-btn-primary at-btn-lg klass')
  })

  it('show render a link when btnType equals link and href is provided', () => {
    const wrapper = render(<Button btnType={ButtonType.Link} href="http://www.baidu.com">Link</Button>)
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('at-btn at-btn-link')
  })

  it('should render disabled button when disabled set to true', () => {
    render(<Button {...disabledProps}>default button</Button>)
    const element = screen.getByText('default button') as HTMLButtonElement
    expect(element).toBeInTheDocument()

    expect(element.disabled).toBeTruthy()
    const clickSpy = vi.spyOn(defaultProps,'onClick')
    fireEvent.click(element);
    expect(clickSpy).not.toHaveBeenCalled()
  })
})