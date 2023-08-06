import React, { useEffect } from 'react'
import { Text, View } from 'react-native-ui-lib'
import BasicScreenWrapper from '../../components/common/BasicScreenWrapper'
import secureStore from '../../utils/secureStore'
import { useLazyGetEventsQuery } from '../../slices/events.slice'
import { EventCarousel } from '../../components/EventCarousel'
import { selectedGroupNameSelector } from '../../utils/selectors'

const StartRound = ({ groupId }) => {
	const [triggerGetEvents, eventsResult] = useLazyGetEventsQuery()
	const groupName = selectedGroupNameSelector()

	useEffect(() => {
		const getEvents = async () => {
			const authToken = await secureStore.getSecureAuthToken()
			triggerGetEvents({ authToken })
		}

		getEvents()
	}, [])

	return (
		<BasicScreenWrapper>
			<View style={{ height: '100%' }}>
				<>
					{eventsResult.isLoading ? <Text>Loading...</Text> : null}

					{
						eventsResult.isSuccess && eventsResult.data
							? <EventCarousel events={eventsResult.data} groupId={groupId} groupName={groupName} />
							: null
					}
				</>
			</View>
		</BasicScreenWrapper>
	)
}

export default StartRound
