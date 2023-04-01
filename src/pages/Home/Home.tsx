import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import Button from '../../components/Button'
import { useDispatch } from 'react-redux'
import { logout } from '../../slices/app.slice'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
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
      
      <Button
        label="Go to Details"
        onPress={() => {
          navigation.navigate('Details', { from: 'Home' })
        }}
      />
      <Button
        secondary
        label="Sign out"
        onPress={handleLogout}
      />
    </View>
  )
}

export default Home
