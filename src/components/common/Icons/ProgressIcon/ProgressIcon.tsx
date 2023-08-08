import React from 'react'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../../../../theme'

const getIconName = (inProgress: boolean) => {
	if (inProgress) {
		return 'clock'
	}
	return 'check-circle'
}

const getIconColor = (inProgress: boolean) => {
	if (inProgress) {
		return colors['dark-red']
	}
	return colors['blue']
}

const ProgressIcon = ({ inProgress, size }: { inProgress: boolean; size: number }) => {
	return (
		<FontIcon
			name={getIconName(Boolean(inProgress))}
			color={getIconColor(Boolean(inProgress))}
			size={size}
			solid
		/>
	)
}

export default ProgressIcon
