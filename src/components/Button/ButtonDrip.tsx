import React, { FC, useEffect, useRef } from 'react'
import { css } from '@emotion/css'
import { keyframes } from '@emotion/react'

type Props = {
  x?: number
  y?: number
  color?: string
  onCompleted: () => void
}

const expand = keyframes`
  0% {
    opacity: 0;
    transform: scale(1);
  }
  30% {
    opacity: 1;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    transform: scale(28);
    opacity: 0;
  }
`

const dripCls = css({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
})

const animCls = ({ top, left }: { top: number, left: number }) =>
  css({
    top,
    left,
    position: 'absolute',
    animation: `350ms ease-in ${expand}`,
    animationFillMode: 'forwards',
    width: '1rem',
    height: '1rem',
  })

const ButtonDrip: FC<Props> = props => {
  const { x = 0, y = 0, color = 'rgba(0, 0, 0, 0.65)', onCompleted } = props
  const dripRef = useRef<HTMLDivElement>(null)

  const top = y - 10
  const left = x - 10

  useEffect(() => {
    const { current } = dripRef
    if (!current) return
    current.addEventListener('animationend', onCompleted)
    return () => {
      if (!current) return
      current.removeEventListener('animationend', onCompleted)
    }
  })

  return (
    <div ref={dripRef} className={dripCls}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        style={{ top, left }}
        className={animCls({ top, left })}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g fill={color}>
            <rect width="100%" height="100%" rx="10" />
          </g>
        </g>
      </svg>
    </div>
  )
}

export default ButtonDrip
