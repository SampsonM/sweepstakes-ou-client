import React from 'react'
import { StyleSheet, Image, Text } from 'react-native'
import { images } from '../../theme'

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    color: '#ff0000',
  },
})

const HeaderTitle = () => <Text style={styles.header}>Header</Text>

export default HeaderTitle
