import { useEffect } from "react"
import SecureStore from "../secureStore"
import { AuthSessionResult } from "expo-auth-session"
import { useDispatch } from "react-redux"
import { authenticate } from "../../slices/app.slice"
import { Alert } from "react-native"
import { UserResponseData } from "../../slices/user.slice"

/**
 * Hook calls a given sign-up or login mutation when google oauth response is successful.
 * Hook used for signup and login flows.
 * 
 * Currently only works for google oauth flow, however,
 * it could be refactored to allow any oauth response to be 
 * watched by passing oauth response to a generic interface
 * 
 * @param oAuthResponse - response to watch for to know to initiate API login/signup
 * @param mutation - sign up or login mutation to be called
 * @returns - isLoading - to let UI know API call is in progress
 */
const useAuthHook = (oAuthResponse: AuthSessionResult | null, mutation: any) => {
	const dispatch = useDispatch()
	const [initiator, { isSuccess, data, isLoading, error, isError }] =
		mutation()

	// Handles successful google oauth flow
	useEffect(() => {
		const responseType = oAuthResponse?.type
		const idToken: string = oAuthResponse?.params?.id_token
		const accessToken: string = oAuthResponse?.params?.access_token
		const googleOauthSuccessful =
			responseType === 'success' && idToken && accessToken

		if (googleOauthSuccessful) {
			SecureStore.setGoogleAccessToken(accessToken)
			SecureStore.setGoogleIdToken(idToken)
			initiator(idToken)
		} else if (responseType === 'error') {
			Alert.alert('SOMETHING HAS GONE WRONG WITH OAUTH!')
			console.log('SOMETHING HAS GONE WRONG WITH OAUTH!')
		}
	}, [oAuthResponse])

	// Handles successful login/signup response
	useEffect(() => {
		const handleMutationResponse = async ({ cookie, data: userData }: UserResponseData) => {
			await SecureStore.setSecureAuthToken(cookie)
			dispatch(
				authenticate({ loggedIn: true, checked: true, userData }),
			)
		}

		if (isSuccess && data) handleMutationResponse(data)
	}, [isSuccess, data])

	// Handles error response from login/signup
	useEffect(() => {
		if (isError && error?.data?.message) {
			Alert.alert(error.data.message)
		}
	}, [isError, error])

	return {
		isLoading
	}
}

export default useAuthHook
