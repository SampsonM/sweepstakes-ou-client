import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { colors } from '../../theme'
import Home from '../../pages/Home'
import Profile from '../../pages/Profile'
import { HeaderTitle } from '../../components/Header'
import SweepstakeGroup from '../../pages/SweepstakeGroup'

import type { CompositeNavigationProp } from '@react-navigation/native'
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import type { StackNavigationProp } from '@react-navigation/stack'
import { TabNavigatorParamList } from '../Tabs/Tabs'
import { Group } from '../../slices/group.slice'

export type HomeStackParamList = {
  Home: undefined;
  SweepstakeGroup: Group;
};


export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigatorParamList, 'HomeNavigator'>,
  StackNavigationProp<HomeStackParamList>
>;

// ------------------------------------
// Constants
// ------------------------------------

const Stack = createStackNavigator<HomeStackParamList>()

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
    <Stack.Screen
      name="SweepstakeGroup"
      component={SweepstakeGroup}
      options={() => ({
        headerMode: 'screen',
        headerTitle: () => <HeaderTitle title="Groups" />,
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
