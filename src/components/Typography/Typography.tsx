import React from 'react'
import { Text } from 'react-native-ui-lib'

type TypographyProps = {
  children: React.ReactNode
}

const Heading = ({ children }: TypographyProps) => (
  <Text heading marginB-10>
    {children}
  </Text>
)

export { Heading }
