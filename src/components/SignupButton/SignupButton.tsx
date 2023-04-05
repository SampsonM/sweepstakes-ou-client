import React, { useEffect } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { LoginStackParamList } from '../../navigator/Stacks/Login'
import { useDispatch } from 'react-redux'
import { authenticate } from '../../slices/app.slice'
import { UserResponseData, useSignUpMutation } from '../../slices/user.slice'
import Button from '../Button'
import useGoogleAuth from '../../utils/hooks/useGoogleAuth'
import { Alert } from 'react-native'
import SecureStore from '../../utils/secureStore'

export type LoginProps = NativeStackScreenProps<LoginStackParamList, 'Login'>

const SignupButton = () => {
  const dispatch = useDispatch()
  const [request, googleOAuthResponse, initiateGoogleAuth] = useGoogleAuth()
  const [signUp, { isSuccess, data, isLoading, error, isError }] =
    useSignUpMutation()

  // Handles successful google oauth flow
  useEffect(() => {
    const responseType = googleOAuthResponse?.type
    const idToken: string = googleOAuthResponse?.params?.id_token
    const accessToken: string = googleOAuthResponse?.params?.access_token
    const googleOauthSuccessful =
      responseType === 'success' && idToken && accessToken

    if (googleOauthSuccessful) {
      SecureStore.setGoogleAccessToken(accessToken)
      signUp(idToken)
    } else if (responseType === 'error') {
      console.log('SOMETHING HAS GONE WRONG WITH GOOGLE OAUTH SIGNUP!')
    }
  }, [googleOAuthResponse])

  // Handles successful signup response
  useEffect(() => {
    const handleSignUpResponse = async (userData: UserResponseData) => {
      await SecureStore.setSecureAuthToken(userData.cookie)
      dispatch(
        authenticate({ loggedIn: true, checked: true, user: userData.user }),
      )
    }

    if (isSuccess && data) handleSignUpResponse(data)
  }, [isSuccess, data])

  // Handles any error response from signup
  useEffect(() => {
    if (isError && error?.data?.message) {
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
