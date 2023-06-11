import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { colors } from '../../theme'
import Home from '../../pages/Home'
import Profile from '../../pages/Profile'
import { HeaderTitle } from '../../components/Header'

// ------------------------------------
// Constants
// ------------------------------------

const Stack = createStackNavigator()

const navigationProps = {
  headerTintColor: 'white',
  headerStyle: { backgroundColor: colors.yellow },
  headerTitleStyle: { fontSize: 18 },
}

// ------------------------------------
// Navigators
// ------------------------------------

export const HomeNavigator = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={navigationProps}>
    <Stack.Screen
      name="Home"
      component={Home}
      options={() => ({
        headerMode: 'screen',
        headerTitle: () => <HeaderTitle title="SweepSteaks" />,
      })}
    />
  </Stack.Navigator>
)

export const ProfileNavigator = () => (
  <Stack.Navigator initialRouteName="Profile" screenOptions={navigationProps}>
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={() => ({
        headerMode: 'screen',
        headerTitle: () => <HeaderTitle title="Profile" />,
      })}
    />
  </Stack.Navigator>
)
