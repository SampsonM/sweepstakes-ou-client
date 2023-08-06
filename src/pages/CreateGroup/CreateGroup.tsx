import React, { useEffect, useState } from 'react'

import BasicScreenWrapper from '../../components/common/BasicScreenWrapper'
import Button from '../../components/common/Button'
import { Card, Dialog, PanningProvider, Text } from 'react-native-ui-lib'
import secureStore from '../../utils/secureStore'
import { useCreateGroupMutation } from '../../slices/group.slice'
import { setGroups } from '../../slices/app.slice'
import { useDispatch } from 'react-redux'
import BlurCard from '../../components/BlurCard'
import TextField from '../../components/common/TextField'
import { useNavigation } from '@react-navigation/native'

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('')
  const [isLearnMoreVisible, setLearnMoreVisible] = useState(false)
  const [showNewGroupSuccessCard, setShowNewGroupSuccessCard] = useState(false)
  const [createGroupInitiator, createGroupData] = useCreateGroupMutation()
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleCreateGroup = async () => {
    setShowNewGroupSuccessCard(false)
    const authToken = await secureStore.getSecureAuthToken()
    const groupData = {
      groupName
    }

    createGroupInitiator({ authToken, groupData })
  }

  const handleLearnMore = () => {
    setLearnMoreVisible(true)
  }

  useEffect(() => {
    navigation.addListener('blur', () => {
      setGroupName('')
      setShowNewGroupSuccessCard(false)
    })
  })

  useEffect(() => {
    if (createGroupData?.data && createGroupData.data.groups?.length > 0) {
      setShowNewGroupSuccessCard(true)
      dispatch(setGroups(createGroupData.data.groups))
    }
  }, [createGroupData.data])

  return (
    <BasicScreenWrapper>
      {showNewGroupSuccessCard ?
        <Card marginB-10 padding-10>
          <Text text70 marginB-5>Your new group has been created!</Text>
          <Text text70 marginB-10>People can join your group using the following group name and ID.</Text>
          <Text text60 marginB-5>Name: {createGroupData?.data?.newGroup.groupName}</Text>
          <Text text60 marginB-5>ID: {createGroupData?.data?.invitePhrase}</Text>
        </Card>
        : null}

      {createGroupData.isError && createGroupData.error ?
        <Card marginB-10 padding-10>
          <Text>{JSON.stringify(createGroupData.error?.data?.message)}</Text>
        </Card>
        : null}

      <Dialog
        visible={isLearnMoreVisible}
        onDismiss={() => setLearnMoreVisible(false)}
        panDirection={PanningProvider.Directions.DOWN}
      >
        <Card marginB-10 padding-10>
          <Text text70 marginB-10>A sweepstake group allows you to run sweepstakes with any event, with the same group of friends, all at the same time!</Text>
          <Text text70 marginB-10>After creating a group we will give you a 4 word invite-phrase that allows others to join your group.</Text>
          <Text text70 marginB-10>Up to 100 people can then join your sweepstake group.</Text>
          <Text text70 marginB-10>As the owner you can then invite people to join using the invite-phrase.</Text>
          <Text text70 marginB-10>You can find the invite phrase later by selecting a group in the groups section of the app.</Text>

          <Button label='Close' onPress={() => setLearnMoreVisible(false)} />
        </Card>
      </Dialog>




      <BlurCard>
        {
          createGroupData.isLoading
            ? <Text>Create group is loading...</Text>
            : <>
              <TextField
                placeholder={'Group name'}
                floatingPlaceholder
                onChangeText={setGroupName}
                enableErrors
                validate={['required', (value: string) => value.length > 6, (value: string) => value.length < 40]}
                validationMessage={['Group name is required', 'Group name is too short', 'Group name is too long']}
                maxLength={40}
              />

              <Button label='Create' onPress={handleCreateGroup} />
              <Button type='tertiary' label='Learn more +' onPress={handleLearnMore} />
            </>
        }
      </BlurCard>

    </BasicScreenWrapper>
  )
}

export default CreateGroup
