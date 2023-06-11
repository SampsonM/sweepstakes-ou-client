import React from 'react'
import { StatusBar } from 'react-native'
import { View } from 'react-native-ui-lib'

const BasicScreenWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <View
      useSafeArea
      flex
      backgroundColor="transparent"
      centerH
      paddingH-10
      paddingV-20
    >
      <StatusBar barStyle="dark-content" />

      {children}
    </View>
  )
}

export default BasicScreenWrapper
