import React, { useEffect, useState } from 'react'

import BasicScreenWrapper from '../../components/common/BasicScreenWrapper'
import { SweepstakeGroups } from '../../components/SweepstakeGroups'
import Button from '../../components/common/Button'
import { Card, Text, TextField } from 'react-native-ui-lib'
import secureStore from '../../utils/secureStore'
import { useCreateGroupMutation, useJoinGroupMutation } from '../../slices/group.slice'
import { setGroups } from '../../slices/app.slice'
import { useDispatch } from 'react-redux'
import { userDataSelector } from '../../utils/selectors'

const Home = () => {
  const [groupName, setGroupName] = useState('')
  const [groupInvitePhrase, setGroupInvitePhrase] = useState('')
  const [createGroupCardVisible, setCreateGroupCardVisible] = useState(false)
  const [joinGroupCardVisible, setJoinGroupCardVisible] = useState(false)
  const [showNewGroupSuccessCard, setShowNewGroupSuccessCard] = useState(false)
  const [showJoinGroupSuccessCard, setShowJoinGroupSuccessCard] = useState(false)
  const [createGroupInitiator, createGroupData] = useCreateGroupMutation()
  const [joinGroupInitiator, joinGroupData] = useJoinGroupMutation()
  const dispatch = useDispatch()
  const userData = userDataSelector()

  const showCreateNewGroupCard = () => {
    setShowNewGroupSuccessCard(false)
    setJoinGroupCardVisible(false)
    setCreateGroupCardVisible(true)
  }

  const handleCreateGroup = async () => {
    setShowNewGroupSuccessCard(false)
    setShowJoinGroupSuccessCard(false)
    const authToken = await secureStore.getSecureAuthToken()
    const groupData = {
      groupName
    }

    createGroupInitiator({ authToken, groupData })
    setCreateGroupCardVisible(false)
  }

  const showJoinGroupCard = () => {
    setGroupName('')
    setCreateGroupCardVisible(false)
    setJoinGroupCardVisible(true)
  }

  const handleJoinGroup = async () => {
    setShowJoinGroupSuccessCard(false)
    setShowNewGroupSuccessCard(false)
    const authToken = await secureStore.getSecureAuthToken()

    joinGroupInitiator({ authToken, groupName, groupMemberId: userData.user.id, groupInvitePhrase })
    setJoinGroupCardVisible(false)
  }

  useEffect(() => {
    if (createGroupData?.data && createGroupData.data.groups?.length > 0) {
      setShowNewGroupSuccessCard(true)
      dispatch(setGroups(createGroupData.data.groups))
    }
  }, [createGroupData.data])

  useEffect(() => {
    if (joinGroupData?.data && joinGroupData.data.groups?.length > 0) {
      setShowJoinGroupSuccessCard(true)
      dispatch(setGroups(joinGroupData.data.groups))
    }
  }, [joinGroupData.data])

  return (
    <BasicScreenWrapper>
      <SweepstakeGroups />

      {showNewGroupSuccessCard ?
        <Card marginB-10 padding-10>
          <Text>Awesome your new group is created, invite members by sharing this id - {createGroupData?.data?.invitePhrase}</Text>
        </Card>
        : null}

      {showJoinGroupSuccessCard ?
        <Card marginB-10 padding-10>
          <Text>Awesome you have now joined group {groupName}</Text>
        </Card>
        : null}

      {createGroupData.isError && createGroupData.error ?
        <Card marginB-10 padding-10>
          <Text>{JSON.stringify(createGroupData.error?.data?.message)}</Text>
        </Card>
        : null}

      {joinGroupData.isError && joinGroupData.error ?
        <Card marginB-10 padding-10>
          <Text>{JSON.stringify(joinGroupData.error?.data?.message)}</Text>
        </Card>
        : null}

      {createGroupCardVisible
        ? <Card marginB-10 padding-10>
          {
            createGroupData.isLoading
              ? <Text>Create group is loading...</Text>
              : <>
                <TextField
                  placeholder={'Group name...'}
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
        </Card>
        : null
      }

      {joinGroupCardVisible
        ? <Card marginB-10 padding-10>
          {
            joinGroupData.isLoading
              ? <Text>Join group is loading...</Text>
              : <>
                <TextField
                  placeholder={'Group name...'}
                  floatingPlaceholder
                  onChangeText={setGroupName}
                  enableErrors
                  validate={['required']}
                  validationMessage={['Group name is required']}
                  maxLength={40}
                />

                <TextField
                  placeholder={'Invite phrase...'}
                  floatingPlaceholder
                  onChangeText={setGroupInvitePhrase}
                  enableErrors
                  validate={['required']}
                  validationMessage={['Group invite phrase is required']}
                  maxLength={40}
                />

                <Button label='Join group!' onPress={handleJoinGroup} />
              </>
          }
        </Card>
        : null
      }


      <Button label='Create new group +' onPress={showCreateNewGroupCard} />
      <Button label='Join group' secondary onPress={showJoinGroupCard} />
    </BasicScreenWrapper>
  )
}

export default Home
