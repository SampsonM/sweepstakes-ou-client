import React from 'react'
import { Chip } from "react-native-ui-lib"
import { colors } from '../../theme'
import { StyleSheet } from 'react-native'
import { SweepstakeRound } from '../../slices/rounds.slice'
import ProgressIcon from '../../components/common/Icons/ProgressIcon/ProgressIcon'

type RoundListItemProps = {
	round: SweepstakeRound;
	navigateToRound: (roundId: string) => void;
}

const styles = StyleSheet.create({
	label: {
		fontSize: 17,
		display: 'flex',
		alignSelf: 'center',
		lineHeight: 20,
		marginRight: 10
	},
	container: {
		marginBottom: 10,
		backgroundColor: colors['dark-yellow']
	}
})

export const RoundListItem = ({ round, navigateToRound }: RoundListItemProps) => {
	return (
		<Chip
			mb-10
			onPress={() => navigateToRound(round.id)}
			label={round.event.eventName}
			size={{ height: 45 }}
			labelStyle={styles.label}
			rightElement={<ProgressIcon inProgress={round.event.inProgress} size={25} />
			}
			containerStyle={styles.container}
		/>
	)
}
