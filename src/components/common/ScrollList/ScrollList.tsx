import React from 'react'
import { FlatList, StyleSheet } from "react-native"
import { colors } from "../../../theme"
import { View } from "react-native-ui-lib"

const styles = StyleSheet.create({
	ScrollListItem: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: colors.black,
		minHeight: 30,
		padding: 5,
	},
	ScrollList: {
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: colors.black,
		borderRadius: 10,
	},
})

const ScrollList = ({ data, listItem }: { data: any[]; listItem: (props: any) => JSX.Element }) => {
	return (
		<FlatList
			style={styles.ScrollList}
			data={data}
			keyExtractor={(item, index) => `${index}`}
			renderItem={({ item }) => (
				<View style={styles.ScrollListItem}>
					{listItem(item)}
				</View>
			)}
		/>
	)
}

export default ScrollList
