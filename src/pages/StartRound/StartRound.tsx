import React, { useEffect } from 'react'
import { Text } from 'react-native-ui-lib'
import BasicScreenWrapper from '../../components/common/BasicScreenWrapper'
import secureStore from '../../utils/secureStore'
import BlurCard from '../../components/BlurCard'
import { useLazyGetEventsQuery } from '../../slices/events.slice'

const StartRound = () => {
	// TODO: show users assigned to teams
	// TODO: allow shuffle off users and teams once

	const [triggerGetEvents, eventsResult] = useLazyGetEventsQuery()

	useEffect(() => {
		const getEvents = async () => {
			const authToken = await secureStore.getSecureAuthToken()
			triggerGetEvents({ authToken })
		}

		getEvents()
	}, [])

	return (
		<BasicScreenWrapper>
			<BlurCard>
				<>
					{eventsResult.isLoading ? <Text>Loading...</Text> : null}

					{
						eventsResult.isSuccess && eventsResult.data && eventsResult.data.length > 0 ?
							<>
								<Text>Choose event</Text>

								{eventsResult.data.map(e => <Text key={e.id}>{e.eventName}</Text>)}
							</>
							: null

					}
				</>
			</BlurCard>
		</BasicScreenWrapper>
	)
}

export default StartRound
