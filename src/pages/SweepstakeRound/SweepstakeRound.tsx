import React, { useEffect } from 'react'
import BasicScreenWrapper from '../../components/common/BasicScreenWrapper'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeScreenNavigationProp, HomeStackParamList } from '../../navigator/Stacks/Stacks'
import { selectedGroupNameSelector, groupSelector, userDataSelector } from '../../utils/selectors'
import { Card, Chip, Text, View } from 'react-native-ui-lib'
import { StyleSheet } from 'react-native'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { SweepstakeRound as TSweepstakeRound, UserEventParticipantAssociation, useDeleteRoundMutation, useDeleteUserFromRoundMutation } from '../../slices/rounds.slice'
import ScrollList from '../../components/common/ScrollList/ScrollList'
import ProgressIcon from '../../components/common/Icons/ProgressIcon/ProgressIcon'
import SportIcon from '../../components/common/Icons/SportIcon/SportIcon'
import { colors } from '../../theme'
import Button from '../../components/common/Button'
import { useDispatch } from 'react-redux'
import { setSelectedGroupRounds } from '../../slices/app.slice'
import secureStore from '../../utils/secureStore'
import { useNavigation } from '@react-navigation/native'
import { Group } from '../../slices/group.slice'

type SweepStakeRoundParams = NativeStackScreenProps<
  HomeStackParamList,
  'SweepstakeRound'
>

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  deleteUserLabel: {
    fontSize: 12,
    display: 'flex',
    alignSelf: 'center',
    lineHeight: 20,
    marginRight: 3,
  },
  deleteUserContainer: {
    paddingRight: 8,
    backgroundColor: colors['dark-yellow']
  }
})

interface UserParticipantAssociationProps {
  association: UserEventParticipantAssociation;
  winner: string;
  showDelete: boolean;
  handleDeleteUser: (userId: string) => void;
}

const DeleteUserButton = ({ handleDeleteUser, userId }: { userId: string; handleDeleteUser: (userId: string) => void; }) => {
  return (
    <Chip
      onPress={() => handleDeleteUser(userId)}
      label='Remove member?'
      size={{ height: 25 }}
      labelStyle={styles.deleteUserLabel}
      rightElement={<FontIcon name={'times'} color={colors['red']} size={14} solid />}
      containerStyle={styles.deleteUserContainer}
    />
  )
}

const UserParticipantAssociation = ({ association, winner, showDelete, handleDeleteUser }: UserParticipantAssociationProps) => {
  return (
    <View flexG row spread centerV padding-4>
      <Text>{association.givenName} - {association.eventParticipantName}</Text>
      {
        winner === association.eventParticipantName
          ? <><Text text60 gold-text-color>Winner!</Text><FontIcon name={'medal'} color={colors['dark-gold']} size={18} solid /></>
          : null
      }
      {
        showDelete
          ? <DeleteUserButton userId={association.id} handleDeleteUser={handleDeleteUser} />
          : null
      }
    </View>
  )
}

const WinnerMessage = ({ winner, inProgress }: { winner: string; inProgress: boolean; }) => {
  return (
    <Text text70>
      {inProgress
        ? 'The winner of this round still hasn\'t been decided yet, check back later to see who wins!'
        : `The winner for this event was ${winner}`
      }
    </Text>
  )
}

const RoundCard = ({ round, group }: { round: TSweepstakeRound; group: Group }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>()
  const dispatch = useDispatch()
  const [deleteRound, deleteMutationData] = useDeleteRoundMutation()
  const [deleteUserFromRound, deleteUserData] = useDeleteUserFromRoundMutation()
  const groupId = round.groupId
  const roundId = round.id
  const userData = userDataSelector()
  const handleDeleteRound = async () => {
    const authToken = await secureStore.getSecureAuthToken()
    deleteRound({ roundId: round.id, groupId: round.groupId, authToken })
  }

  const handleDeleteUser = async (userId: string) => {
    const authToken = await secureStore.getSecureAuthToken()
    deleteUserFromRound({ groupId, roundId, userId, authToken })
  }

  useEffect(() => {
    if (deleteUserData.isSuccess) {
      dispatch(setSelectedGroupRounds(deleteUserData.data))
    }
  }, [deleteUserData])

  useEffect(() => {
    if (deleteMutationData.isSuccess) {
      dispatch(setSelectedGroupRounds(deleteMutationData.data))
      navigation.goBack()
    }
  }, [deleteMutationData])

  return (
    <Card padding-10 style={styles.card}>
      <View flexG row spread marginB-10>
        <View>
          <Text text60>Event: </Text>
          <Text text70>{round.event.eventName}</Text>
        </View>
        <View marginL-20>
          <SportIcon sport={round.event.sport} size={42} />
        </View>
      </View>

      <View flexG row marginB-10>
        <Text text60>start-date: </Text>
        <Text text70>{new Date(Number(round.event.startDate)).toDateString()}</Text>
      </View>

      <View flexG row marginB-10>
        <Text text60>end-date: </Text>
        <Text text70>{new Date(Number(round.event.endDate)).toDateString()}</Text>
      </View>

      <View flexG row centerV marginB-10>
        <Text text60>{round.event.inProgress ? 'in-progress - ' : 'Complete - '}</Text>
        <ProgressIcon inProgress={round.event.inProgress} size={20} />
      </View>

      <View flexG row centerV marginB-10>
        <WinnerMessage winner={round.event.eventWinner} inProgress={round.event.inProgress} />
      </View>

      <View marginB-20>
        <Text text60 marginB-5>assigned teams: </Text>
        <Text text80 marginB-10>These are the teams assigned to each group member </Text>

        <ScrollList
          data={round.userEventParticipantAssociations}
          listItem={(association: UserEventParticipantAssociation) => (
            <UserParticipantAssociation
              handleDeleteUser={handleDeleteUser}
              showDelete={group.isOwner && association.id !== userData.user.id}
              winner={round.event.eventWinner}
              association={association}
            />
          )}
        />
      </View>

      {
        group.isOwner ? <Button type='secondary' label='Delete round' onPress={handleDeleteRound} /> : null
      }
    </Card>
  )
}

const SweepstakeRound = ({ route }: SweepStakeRoundParams) => {
  const roundId = route.params.roundId
  const selectedGroupName = selectedGroupNameSelector()
  const group = groupSelector(selectedGroupName)
  const round = group.rounds.find(r => r.id === roundId)

  return (
    <BasicScreenWrapper>
      {
        round ? <RoundCard round={round} group={group} /> : <Text text60>No round found...</Text>
      }
    </BasicScreenWrapper>
  )
}

export default SweepstakeRound
