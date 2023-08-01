import React from 'react'

import DeleteAccountButton from '../../components/DeleteAccountButton/DeleteAccountButton'
import revokeClientAuthSession from '../../utils/revokeClientSession'
import Button from '../../components/common/Button'
import BasicScreenWrapper from '../../components/common/BasicScreenWrapper'
import { userDataSelector } from '../../utils/selectors'
import { Text, View } from 'react-native-ui-lib'
import { Image, StyleSheet } from 'react-native'
import BlurCard from '../../components/BlurCard'

const styles = StyleSheet.create({
  profilePicture: {
    height: 50,
    width: 50,
    borderRadius: 50
  }
})

const Profile = () => {
  const userData = userDataSelector()

  return (
    <BasicScreenWrapper>
      <BlurCard>
        <>
          <View centerH marginB-15>
            <Image style={styles.profilePicture} source={{ uri: userData.user.picture }} />
            <Text text60>{userData.user.fullName}</Text>
          </View>

          <DeleteAccountButton />

          <Button
            type="primary"
            label="Sign out"
            onPress={() => revokeClientAuthSession()}
          />
        </>

      </BlurCard>

    </BasicScreenWrapper>
  )
}

export default Profile
