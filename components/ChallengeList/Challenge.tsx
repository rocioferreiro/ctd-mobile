import "react-apollo"
import {Text, View} from "../Themed";
import React, {useState} from "react";
import {FIND_CHALLENGES_OF_USER} from "../apollo-graph/Queries";
import {useMutation, useQuery} from '@apollo/client';
import {CREATE_CHALLENGE} from "../apollo-graph/Mutations";
import {Challenge} from "../Models/Challenge";
import {StyleSheet} from "react-native";
import {Role} from "../Models/User";
import {Button} from "react-native-paper";
import CreateChallengeModal from "../CreateChallengeModal/CreateChallengeModal";

export function ChallengeList() {
  const [challengeList, setChallengeList] = useState([]);
  const {data, error, loading} = useQuery(FIND_CHALLENGES_OF_USER);
  const [createChallengeVisible, setCreateChallengeVisible] = useState(false);
  const showModal = () => setCreateChallengeVisible(true);
  const hideModal = () => setCreateChallengeVisible(false);

  const [create] = useMutation(CREATE_CHALLENGE, {
    onCompleted: result => {
      setChallengeList([...challengeList, result.saveChallenge])
    }
  });

  const challenge: Challenge = {
    address: {coordinates: {latitude: 10, longitude: 10}, id: '1'},
    date: '2021-09-09',
    title: 'ocean cleaning',
    description: 'go clean the ocean',
    user: {id: '1', name: 'Pepito', mail: 'pepe@mail.com', lastname: 'Perez', role: Role.NORMAL},
    participants: []
  }

  if (loading) return (
    <View>
      <Text>Loading...</Text>
      <CreateChallengeModal visible={createChallengeVisible} onDismiss={hideModal}/>
      <Button mode={'contained'} onPress={() => {
        showModal()
      }}>Create</Button>
    </View>
  );

  if (error) {
    console.log(error.message);
    return <Text>Error :(</Text>;
  }

  const createChallenge = () => {
    create({variables: {newChallenge: challenge}}).catch(e => console.log(e));
  }

  return (
    <View style={styles.container}>
      {
        challengeList.map((challengeId, i) =>
          <Text key={i}>{i} == new challenge of id: {challengeId}</Text>
        )
      }
      {data.map(c => {
        return (
          <Text>
            {c.getCreatedChallengesByUser.title}:{c.getCreatedChallengesByUser.startEvent}
          </Text>)
      })}
      <Button onPress={createChallenge}>Create a Challenge</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  }
});
