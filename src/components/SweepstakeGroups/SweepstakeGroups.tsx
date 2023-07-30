import React from 'react'
import { Card, Text, View } from "react-native-ui-lib"

import { Heading } from "../common/Typography"
import { FlatList } from 'react-native'
import { userDataSelector } from '../../utils/selectors'
import { UserData } from '../../slices/user.slice'
import { useNavigation } from '@react-navigation/native'
import { HomeScreenNavigationProp } from '../../navigator/Stacks/Stacks'
import { Group } from '../../slices/group.slice'
import { setSelectedGroup } from '../../slices/app.slice'
import { useDispatch } from 'react-redux'

export const SweepstakeGroup = ({ group }: { group: Group }) => {
	const dispatch = useDispatch()
	const navigation = useNavigation<HomeScreenNavigationProp>()

	const handleGroupNavigation = () => {
		dispatch(setSelectedGroup(group.groupName))
		navigation.navigate('SweepstakeGroup')
	}

	return (
		<Card marginB-10 padding-10 onPress={handleGroupNavigation}>
			<Text>Group Name - {group.groupName}</Text>
			<Text>Members: {group.members?.length ?? 0}</Text>
			<Text>Rounds: {group.rounds?.length ?? 0}</Text>
		</Card>
	)
}

export const SweepstakeGroups = () => {
	const userData: UserData = userDataSelector()

	if (userData?.groups?.length < 1) {
		return null
	}

	return (
		<View padding-0 margin-0 flexG style={{ width: 400 }}>
			<Heading>Groups</Heading>

			<FlatList
				data={userData?.groups}
				keyExtractor={({ groupName }) => groupName}
				renderItem={({ item: group }) => (<SweepstakeGroup group={group} />)}
			/>
		</View>
	)
}
