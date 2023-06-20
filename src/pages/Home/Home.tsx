import React, { useEffect, useState } from 'react'

import BasicScreenWrapper from '../../components/common/BasicScreenWrapper'
import { SweepstakeGroups } from '../../components/SweepstakeGroups'
import Button from '../../components/common/Button'
import { Card, Text, TextField } from 'react-native-ui-lib'
import secureStore from '../../utils/secureStore'
import { useCreateGroupMutation } from '../../slices/group.slice'
import { setGroups } from '../../slices/app.slice'
import { useDispatch } from 'react-redux'

const Home = () => {
  const [groupName, setGroupName] = useState('')
  const [createGroupVisible, setCreateGroupVisible] = useState(false)
  const [createGroupInitiator, { data: createGroupResponse, isLoading }] = useCreateGroupMutation()
  const dispatch = useDispatch()

  const handleCreateGroup = async () => {
    const authToken = await secureStore.getSecureAuthToken()
    const groupData = {
      groupName
    }

    createGroupInitiator({ authToken, groupData })
    setCreateGroupVisible(false)
  }

  useEffect(() => {
    if (createGroupResponse && createGroupResponse?.length > 0) {
      dispatch(setGroups(createGroupResponse))
    }
  }, [createGroupResponse])

  return (
    <BasicScreenWrapper>
      <SweepstakeGroups />

      {createGroupVisible
        ? <Card marginB-10 padding-10>
          {
            isLoading
              ? <Text>Is loading...</Text>
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


      <Button label='Add new group +' onPress={() => setCreateGroupVisible(true)} />
    </BasicScreenWrapper>
  )
}

export default Home
