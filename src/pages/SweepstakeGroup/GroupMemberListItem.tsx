import React, { useEffect } from 'react'
import { Chip } from "react-native-ui-lib"
import { User } from "../../slices/user.slice"
import { colors } from '../../theme'
import secureStore from '../../utils/secureStore'
import { Group, useDeleteGroupMemberMutation } from '../../slices/group.slice'
import { useDispatch } from 'react-redux'
import { setGroups } from '../../slices/app.slice'
import { StyleSheet } from 'react-native'

type GroupMemberListItemProps = {
	member: User;
	showDelete: boolean;
	groupName: Group['groupName'];
}

const styles = StyleSheet.create({
	label: {
		fontSize: 17,
		display: 'flex',
		alignSelf: 'center',
		lineHeight: 20
	},
	container: {
		marginBottom: 10
	}
})

export const GroupMemberListItem = ({ member, showDelete, groupName }: GroupMemberListItemProps) => {
	const [deleteGroupMemberInitiator, { isLoading, data, isSuccess }] = useDeleteGroupMemberMutation()
	const dispatch = useDispatch()

	const avatarProps = {
		size: 30,
		animate: true,
		backgroundColor: colors['light-red'],
		source: { uri: member.picture },
	}

	useEffect(() => {
		if (isSuccess && data?.groups) {
			dispatch(setGroups(data.groups))
		}
	}, [data, isSuccess])

	const handleDeleteMember = async () => {
		if (!isLoading) {
			const authToken = await secureStore.getSecureAuthToken()
			deleteGroupMemberInitiator({ groupName, groupMemberId: member.id, authToken })
		}
	}

	return (
		showDelete
			? <Chip
				mb-10
				label={member.fullName}
				size={{ height: 45 }}
				labelStyle={styles.label}
				containerStyle={styles.container}
				onDismiss={handleDeleteMember}
				avatarProps={avatarProps}
			/>
			: <Chip
				label={member.fullName}
				size={{ height: 45 }}
				labelStyle={styles.label}
				containerStyle={styles.container}
				avatarProps={avatarProps}
			/>
	)
}
