import React from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { LoginStackParamList } from '../../navigator/Stacks/Login'
import LoginButton from '../../components/LoginButton'
import SignupButton from '../../components/SignupButton'
import { View } from 'react-native-ui-lib'
import BasicScreen from '../../components/BasicScreen'
import { Heading } from '../../components/Typography'

export type LandingProps = NativeStackScreenProps<
  LoginStackParamList,
  'Landing'
>

const Landing = () => (
  <BasicScreen>
    <View flexG center>
      <Heading>SweepSteaks</Heading>
      <View marginT-40>
        <LoginButton />
        <SignupButton />
      </View>
    </View>
  </BasicScreen>
)

export default Landing
