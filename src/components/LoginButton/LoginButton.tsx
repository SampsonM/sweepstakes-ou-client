import React, { useEffect } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { LoginStackParamList } from '../../navigator/Stacks/Login'
import { useDispatch } from 'react-redux'
import { authenticate } from '../../slices/app.slice'
import Button from '../Button'
import useGoogleAuth from '../../utils/hooks/useGoogleAuth'
import { UserData, useLoginMutation } from '../../slices/user.slice'
import { Alert } from 'react-native'
import SecureStore from '../../utils/secureStore'

export type LoginProps = NativeStackScreenProps<LoginStackParamList, 'Login'>

const LoginButton = () => {
  const dispatch = useDispatch()
  const [login, { isSuccess, data, isLoading, error, isError }] =
    useLoginMutation()
  const [request, googleOAuthResponse, initiateGoogleAuth] = useGoogleAuth()

  // Handles successful google oauth flow
  useEffect(() => {
    const responseType = googleOAuthResponse?.type
    const idToken: string = googleOAuthResponse?.params?.id_token
    const accessToken: string = googleOAuthResponse?.params?.access_token
    const googleOauthSuccessful =
      responseType === 'success' && idToken && accessToken

    if (googleOauthSuccessful) {
      SecureStore.setGoogleAccessToken(accessToken)
      SecureStore.setGoogleIdToken(idToken)
      login(idToken)
    } else if (responseType === 'error') {
      console.log('SOMETHING HAS GONE WRONG WITH GOOGLE OAUTH LOGIN!')
    }
  }, [googleOAuthResponse])

  // Handles successful login response
  useEffect(() => {
    const handleLoginResponse = async (userData: UserData) => {
      await SecureStore.setSecureAuthToken(userData.cookie)
      dispatch(
        authenticate({ loggedIn: true, checked: true, user: userData.user }),
      )
    }

    if (isSuccess && data) handleLoginResponse(data)
  }, [isSuccess, data])

  // Handles error response from login
  useEffect(() => {
    if (isError && error?.data?.message) {
      Alert.alert(error.data.message)
    }
  }, [isError, error])

  return (
    <Button
      disabled={!request || isLoading}
      label="Login with Google"
      onPress={() => initiateGoogleAuth()}
    />
  )
}

export default LoginButton
