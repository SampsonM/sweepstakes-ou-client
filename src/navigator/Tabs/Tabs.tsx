import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../../theme'

// stack navigators
import { HomeNavigator, ProfileNavigator } from '../Stacks'
import { RouteProp } from '@react-navigation/native'

export type TabNavigatorParamList = {
  Home: undefined
  Profile: undefined
}

type TabRouteProp = RouteProp<TabNavigatorParamList, 'Home' | 'Profile'>

const Tab = createBottomTabNavigator<TabNavigatorParamList>()

const getTabBarIcon = (route: TabRouteProp, focused: boolean) => {
  switch (route.name) {
    case 'Home':
      return (
        <FontIcon
          name="home"
          color={focused ? colors.lightPurple : colors.gray}
          size={20}
          solid
        />
      )
    case 'Profile':
      return (
        <FontIcon
          name="user"
          color={focused ? colors.lightPurple : colors.gray}
          size={20}
          solid
        />
      )
    default:
      return <View />
  }
}

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }: { route: TabRouteProp }) => ({
      tabBarIcon: ({ focused }) => getTabBarIcon(route, focused),
    })}
    tabBarOptions={{
      activeTintColor: colors.lightPurple,
      inactiveTintColor: colors.gray,
    }}
    initialRouteName="Home"
  >
    <Tab.Screen name="Home" component={HomeNavigator} />
    <Tab.Screen name="Profile" component={ProfileNavigator} />
  </Tab.Navigator>
)

export default TabNavigator
