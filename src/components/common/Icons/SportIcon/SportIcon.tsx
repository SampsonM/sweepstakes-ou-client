import React from 'react'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { Sport, sportIconMapping } from '../../../../slices/events.slice'
import { colors } from '../../../../theme'

const getIconName = (sport: Sport) => {
	return sportIconMapping[sport]
}

const SportIcon = ({ sport, size }: { sport: Sport; size: number; }) => {
	return (
		<FontIcon
			name={getIconName(sport)}
			color={colors['red']}
			size={size}
			solid
		/>
	)
}

export default SportIcon
