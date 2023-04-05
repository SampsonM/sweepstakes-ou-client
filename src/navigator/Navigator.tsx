import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { HomeNavigator, LoginNavigator } from './Stacks'
import { appStateSelector } from '../utils/selectors'
import WoodBackground from '../components/WoodBackground'
import TabNavigator from './Tabs/Tabs'

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

  return (
    <NavigationContainer theme={MyTheme}>
      <WoodBackground>
        {loggedIn ? <TabNavigator /> : <LoginNavigator />}
      </WoodBackground>
    </NavigationContainer>
  )
}

export default Navigator
