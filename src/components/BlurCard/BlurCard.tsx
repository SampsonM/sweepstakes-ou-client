import React from 'react'
import { Card } from 'react-native-ui-lib'
import { BlurView } from 'expo-blur'
import { StyleSheet } from 'react-native'


export type BlurCardProps = {
	children: JSX.Element
}

const styles = StyleSheet.create({
	card: {
		width: '100%',
		flex: 1,
		backgroundColor: 'transparent',
		borderRadius: 20,
		overflow: 'hidden'
	}
})

const BlurCard = ({ children }: BlurCardProps) => {
	return (
		<Card margin-0 marginB-10 style={styles.card}>
			<BlurView intensity={15} tint='dark' style={{ margin: 0, padding: 10, height: '100%', borderRadius: 50 }}>
				{children}
			</BlurView>
		</Card>
	)
}

export default BlurCard