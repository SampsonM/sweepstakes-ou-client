import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import DrawerNavigator from './Drawer'
import { LoginNavigator } from './Stacks'
import { appStateSelector } from '../utils/selectors'
import { Text } from 'react-native'
import WoodBackground from '../components/WoodBackground'

const MyTheme = {
  colors: {
    background: 'transparent',
    primary: '',
    card: '',
    text: '',
    border: '',
    notification: '',
  },
  dark: false,
}

const Navigator = () => {
  const { loggedIn } = appStateSelector()

  // get from rtk call to login
  const loading = false

  if (loading) {
    return (
      <WoodBackground>
        <Text>Loading...</Text>
      </WoodBackground>
    )
  }

  if (loggedIn) {
    return (
      <WoodBackground>
        <NavigationContainer theme={MyTheme}>
          <DrawerNavigator />
        </NavigationContainer>
      </WoodBackground>
    )
  }

  return (
    <WoodBackground>
      <NavigationContainer theme={MyTheme}>
        <LoginNavigator />
      </NavigationContainer>
    </WoodBackground>
  )
}

export default Navigator
