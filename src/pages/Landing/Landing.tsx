import React from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from 'react-native'
import { LoginStackParamList } from '../../navigator/Stacks/Login'
import LoginButton from '../../components/LoginButton'
import SignupButton from '../../components/SignupButton'
import { View, Text } from 'react-native-ui-lib'

export type LandingProps = NativeStackScreenProps<
  LoginStackParamList,
  'Landing'
>

const Landing = () => (
  <View flex center bg-primary-bg>
    <StatusBar barStyle="dark-content" />

    <Text text50 primary-text-color marginB-10>
      SweepSteaks
    </Text>

    <View>
      <LoginButton />
      <SignupButton />
    </View>
  </View>
)

export default Landing
