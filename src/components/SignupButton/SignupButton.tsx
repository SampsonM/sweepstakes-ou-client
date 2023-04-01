import React, { useEffect } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { LoginStackParamList } from '../../navigator/Stacks/Login'
import { useDispatch } from 'react-redux'
import { authenticate } from '../../slices/app.slice'
import { useSignUpMutation } from '../../slices/user.slice'
import Button from '../Button'
import useGoogleAuth from '../../utils/hooks/useGoogleAuth'
import { Alert } from 'react-native'

export type LoginProps = NativeStackScreenProps<LoginStackParamList, 'Login'>

type Error = { data: any }

const SignupButton = () => {
  const dispatch = useDispatch()
  const [signUp, { isSuccess, data: user, isLoading, error, isError }] = useSignUpMutation()
  const [request, response, initiateGoogleAuth] = useGoogleAuth()

  useEffect(() => {
    if (response?.type === 'success' && response.params.id_token) {
      signUp(response.params.id_token)
    }
  }, [response])

  useEffect(() => {
    if (isSuccess) {
      dispatch(authenticate({ loggedIn: true, checked: true, user }))
    }
  }, [isSuccess, user])

  useEffect(() => {
    if (isError && error) {
      Alert.alert(error.data.message)
    }
  }, [isError, error])

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
