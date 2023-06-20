import React from "react"

import useFacebookAuth from "./useFacebookAuth"
import useGoogleAuth from "./useGoogleAuth"
import { OAuthProviders } from "../../components/AuthButton/AuthButton"


const useGetOAuthProvider = (oauthProvider: OAuthProviders = 'google') => {
	if (oauthProvider === 'facebook') {
		throw new Error("Not possible to use FB auth yet!")
	}

	return useGoogleAuth()
}

export default useGetOAuthProvider
