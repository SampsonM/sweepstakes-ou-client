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
import Landing from '../../pages/Landing'
import CreateGroup from '../../pages/CreateGroup'
import JoinGroup from '../../pages/JoinGroup'

export type HomeStackParamList = {
  Home: undefined;
  SweepstakeGroup: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
};

export type CreateGroupStackParamList = {
  CreateGroup: undefined;
};

export type JoinGroupStackParamList = {
  JoinGroup: undefined;
};

export type LoginStackParamList = {
  Landing: undefined,
  Login: undefined,
  Register: undefined
}

export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigatorParamList, 'HomeNavigator'>,
  StackNavigationProp<HomeStackParamList>
>;

// ------------------------------------
// Constants
// ------------------------------------

const HomeStack = createStackNavigator<HomeStackParamList>()
const ProfileStack = createStackNavigator<ProfileStackParamList>()
const CreateGroupStack = createStackNavigator<CreateGroupStackParamList>()
const JoinGroupStack = createStackNavigator<JoinGroupStackParamList>()
const LoginStack = createStackNavigator<LoginStackParamList>()

const navigationProps = {
  headerTintColor: 'white',
  headerStyle: { backgroundColor: colors.yellow },
  headerTitleStyle: { fontSize: 18 },
}

// ------------------------------------
// Navigators
// ------------------------------------

export const HomeNavigator = () => (
  <HomeStack.Navigator initialRouteName="Home" screenOptions={navigationProps}>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={() => ({
        headerMode: 'screen',
        headerTitle: () => <HeaderTitle title="SweepSteaks" />,
      })}
    />
    <HomeStack.Screen
      name="SweepstakeGroup"
      component={SweepstakeGroup}
      options={() => ({
        headerMode: 'screen',
        headerTitle: () => <HeaderTitle title="Groups" />,
        headerBackTitleStyle: { color: 'black' },
        headerTintColor: '#000'
      })}
    />
  </HomeStack.Navigator>
)

export const ProfileNavigator = () => (
  <ProfileStack.Navigator initialRouteName="Profile" screenOptions={navigationProps}>
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      options={() => ({
        headerMode: 'screen',
        headerTitle: () => <HeaderTitle title="Profile" />,
      })}
    />
  </ProfileStack.Navigator>
)

export const CreateGroupNavigator = () => (
  <CreateGroupStack.Navigator initialRouteName="CreateGroup">
    <CreateGroupStack.Screen
      name="CreateGroup"
      component={CreateGroup}
      options={() => ({
        headerMode: 'screen',
        headerTitle: () => <HeaderTitle title="Create Group" />,
      })}
    />
  </CreateGroupStack.Navigator>
)

export const JoinGroupNavigator = () => (
  <JoinGroupStack.Navigator initialRouteName="JoinGroup">
    <JoinGroupStack.Screen
      name="JoinGroup"
      component={JoinGroup}
      options={() => ({
        headerMode: 'screen',
        headerTitle: () => <HeaderTitle title="Join Group" />,
      })}
    />
  </JoinGroupStack.Navigator>
)

export const LoginNavigator = () => (
  <LoginStack.Navigator initialRouteName="Landing" screenOptions={navigationProps}>
    <LoginStack.Screen
      name="Landing"
      component={Landing}
      options={() => ({
        title: 'Landing',
        headerShown: false,
        headerMode: 'screen',
      })}
    />
  </LoginStack.Navigator>
)

