import React from 'react'

import DeleteAccountButton from '../../components/DeleteAccountButton/DeleteAccountButton'
import revokeClientAuthSession from '../../utils/useRevokeClientSession'
import Button from '../../components/Button'
import BasicScreen from '../../components/BasicScreen'

const Profile = () => {
  return (
    <BasicScreen>
      <DeleteAccountButton />

      <Button
        secondary
        label="Sign out"
        onPress={() => revokeClientAuthSession()}
      />
    </BasicScreen>
  )
}

export default Profile
