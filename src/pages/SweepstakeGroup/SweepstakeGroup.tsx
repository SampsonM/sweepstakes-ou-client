import React, { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Card, Text, View } from 'react-native-ui-lib'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import BasicScreenWrapper from '../../components/common/BasicScreenWrapper'
import Button from '../../components/common/Button'
import { HomeScreenNavigationProp } from '../../navigator/Stacks/Stacks'
import { useDeleteGroupMutation } from '../../slices/group.slice'
import secureStore from '../../utils/secureStore'
import { selectedGroupNameSelector, userDataSelector } from '../../utils/selectors'
import { setGroups } from '../../slices/app.slice'
import { GroupMemberListItem } from './GroupMemberListItem'
import { BlurView } from 'expo-blur'
import BlurCard from '../../components/BlurCard'

const SweepstakeGroup = () => {
	const navigation = useNavigation<HomeScreenNavigationProp>()
	const dispatch = useDispatch()
	const [deleteGroupInitiator, { isLoading, isSuccess, isError, error, data: newGroups }] = useDeleteGroupMutation()
	const selectedGroupName = selectedGroupNameSelector()
	const userData = userDataSelector()
	const group = useMemo(() => userData.groups.find(({ groupName }) => groupName === selectedGroupName), [selectedGroupName])

	if (!group) {
		return null
	}

	const handleDeleteGroup = async () => {
		const authToken = await secureStore.getSecureAuthToken()
		deleteGroupInitiator({ authToken, groupName: group.groupName })
	}

	useEffect(() => {
		if (isSuccess && newGroups) {
			dispatch(setGroups(newGroups))
			navigation.goBack()
		}
	}, [isSuccess])

	return (
		<BasicScreenWrapper>
			<BlurCard>
				<>
					<View paddingB-s5 >
						<Text subheading>Name: {group.groupName}</Text>
					</View>

					{group.invitePhrase && group.isOwner ?
						<View paddingB-s5>
							<Text subheading>Invite Phrase</Text>
							<Text body>{group.invitePhrase}</Text>
						</View>
						: null
					}

					<Text subheading>Members:</Text>

					<FlatList
						data={group.members}
						keyExtractor={(member, i) => `${member.fullName}-${i}`}
						renderItem={({ item }) =>
							<GroupMemberListItem
								groupName={group.groupName}
								showDelete={group.isOwner && userData.user.fullName !== item.fullName}
								member={item}
							/>}
					/>

					{group.rounds.length > 0 && (
						<>
							<Text>Rounds:</Text>
							<FlatList
								data={group.rounds}
								keyExtractor={(round, i) => `${round}-${i}`}
								renderItem={({ item }) => <Text>{item.fullName}</Text>}
							/>
						</>
					)}

					{
						group.isOwner &&
						<Button label='Delete group' type='secondary' disabled={isLoading} onPress={handleDeleteGroup} />
					}
				</>
			</BlurCard>

			{isLoading && <Text>Loading...</Text>}
			{isError && <Text>{JSON.stringify(error)}</Text>}
		</BasicScreenWrapper>
	)
}

export default SweepstakeGroup
