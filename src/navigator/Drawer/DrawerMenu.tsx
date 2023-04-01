import React from 'react'
import { View, SafeAreaView, Text, StyleSheet } from 'react-native'

import { DrawerActions } from '@react-navigation/native'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../../theme'
import { DrawerContentComponentProps } from '@react-navigation/drawer'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const DrawerMenu = ({ navigation }: DrawerContentComponentProps) => (
  <SafeAreaView style={styles.root}>
    <View style={styles.head}>
      <FontIcon.Button
        name="times"
        size={20}
        color={colors.grey}
        backgroundColor="white"
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer())
        }}
      />
    </View>

    <View style={styles.main}>
      <Text>Put drawer items here? do we need one?</Text>
    </View>
  </SafeAreaView>
)

export default DrawerMenu
