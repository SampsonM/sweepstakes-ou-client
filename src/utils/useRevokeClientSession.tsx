import { Dispatch, SetStateAction } from 'react'
import * as AuthSession from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'

import SecureStore from './secureStore'
import { logout } from '../slices/app.slice'
import store from './store'

const revokeClientAuthSession = async (
  setIsLoading?: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    const token = await SecureStore.getGoogleAccessToken()
    const tokenValid = Boolean(token)

    if (tokenValid) {
      await AuthSession.revokeAsync({ token }, Google.discovery)
    }

    await SecureStore.deleteSecureAuthToken()
    await SecureStore.deleteGoogleAccessToken()
    store.dispatch(logout())
  } catch (err) {
    console.log('Revoking client session failed - ', err)
  } finally {
    if (setIsLoading) setIsLoading(false)
  }
}

export default revokeClientAuthSession
