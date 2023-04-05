import * as SecureStore from 'expo-secure-store'
import getAuthTokenFromCookie from './getAuthTokenFromCookie'

const AUTH_TOKEN_KEY = 'AUTH_TOKEN'
const GOOGLE_ACCESS_TOKEN_KEY = 'AUTH_TOKEN'

const setSecureAuthToken = async (cookie: string) => {
  const authToken = getAuthTokenFromCookie(cookie)

  return SecureStore.setItemAsync(AUTH_TOKEN_KEY, authToken)
}

const getSecureAuthToken = async () => {
  const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY)
  return token || ''
}

const deleteSecureAuthToken = async () => {
  return SecureStore.deleteItemAsync(AUTH_TOKEN_KEY)
}

const setGoogleAccessToken = async (accessToken: string) => {
  return SecureStore.setItemAsync(GOOGLE_ACCESS_TOKEN_KEY, accessToken)
}

const getGoogleAccessToken = async () => {
  const token = await SecureStore.getItemAsync(GOOGLE_ACCESS_TOKEN_KEY)
  return token || ''
}

const deleteGoogleAccessToken = async () => {
  return SecureStore.deleteItemAsync(GOOGLE_ACCESS_TOKEN_KEY)
}

export default {
  setSecureAuthToken,
  getSecureAuthToken,
  deleteSecureAuthToken,
  setGoogleAccessToken,
  getGoogleAccessToken,
  deleteGoogleAccessToken,
}
