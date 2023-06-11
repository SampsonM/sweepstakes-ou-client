import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { LoginNavigator } from './Stacks'
import { appStateSelector } from '../utils/selectors'
import WoodBackground from '../components/WoodBackground'
import TabNavigator from './Tabs/Tabs'
import SecureStore from '../utils/secureStore'
import { useVerifyMutation } from '../slices/user.slice'
import { useDispatch } from 'react-redux'
import { authenticate } from '../slices/app.slice'
import { Heading } from '../components/common/Typography'
import BasicScreen from '../components/common/BasicScreenWrapper'

const MyTheme = {
  colors: {
    background: 'transparent',
    primary: '',
    card: '',
    text: '',
    border: '',
    notification: '',
  },
  dark: false,
}

const renderScreen = (isLoading: boolean, loggedIn: boolean) => {
  if (isLoading) {
    return (
      <BasicScreen>
        <Heading>Loading...</Heading>
      </BasicScreen>
    )
  }

  if (loggedIn) {
    return <TabNavigator />
  }

  return <LoginNavigator />
}

const Navigator = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const { loggedIn } = appStateSelector()
  const [verify, { data: user, isSuccess, error, isError, reset }] = useVerifyMutation()

  // Handles calling verify API 
  useEffect(() => {
    const verifyToken = async () => {
      reset()
      const authToken = await SecureStore.getSecureAuthToken()
      const idToken = await SecureStore.getGoogleIdToken()
      verify({ authToken, idToken })
    }

    verifyToken()
  }, [])

  // Handles successful verification
  useEffect(() => {
    if (isSuccess && user) {
      dispatch(authenticate({ loggedIn: true, checked: true, user }))
      setIsLoading(false)
    }
  }, [isSuccess, user])

  // Handles failed verification
  useEffect(() => {
    if (isError && error) {
      dispatch(authenticate({ loggedIn: false, checked: true, user: {} }))
      setIsLoading(false)
    }
  }, [isError, error])

  return (
    <NavigationContainer theme={MyTheme}>
      <WoodBackground>
        {renderScreen(isLoading, loggedIn)}
      </WoodBackground>
    </NavigationContainer>
  )
}

export default Navigator
