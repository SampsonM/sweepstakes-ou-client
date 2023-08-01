import React, { useMemo } from 'react'

import { useAuthHook, useGetOAuthProvider } from '../../utils/hooks'
import Button from '../common/Button'

export type OAuthProviders = 'google' | 'facebook'

export type AuthButtonProps = {
  mutation: any,
  type: 'SIGN_UP' | 'LOGIN',
  oauthProvider: OAuthProviders
}

const AuthButton = ({ mutation, type, oauthProvider }: AuthButtonProps) => {
  const [oauthRequest, oauthResponse, initiateOAuth] = useGetOAuthProvider(oauthProvider)
  const { isLoading } = useAuthHook(oauthResponse, mutation)

  const label = useMemo(() => {
    if (type === 'LOGIN') {
      return `Login with ${oauthProvider}`
    } else {
      return `Sign-up with ${oauthProvider}`
    }
  }, [])

  return (
    <Button
      type={type === "SIGN_UP" ? 'secondary' : 'primary'}
      disabled={!oauthRequest || isLoading}
      label={label}
      onPress={() => initiateOAuth()}
    />
  )
}

export default AuthButton
