import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../../theme'

// stack navigators
import { HomeNavigator, ProfileNavigator } from '../Stacks'

const Tab = createBottomTabNavigator()

const getTabBarIcon =
  (route) =>
  ({ focused }) => {
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

const getScreenOptions = ({ route }) => ({
  tabBarIcon: getTabBarIcon(route),
})

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={getScreenOptions}
    tabBarOptions={{
      activeTintColor: colors.lightPurple,
      inactiveTintColor: colors.gray,
      style: {
        // backgroundColor: 'white',
        // borderTopColor: 'gray',
        // borderTopWidth: 1,
        // paddingBottom: 5,
        // paddingTop: 5,
      },
    }}
    initialRouteName="Home"
  >
    <Tab.Screen name="Home" component={HomeNavigator} />
    <Tab.Screen name="Profile" component={ProfileNavigator} />
  </Tab.Navigator>
)

export default TabNavigator
