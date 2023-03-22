import React from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import Button from '../../components/Button'
import { LoginStackParamList } from '../../navigator/Login/Stacks'
import { colors } from '../../theme'

type LandingProps = NativeStackScreenProps<LoginStackParamList, 'Landing'>;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.lightGrayPurple,
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
	},
})

const Landing = ({ navigation }: LandingProps) => (
	<View style={styles.root}>
		<StatusBar barStyle="light-content" />
		<Text style={styles.title}>Landing</Text>
		<Button
			title="Login"
			color="white"
			backgroundColor={colors.lightPurple}
			onPress={() => {
				navigation.navigate('Login', { from: 'Landing' })
			}}
		/>
		<Button
			title="Register"
			color="white"
			backgroundColor={colors.lightPurple}
			onPress={() => {
				navigation.navigate('Register', { from: 'Landing' })
			}}
		/>
	</View>
)

export default Landing
