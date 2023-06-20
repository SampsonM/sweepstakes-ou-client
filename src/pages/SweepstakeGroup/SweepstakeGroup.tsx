import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Card, Text, View } from 'react-native-ui-lib'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import BasicScreenWrapper from '../../components/common/BasicScreenWrapper'
import Button from '../../components/common/Button'
import { HomeScreenNavigationProp, HomeStackParamList } from '../../navigator/Stacks/Stacks'
import { useDeleteGroupMutation } from '../../slices/group.slice'
import secureStore from '../../utils/secureStore'
import { UserData } from '../../slices/user.slice'
import { userDataSelector } from '../../utils/selectors'
import { setGroups } from '../../slices/app.slice'
import { removeGroupFromGroups } from '../../utils/removeGroupFromGroups'
import { GroupMemberListItem } from './GroupMemberListItem'

type Props = NativeStackScreenProps<HomeStackParamList, 'SweepstakeGroup'>;

const SweepstakeGroup = ({ route }: Props) => {
	const group = route.params
	const [deleteGroupInitiator, { isLoading, isSuccess, isError, error }] = useDeleteGroupMutation()
	const navigation = useNavigation<HomeScreenNavigationProp>()
	const userData: UserData = userDataSelector()
	const dispatch = useDispatch()

	const handleDeleteGroup = async () => {
		const authToken = await secureStore.getSecureAuthToken()
		deleteGroupInitiator({ authToken, groupName: group.groupName })
	}

	useEffect(() => {
		if (isSuccess) {
			const newGroups = removeGroupFromGroups(group.groupName, userData.groups)
			dispatch(setGroups(newGroups))

			navigation.goBack()
		}
	}, [isSuccess])

	return (
		<BasicScreenWrapper>
			<Card padding-10 margin-0 marginB-10 style={{ width: '100%', height: 400 }}>
				<View paddingB-s5>
					<Text subheading>Group Name</Text>
					<Text body>{group.groupName}</Text>
				</View>

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
			</Card>

			{
				group.isOwner &&
				<Button label='Delete group' disabled={isLoading} onPress={handleDeleteGroup} />
			}

			{isLoading && <Text>Loading...</Text>}
			{isError && <Text>{JSON.stringify(error)}</Text>}
		</BasicScreenWrapper>
	)
}

export default SweepstakeGroup