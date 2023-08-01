import React from 'react'
import { StyleSheet } from 'react-native'
import { TextField as TextFieldUI, TextFieldProps } from 'react-native-ui-lib'

const styles = StyleSheet.create({
	input: {
		backgroundColor: 'white',
		borderRadius: 10,
		paddingHorizontal: 10,
		height: 55,
		marginBottom: 10
	}
})

const TextField = (props: TextFieldProps) => {
	return (
		<TextFieldUI
			{...props}
			containerStyle={styles.input}
		/>
	)
}

export default TextField
