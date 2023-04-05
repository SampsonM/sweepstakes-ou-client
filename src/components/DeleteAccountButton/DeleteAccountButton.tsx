import React, { useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Alert } from 'react-native'

import { LoginStackParamList } from '../../navigator/Stacks/Login'
import Button from '../Button'
import { useDeleteAccountMutation } from '../../slices/user.slice'
import SecureStore from '../../utils/secureStore'
import revokeClientAuthSession from '../../utils/revokeClientSession'

export type LoginProps = NativeStackScreenProps<LoginStackParamList, 'Login'>

const DeleteAccountButton = () => {
  const [isLocalLoading, setLocalIsLoading] = useState(false)
  const [deleteAccount, { isLoading, error, isSuccess, isError }] =
    useDeleteAccountMutation()

  // Handles revoking client session
  useEffect(() => {
    if (isSuccess) revokeClientAuthSession(setLocalIsLoading)
  }, [isSuccess])

  // Handles error response from delete API call
  useEffect(() => {
    if (isError && error?.data?.message) {
      Alert.alert(error.data.message)
      setLocalIsLoading(false)
    }
  }, [isError, error])

  const handleDelete = async () => {
    setLocalIsLoading(true)

    const token = await SecureStore.getSecureAuthToken()

    deleteAccount(token)
  }

  return (
    <Button
      disabled={isLoading || isLocalLoading}
      label="Delete Account"
      onPress={() => handleDelete()}
    />
  )
}

export default DeleteAccountButton
