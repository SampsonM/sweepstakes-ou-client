import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Text, View } from 'react-native-ui-lib'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import BasicScreenWrapper from '../../components/common/BasicScreenWrapper'
import Button from '../../components/common/Button'
import { HomeScreenNavigationProp } from '../../navigator/Stacks/Stacks'
import { useDeleteGroupMutation } from '../../slices/group.slice'
import secureStore from '../../utils/secureStore'
import {
  groupSelector,
  selectedGroupNameSelector,
  userDataSelector,
} from '../../utils/selectors'
import { setGroups } from '../../slices/app.slice'
import { GroupMemberListItem } from './GroupMemberListItem'
import BlurCard from '../../components/BlurCard'
import { RoundListItem } from './RoundListItem'

const SweepstakeGroup = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>()
  const dispatch = useDispatch()
  const [
    deleteGroupInitiator,
    { isLoading, isSuccess, isError, error, data: newGroups },
  ] = useDeleteGroupMutation()
  const selectedGroupName = selectedGroupNameSelector()
  const group = groupSelector(selectedGroupName)
  const userData = userDataSelector()

  useEffect(() => {
    if (isSuccess && newGroups) {
      dispatch(setGroups(newGroups))
      navigation.goBack()
    }
  }, [isSuccess])

  if (!group) {
    return null
  }

  const handleDeleteGroup = async () => {
    const authToken = await secureStore.getSecureAuthToken()
    deleteGroupInitiator({ authToken, groupName: group.groupName })
  }

  const handleStartNewRound = async () => {
    navigation.navigate('StartSweepstakeRound', { groupId: group.id })
  }

  const navigateToRound = (roundId: string) => {
    navigation.navigate('SweepstakeRound', { roundId })
  }

  return (
    <BasicScreenWrapper>
      <BlurCard>
        <>
          <View paddingB-s5>
            <Text subheading>Name: {group.groupName}</Text>
          </View>

          {group.invitePhrase && group.isOwner ? (
            <View paddingB-s5>
              <Text subheading>Invite Phrase</Text>
              <Text body>{group.invitePhrase}</Text>
            </View>
          ) : null}

          <Text subheading>Members:</Text>

          <FlatList
            data={group.members}
            keyExtractor={(member, i) => `${member.fullName}-${i}`}
            renderItem={({ item }) => (
              <GroupMemberListItem
                groupName={group.groupName}
                showDelete={
                  group.isOwner && userData.user.fullName !== item.fullName
                }
                member={item}
              />
            )}
          />

          {group.rounds.length > 0 ? (
            <>
              <Text subheading>Rounds:</Text>
              <FlatList
                data={group.rounds}
                keyExtractor={(round) => round.id}
                renderItem={({ item }) => <RoundListItem navigateToRound={navigateToRound} round={item} />}
              />
            </>
          ) : null}

          {group.isOwner && (
            <Button
              label="Start new round"
              type="primary"
              onPress={handleStartNewRound}
            />
          )}

          {group.isOwner && (
            <Button
              label="Delete group"
              type="secondary"
              disabled={isLoading}
              onPress={handleDeleteGroup}
            />
          )}
        </>
      </BlurCard>

      {isLoading && <Text>Loading...</Text>}
      {isError && <Text>{JSON.stringify(error)}</Text>}
    </BasicScreenWrapper>
  )
}

export default SweepstakeGroup
