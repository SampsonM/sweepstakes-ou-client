import React, { useEffect } from 'react'
import { Card, Text, View } from 'react-native-ui-lib'
import BasicScreenWrapper from '../../components/common/BasicScreenWrapper'
import secureStore from '../../utils/secureStore'
import { useLazyGetEventsQuery } from '../../slices/events.slice'
import { EventCarousel } from '../../components/EventCarousel'
import { selectedGroupNameSelector } from '../../utils/selectors'
import { HomeStackParamList } from '../../navigator/Stacks/Stacks'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { EventCard } from '../../components/EventCarousel/EventCard'
import { useDispatch } from 'react-redux'
import { useStartRoundMutation } from '../../slices/rounds.slice'
import { setSelectedGroupRounds } from '../../slices/app.slice'

type StartSweepStakeRoundParams = NativeStackScreenProps<
  HomeStackParamList,
  'StartSweepstakeRound'
>

const StartRound = ({ route }: StartSweepStakeRoundParams): JSX.Element => {
  const [triggerGetEvents, eventsResult] = useLazyGetEventsQuery()
  const groupName = selectedGroupNameSelector()
  const [startRoundInitiator, startRoundData] = useStartRoundMutation()
  const dispatch = useDispatch()

  const handleCardPress = async (eventId: string) => {
    const authToken = await secureStore.getSecureAuthToken()
    startRoundInitiator({
      authToken,
      eventId,
      groupId: route.params.groupId,
      groupName,
    })
  }

  const getEvents = async () => {
    const authToken = await secureStore.getSecureAuthToken()
    triggerGetEvents({ authToken, groupId: route.params.groupId })
  }

  useEffect(() => {
    getEvents()
  }, [])

  useEffect(() => {
    if (startRoundData.isSuccess) {
      if (startRoundData.data.length > 0) {
        dispatch(setSelectedGroupRounds(startRoundData.data))
      }

      getEvents()
    }
  }, [startRoundData])

  return (
    <BasicScreenWrapper>
      <View style={{ height: '100%' }}>
        {eventsResult.data && eventsResult.data.length < 1 && (
          <Card padding-10>
            <Text marginB-5 text60>
              Welcome to SweepSteaks!
            </Text>
            <Text text70>
              There are currently no events available to play right now.
            </Text>
            <Text text70>Come back soon to see which events are running.</Text>
          </Card>
        )}

        {eventsResult.isSuccess &&
        Boolean(eventsResult.data) &&
        Boolean(route.params.groupId) ? (
          <EventCarousel loop={eventsResult.data.length > 1}>
            {eventsResult.data.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onPress={handleCardPress}
              />
            ))}
          </EventCarousel>
        ) : null}

        {eventsResult.isLoading ? <Text>Loading...</Text> : null}
      </View>
    </BasicScreenWrapper>
  )
}

export default StartRound
