import React from 'react'
import { Card, Text, View } from 'react-native-ui-lib'
import { SweepstakeEvent } from '../../slices/events.slice'
import Button from '../common/Button'
import ScrollList from '../common/ScrollList/ScrollList'
import SportIcon from '../common/Icons/SportIcon/SportIcon'

const getDate = (date: string) => {
  const formattedDate = new Date(Number(date))
  const utcDate = formattedDate.getUTCDate()
  const utcMonth = formattedDate.getUTCMonth()
  const utcYear = formattedDate.getUTCFullYear()

  return `${utcDate}-${utcMonth}-${utcYear}`
}

export const EventCard = ({
  event,
  onPress,
}: {
  event: SweepstakeEvent;
  onPress: (eventId: string) => void;
}) => {
  return (
    <Card flexG padding-10 marginH-5>
      <View centerH margin-10 marginB-15>
        <SportIcon sport={event.sport} size={75} />
        <Text text60 marginT-5 red-text-color>
          {event.eventName}
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

      <Text text60 marginB-10>
        participants:
      </Text>

      <View height={120} marginB-15>
        <ScrollList
          data={event.participants}
          listItem={(data: string) => (<Text>{data}</Text>)}
        />
      </View>

      <Button
        marginB-20
        type="primary"
        label="Pick event and assign teams!"
        onPress={() => onPress(event.id)}
      />
    </Card>
  )
}
