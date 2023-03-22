import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import Button from '../../components/Button'
import { colors } from '../../theme'
import { useDispatch } from 'react-redux'
import { logout } from '../../slices/app.slice'

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

const Home = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Home</Text>
      <Button
        title="Go to Details"
        color="white"
        backgroundColor={colors.lightPurple}
        onPress={() => {
          navigation.navigate('Details', { from: 'Home' })
        }}
      />
      <Button
        title="Sign out"
        color="white"
        backgroundColor={colors.lightPurple}
        onPress={handleLogout}
      />
    </View>
  )
}

export default Home
