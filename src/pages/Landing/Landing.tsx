import React from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { LoginStackParamList } from '../../navigator/Stacks/Login'
import { View } from 'react-native-ui-lib'
import BasicScreen from '../../components/BasicScreen'
import { Heading } from '../../components/Typography'
import AuthButton from '../../components/AuthButton'
import { useLoginMutation, useSignUpMutation } from '../../slices/user.slice'

export type LandingProps = NativeStackScreenProps<
  LoginStackParamList,
  'Landing'
>

const Landing = () => (
  <BasicScreen>
    <View flexG center>
      <Heading>SweepSteaks</Heading>
      <View marginT-40>
        <AuthButton
          mutation={useSignUpMutation}
          type="SIGN_UP"
          oauth="google"
        />
        <AuthButton
          mutation={useLoginMutation}
          type="LOGIN"
          oauth="google"
        />
      </View>
    </View>
  </BasicScreen>
)

export default Landing
