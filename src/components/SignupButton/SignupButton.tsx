import React from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { LoginStackParamList } from '../../navigator/Stacks/Login'
import { useAuthHook, useGoogleAuth } from '../../utils/hooks'
import { useSignUpMutation } from '../../slices/user.slice'
import Button from '../Button'

export type LoginProps = NativeStackScreenProps<LoginStackParamList, 'Login'>

const SignupButton = () => {
  const [request, googleOAuthResponse, initiateGoogleAuth] = useGoogleAuth()
  const { isLoading } = useAuthHook(googleOAuthResponse, useSignUpMutation)

  return (
    <Button
      secondary
      disabled={!request || isLoading}
      label="Sign-Up using Google"
      onPress={() => initiateGoogleAuth()}
    />
  )
}

export default SignupButton
