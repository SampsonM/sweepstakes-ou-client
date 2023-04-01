import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import {
	GOOGLE_ANDROID_CLIENT_ID,
	GOOGLE_IOS_CLIENT_ID,
	GOOGLE_IOS_CLIENT_ID_REVERSE,
} from '@env'
import { Platform } from 'react-native'

WebBrowser.maybeCompleteAuthSession()

const scheme = Platform.select({
	ios: `${GOOGLE_IOS_CLIENT_ID_REVERSE}:/oauthredirect`,
	android: `com.sweepsteaks.app:/oauthredirect`,
})

const useGoogleAuth = () => {
	return Google.useAuthRequest(
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
}

export default useGoogleAuth
