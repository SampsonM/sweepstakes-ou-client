import React from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StyleSheet, Text, View, StatusBar, Alert } from 'react-native'
import Button from '../../components/Button'
import { LoginStackParamList } from '../../navigator/Login/Stacks'
import { colors } from '../../theme'

type RegisterProps = NativeStackScreenProps<LoginStackParamList, 'Register'>;

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

const Register = () => (
	<View style={styles.root}>
		<StatusBar barStyle="light-content" />
		<Text style={styles.title}>Register</Text>
		<Button
			title="Register"
			color="white"
			backgroundColor={colors.lightPurple}
			onPress={() => {
				Alert.prompt('Register?')
				// on success redirect to login page
				// on fail show error
			}}
		/>
	</View>
)

export default Register
