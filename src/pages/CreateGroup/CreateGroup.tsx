import React, { useEffect, useState } from 'react'

import BasicScreenWrapper from '../../components/common/BasicScreenWrapper'
import Button from '../../components/common/Button'
import { Card, Text } from 'react-native-ui-lib'
import secureStore from '../../utils/secureStore'
import { useCreateGroupMutation } from '../../slices/group.slice'
import { setGroups } from '../../slices/app.slice'
import { useDispatch } from 'react-redux'
import BlurCard from '../../components/BlurCard'
import TextField from '../../components/common/TextField'
import { useNavigation } from '@react-navigation/native'

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('')
  const [showNewGroupSuccessCard, setShowNewGroupSuccessCard] = useState(false)
  const [createGroupInitiator, createGroupData] = useCreateGroupMutation()
  const dispatch = useDispatch()

  const navigation = useNavigation()

  useEffect(() => {
    navigation.addListener('blur', () => {
      setGroupName('')
      setShowNewGroupSuccessCard(false)
    })
  })

  const handleCreateGroup = async () => {
    setShowNewGroupSuccessCard(false)
    const authToken = await secureStore.getSecureAuthToken()
    const groupData = {
      groupName
    }

    createGroupInitiator({ authToken, groupData })
  }

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

              <Button label='Create group!' onPress={handleCreateGroup} />
            </>
        }
      </BlurCard>

    </BasicScreenWrapper>
  )
}

export default CreateGroup
