import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'

import Button from '../common/Button'
import { useDeleteAccountMutation } from '../../slices/user.slice'
import SecureStore from '../../utils/secureStore'
import revokeClientAuthSession from '../../utils/revokeClientSession'

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
