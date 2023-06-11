import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontIcon from 'react-native-vector-icons/FontAwesome5'

import { colors } from '../../theme'

import { HomeNavigator, ProfileNavigator } from '../Stacks'
import { RouteProp } from '@react-navigation/native'

export type TabNavigatorParamList = {
  HomeNavigator: undefined,
  ProfileNavigator: undefined
}

export type TabRouteProp = RouteProp<
  TabNavigatorParamList,
  'HomeNavigator' | 'ProfileNavigator'
>

const Tab = createBottomTabNavigator<TabNavigatorParamList>()

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={() => ({
      tabBarActiveTintColor: colors.red,
      tabBarInactiveTintColor: colors.grey,
      tabBarStyle: {
        backgroundColor: colors.yellow,
        borderTopColor: 'red',
        height: 90,
        tabStyle: {
          paddingTop: 10,
          paddingBottom: 5,
        },
        labelStyle: {
          fontSize: 14,
          fontWeight: '500',
        },
      },
    })}
    initialRouteName="HomeNavigator"
  >
    <Tab.Screen
      name="HomeNavigator"
      component={HomeNavigator}
      options={{
        headerShown: false,
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <FontIcon name="home" color={color} size={size} solid />
        ),
      }}
    />

    <Tab.Screen
      name="ProfileNavigator"
      component={ProfileNavigator}
      options={{
        headerShown: false,
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <FontIcon name="user" color={color} size={size} solid />
        ),
      }}
    />
  </Tab.Navigator>
)

export default TabNavigator
