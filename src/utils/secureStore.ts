import * as SecureStore from 'expo-secure-store'
import getAuthTokenFromCookie from './getAuthTokenFromCookie'

const AUTH_TOKEN_KEY = 'AUTH_TOKEN'
const GOOGLE_ACCESS_TOKEN_KEY = 'GOOGLE_ACCESS_TOKEN'
const GOOGLE_ACCESS_ID_KEY = 'GOOGLE_ID_TOKEN'

const setSecureAuthToken = async (cookie: string) => {
  const authToken = getAuthTokenFromCookie(cookie)
  await SecureStore.setItemAsync(AUTH_TOKEN_KEY, authToken)
}

const getSecureAuthToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY)
    return token || ''
  } catch (error) {
    return ''
  }
}

const deleteSecureAuthToken = async () => {
  return SecureStore.deleteItemAsync(AUTH_TOKEN_KEY)
}

const setGoogleAccessToken = async (accessToken: string) => {
  return SecureStore.setItemAsync(GOOGLE_ACCESS_TOKEN_KEY, accessToken)
}

const getGoogleAccessToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(GOOGLE_ACCESS_TOKEN_KEY)
    return token || ''
  } catch (error) {
    return ''
  }
}

const deleteGoogleAccessToken = async () => {
  return SecureStore.deleteItemAsync(GOOGLE_ACCESS_TOKEN_KEY)
}

const setGoogleIdToken = async (idToken: string) => {
  return SecureStore.setItemAsync(GOOGLE_ACCESS_ID_KEY, idToken)
}

const getGoogleIdToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(GOOGLE_ACCESS_ID_KEY)
    return token || ''
  } catch (error) {
    return ''
  }
}

const deleteGoogleIdToken = async () => {
  return SecureStore.deleteItemAsync(GOOGLE_ACCESS_ID_KEY)
}

export default {
  setSecureAuthToken,
  getSecureAuthToken,
  deleteSecureAuthToken,
  setGoogleAccessToken,
  getGoogleAccessToken,
  deleteGoogleAccessToken,
  setGoogleIdToken,
  getGoogleIdToken,
  deleteGoogleIdToken,
}
