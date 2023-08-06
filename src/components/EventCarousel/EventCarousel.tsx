import React, { useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Card, Carousel, Text, View } from "react-native-ui-lib"
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { Sport, SweepstakeEvent, sportIconMapping } from '../../slices/events.slice'
import Button from '../common/Button'
import { colors } from '../../theme'
import { useStartRoundMutation } from '../../slices/rounds.slice'
import secureStore from '../../utils/secureStore'

const styles = StyleSheet.create({
	eventCardParticipantListItem: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: colors.black,
		height: 30,
		paddingHorizontal: 15,
		paddingTop: 8,
	},
	eventCardParticipantList: {
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: colors.black,
		borderRadius: 10,
		height: 100,
		marginBottom: 15,
	},
	loopCarousel: {
		bottom: 21,
	}
})

interface EventCarouselProps {
	events: SweepstakeEvent[];
	groupName: string;
	groupId: string;
}

const EventCardParticipantListItem = ({ participant }: { participant: string }) => {
	return (
		<View
			style={styles.eventCardParticipantListItem}
		>
			<Text>{participant}</Text>
		</View>
	)
}

export const EventCard = ({ event, onPress }: { event: SweepstakeEvent, onPress: (eventId: string) => void }) => {
	const getIconName = (sport: Sport) => {
		return sportIconMapping[sport]
	}

	const getDate = (date: string) => {
		const formattedDate = new Date(Number(date))
		const utcDate = formattedDate.getUTCDate()
		const utcMonth = formattedDate.getUTCMonth()
		const utcYear = formattedDate.getUTCFullYear()

		return `${utcDate}-${utcMonth}-${utcYear}`
	}

	return (
		<Card flexG padding-10 marginH-5>

			<View centerH margin-10 marginB-15>
				<FontIcon name={getIconName(event.sport)} color={colors['red']} size={75} solid />
				<Text text60 marginT-5 red-text-color>{event.eventName}</Text>
			</View>

			<View flexG row marginB-5>
				<Text text60 marginB-5 >start date: </Text>
				<Text text70 marginB-5>{getDate(event.startDate)}</Text>
			</View>

			<View flexG row marginB-5>
				<Text text60 marginB-5 >end date: </Text>
				<Text text70 marginB-5>{getDate(event.endDate)}</Text>
			</View>

			<Text text60 marginB-5>participants: </Text>
			<FlatList
				style={styles.eventCardParticipantList}
				data={event.participants}
				renderItem={(data) => <EventCardParticipantListItem participant={data.item} />}
			/>

			<Button
				marginB-20
				type="primary"
				label="Pick event and assign teams!"
				onPress={() => onPress(event.id)}
			/>
		</Card >
	)
}

export const EventCarousel = ({ events, groupName, groupId }: EventCarouselProps) => {
	const [startRoundInitiator, startRoundData] = useStartRoundMutation()

	const handleCardPress = async (eventId: string) => {
		const authToken = await secureStore.getSecureAuthToken()
		startRoundInitiator({ authToken, eventId, groupId, groupName })
	}

	useEffect(() => {
		if (startRoundData.isSuccess && startRoundData.data) {
			console.log('ffs finally here ----', data)
		}
	}, [startRoundData])

	if (events.length < 1) {
		return (
			<Card padding-10>
				<Text marginB-5 text60>Welcome to SweepSteaks!</Text>
				<Text text70>There are currently no events available to play right now.</Text>
				<Text text70>Come back soon to see which events are running.</Text>
			</Card>
		)
	}

	return (
		<View padding-0 >
			<Carousel
				loop
				pageControlPosition={Carousel.pageControlPositions.OVER}
				pageControlProps={{
					size: 12,
					containerStyle: styles.loopCarousel
				}}
			>
				{events.map((event) => <EventCard key={event.id} event={event} onPress={handleCardPress} />)}
			</Carousel>
		</View>
	)
}
