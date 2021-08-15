import React, {useState} from "react";
import {View, Text} from "./Themed";
import {Portal, Searchbar, Card, Divider, Modal} from 'react-native-paper';
import {Challenge} from "./Models/Challenge";
import ChallengeCard from "./ChallengeCard/ChallengeCard";
import {useMutation} from "@apollo/client";
import {CREATE_CHALLENGE} from "./apollo-graph/Mutations";
import SearchBarComponent from "./SearchBar/SearchBarComponent";
import {Dimensions, ScrollView} from "react-native";


const mockedChallenges = [
    {
        id: 1,
        title: "Challenge 1"
    },
    {
        id: 1,
        title: "Challenge Title 2"
    },
    {
        id: 1,
        title: "Best Challenge Title 3"
    },
]

const SearchScreen = () => {

    const [challengeList, setChallengeList] = useState<any>(mockedChallenges);


    //aca hay que poner algo que funcione, puse esto para usar de ejemplo
  /*  const [query] = useMutation(CREATE_CHALLENGE, {
        onCompleted: result => {
            setChallengeList([...challengeList, result.saveChallenge])
        }
    });*/

    const onChange = (searchValue: string) => {
        if (!searchValue || searchValue === "") setChallengeList(mockedChallenges);
        else {
            const filteredChallenges = mockedChallenges.filter(challenge =>
                challenge.title.toLowerCase().includes(searchValue.toLowerCase().trim())
            );
            setChallengeList(filteredChallenges);
        }
    }

  return (

      <View>
          <Card style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
          }}>
       <SearchBarComponent onChange={onChange}/>
          <Divider />
          <ScrollView>
            {
                challengeList.map((challenge, i) =>
                  <View key={i} style={{marginBottom:30}}>
                      <ChallengeCard challenge={challenge}/>
                      <Divider />
                  </View>

                )
            }
          </ScrollView>

          </Card>
      </View>





  )
}

export default SearchScreen;
