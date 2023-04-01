import React from 'react'
import {
  Button as UIButton,
  ButtonProps as UIBtnProps,
} from 'react-native-ui-lib'

type ButtonProps = {
  primary?: boolean
  secondary?: boolean
} & UIBtnProps

const Button = ({ secondary = false, ...props }: ButtonProps) => {
  if (secondary) {
    return (
      <UIButton
        bg-btn-secondary-bg
        btn-secondary-text-color
        marginB-10
        {...props}
      />
    )
  }

  return (
    <UIButton bg-btn-primary-bg btn-primary-text-color marginB-10 {...props} />
  )
}

export default Button
