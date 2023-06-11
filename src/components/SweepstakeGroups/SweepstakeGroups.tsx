import React from 'react'
import { Card, Text, View } from "react-native-ui-lib"

import { Heading } from "../common/Typography"
import { FlatList } from 'react-native'

type Group = {
	id: string,
	name: string,
	rounds: any[],
	members: any[]
}

export const SweepstakeGroup = ({ group }: { group: Group }) => {
	return (
		<Card marginB-10 padding-10 onPress={(foo: any) => console.log(foo)}>
			<Text>Group Name - {group.name}</Text>
			<Text>Members: {group.members.length ?? 0}</Text>
			<Text>Rounds: {group.rounds.length ?? 0}</Text>
		</Card>
	)
}

export const SweepstakeGroups = () => {
	const groups = [
		{
			name: 'Foo',
			id: '0',
			rounds: [],
			members: []
		},
		{
			name: 'Baa',
			id: '1',
			rounds: [],
			members: []
		},
	]

	return (
		<View padding-0 margin-0 flexG style={{ width: 400 }}>
			<Heading>Groups</Heading>

			<FlatList
				data={groups}
				keyExtractor={({ id }) => id}
				renderItem={({ item: group }) => (<SweepstakeGroup group={group} />)}
			/>
		</View>
	)
}
