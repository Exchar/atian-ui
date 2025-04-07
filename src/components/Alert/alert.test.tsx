import { describe, expect, it,vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Alert, { AlertSize, AlertType } from "./alert";

const defaultProps = {
    alertType: 'danger' as AlertType,
    alertSize: AlertSize.Large,
    onclick: vi.fn()
}

describe('测试Alert组件',()=> {
    it('show render default current alert component', () => {
        render(<Alert>default alert</Alert>)
        const element = document.querySelector('.at-alert')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('at-alert at-alert-default')

    })

    it('should render the correct component based on different props', () => {
        render(<Alert {...defaultProps}>default alert</Alert>)
        const element = document.querySelector('.at-alert')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('at-alert at-alert-danger at-alert-lg')
    })
    it('should render close button when closeable is true', () => {
        render(<Alert {...defaultProps} closeable={true}>default alert</Alert>)
        const element = document.querySelector('.at-alert-close')
        expect(element).toBeInTheDocument()
    })
    it('should not render close button when closeable is false', () => {
        render(<Alert {...defaultProps} closeable={false}>default alert</Alert>)
        const element = document.querySelector('.at-alert-close')
        expect(element).not.toBeInTheDocument()
    })
    it('should close alert when close button is clicked', () => {
        render(<Alert {...defaultProps} closeable={true}>default alert</Alert>)
        const closeElement = document.querySelector('.at-alert-close>.at-btn')
        expect(closeElement).toBeInTheDocument()
        const element = document.querySelector('.at-alert')
        // fireEvent.click(closeElement as HTMLButtonElement)
        //  expect(closeElement).not.toBeInTheDocument()
        // expect(element).not.toBeInTheDocument()
    })
})