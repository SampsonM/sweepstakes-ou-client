import React, { useMemo } from 'react'

import { useAuthHook, useGetOAuthProvider } from '../../utils/hooks'
import Button from '../Button'

export type OAuthProviders = 'google' | 'facebook'

export type AuthButtonProps = {
  mutation: any,
  type: 'SIGN_UP' | 'LOGIN',
  oauth: OAuthProviders
}

const AuthButton = ({ mutation, type, oauth }: AuthButtonProps) => {
  const [oauthRequest, oauthResponse, initiateOAuth] = useGetOAuthProvider(oauth)
  const { isLoading } = useAuthHook(oauthResponse, mutation)

  const label = useMemo(() => {
    if (type === 'LOGIN') {
      return `Login with ${oauth}`
    } else {
      return `Sign-up with ${oauth}`
    }
  }, [])

  return (
    <Button
      secondary={type === "SIGN_UP"}
      disabled={!oauthRequest || isLoading}
      label={label}
      onPress={() => initiateOAuth()}
    />
  )
}

export default AuthButton
