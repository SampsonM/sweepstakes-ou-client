import React from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import Button from '../../components/Button'
import { LoginStackParamList } from '../../navigator/Login/Stacks'
import { colors } from '../../theme'
import { useDispatch } from 'react-redux'
import { authenticate } from '../../slices/app.slice'

export type LoginProps = NativeStackScreenProps<LoginStackParamList, 'Login'>;

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

const Login = () => {
	const dispatch = useDispatch()

	const login = () => {
		dispatch(authenticate({ loggedIn: true, checked: true }))
	}

	return (
		<View style={styles.root}>
			<StatusBar barStyle="light-content" />
			<Text style={styles.title}>Login</Text>
			<Button
				title="Login?"
				color="white"
				backgroundColor={colors.lightPurple}
				onPress={login}
			/>
		</View>
	)
}

export default Login
