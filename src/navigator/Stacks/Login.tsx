import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { colors } from '../../theme'
import Landing from '../../pages/Landing'

export type LoginStackParamList = {
  Landing: undefined
  Login: undefined
  Register: undefined
}

// ------------------------------------
// Constants
// ------------------------------------

const Stack = createStackNavigator<LoginStackParamList>()

const navigationProps = {
  headerTintColor: 'white',
  headerStyle: { backgroundColor: colors.blue },
  headerTitleStyle: { fontSize: 18 },
}

// ------------------------------------
// Navigators
// ------------------------------------

export const LoginNavigator = () => (
  <Stack.Navigator
    initialRouteName="Landing"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="Landing"
      component={Landing}
      options={() => ({
        title: 'Landing',
        headerShown: false,
      })}
    />
  </Stack.Navigator>
)
