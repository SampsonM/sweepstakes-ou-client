import React from 'react'
import { View } from 'react-native'
import Wood from '../svg/Wood'

const WoodBackground = ({ children }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <Wood />
      {children}
    </View>
  )
}

export default WoodBackground
