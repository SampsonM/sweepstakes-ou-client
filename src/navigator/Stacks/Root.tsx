import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { colors } from '../../theme'
import TabNavigator from '../Tabs/Tabs'

export type RootStackParamList = {
  Root: undefined
}

// ------------------------------------
// Constants
// ------------------------------------

const Stack = createStackNavigator<RootStackParamList>()

const navigationProps = {
  headerTintColor: 'white',
  headerStyle: { backgroundColor: colors.blue },
  headerTitleStyle: { fontSize: 18 },
}

// ------------------------------------
// Navigators
// ------------------------------------

export const RootNavigator = () => (
  <Stack.Navigator initialRouteName="Root" screenOptions={navigationProps}>
    <Stack.Screen
      name="Root"
      component={TabNavigator}
      options={() => ({
        headerShown: false,
      })}
    />
  </Stack.Navigator>
)
