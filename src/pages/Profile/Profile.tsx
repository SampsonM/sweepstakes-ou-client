import React from 'react'

import DeleteAccountButton from '../../components/DeleteAccountButton/DeleteAccountButton'
import revokeClientAuthSession from '../../utils/revokeClientSession'
import Button from '../../components/common/Button'
import BasicScreenWrapper from '../../components/common/BasicScreenWrapper'

const Profile = () => {
  return (
    <BasicScreenWrapper>
      <DeleteAccountButton />

      <Button
        secondary
        label="Sign out"
        onPress={() => revokeClientAuthSession()}
      />
    </BasicScreenWrapper>
  )
}

export default Profile
