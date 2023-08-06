import React, { useEffect, useState } from 'react'

import BasicScreenWrapper from '../../components/common/BasicScreenWrapper'
import Button from '../../components/common/Button'
import { Card, Dialog, PanningProvider, Text } from 'react-native-ui-lib'
import secureStore from '../../utils/secureStore'
import { useJoinGroupMutation } from '../../slices/group.slice'
import { setGroups } from '../../slices/app.slice'
import { useDispatch } from 'react-redux'
import { userDataSelector } from '../../utils/selectors'
import BlurCard from '../../components/BlurCard'
import TextField from '../../components/common/TextField'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
  const [groupName, setGroupName] = useState('')
  const [groupInvitePhrase, setGroupInvitePhrase] = useState('')
  const [isLearnMoreVisible, setLearnMoreVisible] = useState(false)
  const [showJoinGroupSuccessCard, setShowJoinGroupSuccessCard] = useState(false)
  const [joinGroupInitiator, joinGroupData] = useJoinGroupMutation()
  const dispatch = useDispatch()
  const userData = userDataSelector()
  const navigation = useNavigation()

  const handleJoinGroup = async () => {
    setShowJoinGroupSuccessCard(false)
    const authToken = await secureStore.getSecureAuthToken()

    joinGroupInitiator({ authToken, groupName, groupMemberId: userData.user.id || '', groupInvitePhrase })
  }

  const handleLearnMore = () => {
    setLearnMoreVisible(true)
  }

  useEffect(() => {
    navigation.addListener('blur', () => {
      setGroupName('')
      setShowJoinGroupSuccessCard(false)
    })
  })

  useEffect(() => {
    if (joinGroupData?.data && joinGroupData.data.groups?.length > 0) {
      setShowJoinGroupSuccessCard(true)
      dispatch(setGroups(joinGroupData.data.groups))
    }
  }, [joinGroupData.data])

  return (
    <BasicScreenWrapper>

      {showJoinGroupSuccessCard ?
        <Card marginB-10 padding-10>
          <Text>Awesome you have now joined group {groupName}</Text>
        </Card>
        : null}

      {joinGroupData.isError && joinGroupData.error ?
        <Card marginB-10 padding-10>
          <Text>{JSON.stringify(joinGroupData.error?.data?.message)}</Text>
        </Card>
        : null}

      <Dialog
        visible={isLearnMoreVisible}
        onDismiss={() => setLearnMoreVisible(false)}
        panDirection={PanningProvider.Directions.DOWN}
      >
        <Card marginB-10 padding-10>
          <Text text70 marginB-10>After joining a group you can view the group by selecting a group in the groups section of the app.</Text>
          <Text text70 marginB-10>Once everyone has joined the group owner can start the process of starting a sweepstake round.</Text>

          <Button label='Close' onPress={() => setLearnMoreVisible(false)} />
        </Card>
      </Dialog>

      <BlurCard>
        {
          joinGroupData.isLoading
            ? <Text>Join group is loading...</Text>
            : <>
              <TextField
                placeholder={'Group name'}
                floatingPlaceholder
                onChangeText={setGroupName}
                enableErrors
                validate={['required']}
                validationMessage={['Group name is required']}
                maxLength={40}
              />

              <TextField
                placeholder={'Invite phrase'}
                floatingPlaceholder
                onChangeText={setGroupInvitePhrase}
                enableErrors
                validate={['required']}
                validationMessage={['Group invite phrase is required']}
                maxLength={40}
              />

              <Button label='Join group' onPress={handleJoinGroup} />
              <Button type='tertiary' label='Learn more +' onPress={handleLearnMore} />

            </>
        }
      </BlurCard>

    </BasicScreenWrapper>
  )
}

export default Home
