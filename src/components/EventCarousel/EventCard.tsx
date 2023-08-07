import React from 'react'
import { Card, Text, View } from 'react-native-ui-lib'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import {
  Sport,
  SweepstakeEvent,
  sportIconMapping,
} from '../../slices/events.slice'
import { colors } from '../../theme'
import { FlatList, StyleSheet } from 'react-native'
import Button from '../common/Button'

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
})

const EventCardParticipantListItem = ({
  participant,
}: {
  participant: string
}) => {
  return (
    <View style={styles.eventCardParticipantListItem}>
      <Text>{participant}</Text>
    </View>
  )
}

export const EventCard = ({
  event,
  onPress,
}: {
  event: SweepstakeEvent
  onPress: (eventId: string) => void
}) => {
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
        <FontIcon
          name={getIconName(event.sport)}
          color={colors['red']}
          size={75}
          solid
        />
        <Text text60 marginT-5 red-text-color>
          {event.eventName}-{event.id}
        </Text>
      </View>

      <View flexG row marginB-5>
        <Text text60 marginB-5>
          start date:{' '}
        </Text>
        <Text text70 marginB-5>
          {getDate(event.startDate)}
        </Text>
      </View>

      <View flexG row marginB-5>
        <Text text60 marginB-5>
          end date:{' '}
        </Text>
        <Text text70 marginB-5>
          {getDate(event.endDate)}
        </Text>
      </View>

      <Text text60 marginB-5>
        participants:{' '}
      </Text>
      <FlatList
        style={styles.eventCardParticipantList}
        data={event.participants}
        renderItem={(data) => (
          <EventCardParticipantListItem participant={data.item} />
        )}
      />

      <Button
        marginB-20
        type="primary"
        label="Pick event and assign teams!"
        onPress={() => onPress(event.id)}
      />
    </Card>
  )
}
