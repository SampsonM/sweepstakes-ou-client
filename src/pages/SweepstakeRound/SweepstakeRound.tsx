import React, { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Text, View } from 'react-native-ui-lib'
import { FlatList } from 'react-native-gesture-handler'
import BasicScreenWrapper from '../../components/common/BasicScreenWrapper'
import Button from '../../components/common/Button'
import { HomeScreenNavigationProp } from '../../navigator/Stacks/Stacks'
import { useDeleteGroupMutation } from '../../slices/group.slice'
import secureStore from '../../utils/secureStore'
import { selectedGroupNameSelector, userDataSelector } from '../../utils/selectors'
import { setGroups } from '../../slices/app.slice'
import BlurCard from '../../components/BlurCard'

const SweepstakeRound = () => {
	// TODO: show events to choose from
	// TODO: show users assigned to teams
	// TODO: allow shuffle off users and teams once


	return (
		<BasicScreenWrapper>
			<BlurCard>
				<>

				</>
			</BlurCard>
		</BasicScreenWrapper>
	)
}

export default SweepstakeRound
