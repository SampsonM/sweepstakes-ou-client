import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontIcon from 'react-native-vector-icons/FontAwesome5'

import { colors } from '../../theme'

import { HomeNavigator, ProfileNavigator } from '../Stacks'
import { RouteProp } from '@react-navigation/native'

export type TabNavigatorParamList = {
  Home: undefined,
  Profile: undefined
}

export type TabRouteProp = RouteProp<TabNavigatorParamList, 'Home' | 'Profile'>

const Tab = createBottomTabNavigator<TabNavigatorParamList>()

const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: colors.red,
      inactiveTintColor: colors.grey,
      style: {
        backgroundColor: colors.yellow,
        borderTopColor: 'red',
        height: 90,
      },
      tabStyle: {
        paddingTop: 10,
        paddingBottom: 5,
      },
      labelStyle: {
        fontSize: 14,
        fontWeight: '500',
      },
    }}
    initialRouteName="Home"
  >
    <Tab.Screen
      name="Home"
      component={HomeNavigator}
      options={{
        tabBarIcon: ({ color, size }) => <FontIcon name="home" color={color} size={size} solid />,
      }}
    />
    
    <Tab.Screen
      name="Profile"
      component={ProfileNavigator}
      options={{
        tabBarIcon: ({ color, size }) => <FontIcon name="user" color={color} size={size} solid />,
      }}
    />
  </Tab.Navigator>
)

export default TabNavigator
