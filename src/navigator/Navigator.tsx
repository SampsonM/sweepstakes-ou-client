import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import DrawerNavigator from './Drawer'
import LoginNavigator from './Login'
import { appStateSelector } from '../utils/selectors'
import { Text } from 'react-native'

const Navigator = () => {
  const { loggedIn } = appStateSelector()
  
  // get from rtk call to login
  const loading = false

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (loggedIn) {
    return (
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    )
  }

  return (
    <NavigationContainer>
      <LoginNavigator />
    </NavigationContainer>
  )
}

export default Navigator
