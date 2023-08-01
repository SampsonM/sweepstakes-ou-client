import React from 'react'
import {
  Button as UIButton,
  ButtonProps as UIBtnProps,
} from 'react-native-ui-lib'

type ButtonProps = {
  type?: 'primary' | 'secondary' | 'tertiary',
} & UIBtnProps

const Button = ({ type = 'primary', disabled, ...props }: ButtonProps) => {
  const computedStyleProps = {
    'bg-btn-secondary-bg': type == 'secondary',
    'btn-secondary-text-color': type == 'secondary',
    'bg-btn-primary-bg': type == 'primary',
    'btn-primary-text-color': type == 'primary',
    'bg-btn-tertiary-bg': type == 'tertiary',
    'btn-tertiary-text-color': type == 'tertiary',
    'marginB-10': true
  }

  return (
    <UIButton
      disabled={disabled}
      style={{ borderRadius: 10 }}
      {...computedStyleProps}
      {...props}
    />
  )
}

export default Button
