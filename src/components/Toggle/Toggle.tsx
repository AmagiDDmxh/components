import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { css } from '@emotion/css'

const width = '1.67rem'
const height = '.835rem'
const background = '#eaeaea'
const success = '#0070f3'

const toggleCls = css`
  transition-delay: 0.12s;
  transition-duration: 0.2s;
  transition-property: background, border;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  position: relative;
  border: 1px solid transparent;
  padding: 0;
  height: ${height};
  width: ${width};
  border-radius: ${height};
  background-color: ${background};
`
const innerCls = css`
  width: ${height};
  height: ${height};
  position: absolute;
  // top: calc(50%);
  transform: translateY(-50%);
  transform: scale(1.6);
  left: 1px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px 0, rgba(0, 0, 0, 0.1) 0 1px 3px 0;
  transition: left 280ms cubic-bezier(0, 0, 0.2, 1),
    background-color 0.2s 0.12s cubic-bezier(0, 0, 0.2, 1);
  border-radius: 50%;
  background-color: ${background};
`
const checkedCls = css({
  backgroundColor: 'lightpink',
})
const checkedInnerCls = css`
  left: 50%;
  box-shadow: none;
  background-color: deeppink;
`
const disabledCls = css({})

type ToggleProps = {
  disabled?: boolean
  checked?: boolean
  initialChecked?: boolean
}

const Toggle: FC<ToggleProps> = ({ initialChecked = false, disabled = false, checked }) => {
  const [selfChecked, setSelfChecked] = useState(initialChecked)

  const changeHandle = useCallback(
    (ev: ChangeEvent) => {
      if (disabled) return
      setSelfChecked(!selfChecked)
    },
    [disabled, selfChecked],
  )

  useEffect(() => {
    if (checked !== undefined) setSelfChecked(checked)
  }, [checked])

  const toggleClasses = classNames(toggleCls, {
    [checkedCls]: selfChecked,
    [disabledCls]: disabled,
  })

  return (
    <label
      className={css(`
      display: inline-block;
      padding: 3px 0;
      position: relative;
      cursor: pointer;
    `)}>
      <input
        type="checkbox"
        onChange={changeHandle}
        className={css({
          overflow: 'hidden',
          visibility: 'hidden',
          height: 0,
          width: 0,
          opacity: 0,
          position: 'absolute',
          zIndex: -1,
        })}
      />
      <div className={toggleClasses}>
        <span className={classNames(innerCls, { [checkedInnerCls]: selfChecked })} />
      </div>
    </label>
  )
}

export default Toggle
