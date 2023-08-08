import React from 'react'
import { Card } from 'react-native-ui-lib'
import { BlurView } from 'expo-blur'
import { StyleSheet } from 'react-native'


export type BlurCardProps = {
	children: JSX.Element | JSX.Element[] | null
}

const styles = StyleSheet.create({
	card: {
		width: '100%',
		flex: 1,
		backgroundColor: 'transparent',
		borderRadius: 15,
		overflow: 'hidden'
	},
	blurView: { margin: 0, padding: 10, height: '100%', borderRadius: 50 }
})

const BlurCard = ({ children }: BlurCardProps) => {
	return (
		<Card margin-0 marginB-10 style={styles.card}>
			<BlurView intensity={15} tint='dark' style={styles.blurView}>
				{children}
			</BlurView>
		</Card>
	)
}

export default BlurCard
