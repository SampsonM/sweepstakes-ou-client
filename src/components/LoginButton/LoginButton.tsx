import React from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { LoginStackParamList } from '../../navigator/Stacks/Login'
import { useAuthHook, useGoogleAuth } from '../../utils/hooks'
import { useLoginMutation } from '../../slices/user.slice'
import Button from '../Button'

export type LoginProps = NativeStackScreenProps<LoginStackParamList, 'Login'>

const LoginButton = () => {
  const [request, googleOAuthResponse, initiateGoogleAuth] = useGoogleAuth()
  const { isLoading } = useAuthHook(googleOAuthResponse, useLoginMutation)

  return (
    <Button
      disabled={!request || isLoading}
      label="Login with Google"
      onPress={() => initiateGoogleAuth()}
    />
  )
}

export default LoginButton
