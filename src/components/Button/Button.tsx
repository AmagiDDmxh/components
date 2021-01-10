import React, {
  ForwardRefExoticComponent,
  MouseEvent,
  PropsWithChildren,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { css } from '@emotion/css'
import ButtonDrip from './ButtonDrip'

// eslint-disable-next-line @typescript-eslint/ban-types
type ButtonProps = {}

const Button = React.forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  ({ children }, ref: Ref<HTMLButtonElement | null>) => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [dripShow, setDripShow] = useState(false)
    const [dripY, setDripY] = useState(0)
    const [dripX, setDripX] = useState(0)
    useImperativeHandle(ref, () => buttonRef.current)

    const dripCompletedHandle = () => {
      setDripShow(false)
      setDripX(0)
      setDripY(0)
    }

    const handleClick = ({ clientX, clientY }: MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current) {
        const { left, top } = buttonRef.current.getBoundingClientRect()
        setDripShow(true)
        setDripX(clientX - left)
        setDripY(clientY - top)
      }
    }

    return (
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={css`
          background-color: white;
          position: relative;
          user-select: none;
          outline: none;
          overflow: hidden;
          padding: 1rem;
        `}>
        {children}
        {dripShow && <ButtonDrip x={dripX} y={dripY} onCompleted={dripCompletedHandle} />}
      </button>
    )
  },
)

export default Button as ForwardRefExoticComponent<PropsWithChildren<ButtonProps>>
