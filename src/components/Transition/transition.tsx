import React, { ReactNode, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'
import classNames from 'classnames'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName,
  wrapper?: boolean,
  children?: ReactNode,
  appear?:boolean,
  presetAnimate?: [string,string],
  faster?: boolean,
}

const Transition: React.FC<TransitionProps> = (props) => {
  const nodeRef = useRef(null)
  const {
    children,
    classNames:classes,
    animation = 'zoom-in-bottom',
    wrapper = true,
    appear = true,
    faster = false,
    presetAnimate,
    unmountOnExit = true,
    ...restProps
  } = props
  const animationSet = (presetAnimate && presetAnimate?.length===2) ? {
    enter: "animate__animated",
    enterActive: `animate__${presetAnimate[0]}`,
    exit: "animate__animated",
    exitActive: `animate__${presetAnimate[1]}`,
  } : ''
  const otherClass = classNames('animate__wrapper',{
    'animate__faster': faster,
  })
  const renderChildren = ()=> {
    if (wrapper) {
      return (
        <div ref={nodeRef} className={otherClass}>
          {children}
        </div>
      )
    } else {
      return children
    }
  }
  return (
    <CSSTransition
      appear={appear}
      nodeRef={nodeRef}
      classNames = { classes || animationSet || animation}
      {...restProps}
      unmountOnExit
    >
      {renderChildren()}
    </CSSTransition>
  )
}

export default Transition