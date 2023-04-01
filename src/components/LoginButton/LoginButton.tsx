import React, { useEffect } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Platform } from 'react-native'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'

import {
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID_REVERSE,
} from '@env'
import { LoginStackParamList } from '../../navigator/Stacks/Login'
import { useDispatch } from 'react-redux'
import { authenticate } from '../../slices/app.slice'
import Button from '../Button'

export type LoginProps = NativeStackScreenProps<LoginStackParamList, 'Login'>

WebBrowser.maybeCompleteAuthSession()

const scheme = Platform.select({
  ios: `${GOOGLE_IOS_CLIENT_ID_REVERSE}:/oauthredirect`,
  android: `com.sweepsteaks.app:/oauthredirect`,
})

const LoginButton = () => {
  const dispatch = useDispatch()

  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      androidClientId: GOOGLE_ANDROID_CLIENT_ID,
      iosClientId: GOOGLE_IOS_CLIENT_ID,
      clientId: GOOGLE_IOS_CLIENT_ID,
      redirectUri: scheme,
      usePKCE: true,
      scopes: ['openid', 'profile', 'email'],
    },
    { useProxy: false },
  )

  useEffect(() => {
    if (response?.type === 'success') {
      console.log('LOGGED IN - ', response.params)
      // Make request to api with code

      dispatch(authenticate({ loggedIn: true, checked: true }))
    }
  }, [response, request])

  return (
    <Button
      disabled={!request}
      label="Login with Google"
      onPress={() => promptAsync({ useProxy: false })}
    />
  )
}

export default LoginButton
