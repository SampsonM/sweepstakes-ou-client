import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontIcon from 'react-native-vector-icons/FontAwesome5'

import { colors } from '../../theme'

import { CreateGroupNavigator, HomeNavigator, JoinGroupNavigator, ProfileNavigator } from '../Stacks'
import { RouteProp } from '@react-navigation/native'

export type TabNavigatorParamList = {
  HomeNavigator: undefined,
  ProfileNavigator: undefined,
  CreateGroupNavigator: undefined,
  JoinGroupNavigator: undefined
}

export type TabRouteProp = RouteProp<
  TabNavigatorParamList,
  'HomeNavigator' | 'ProfileNavigator' | 'CreateGroupNavigator' | 'JoinGroupNavigator'
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
        tabBarLabel: 'Groups',
        tabBarIcon: ({ color, size }) => (
          <FontIcon name="users" color={color} size={size} solid />
        ),
      }}
    />

    <Tab.Screen
      name="CreateGroupNavigator"
      component={CreateGroupNavigator}
      options={{
        headerShown: false,
        tabBarLabel: 'Create Group',
        tabBarIcon: ({ color, size }) => (
          <FontIcon name="plus-square" color={color} size={size} solid />
        ),
      }}
    />

    <Tab.Screen
      name="JoinGroupNavigator"
      component={JoinGroupNavigator}
      options={{
        headerShown: false,
        tabBarLabel: 'Join Group',
        tabBarIcon: ({ color, size }) => (
          <FontIcon name="user-plus" color={color} size={size} solid />
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
