import React, {useState} from "react";
import {View, Text} from "./Themed";
import {Portal, Searchbar,Card,Divider} from 'react-native-paper';
import {Challenge} from "./Models/Challenge";
import ChallengeCard from "./ChallengeCard/ChallengeCard";
import {useMutation} from "@apollo/client";
import {CREATE_CHALLENGE} from "./apollo-graph/Mutations";
import SearchBarComponent from "./SearchBar/SearchBarComponent";
import {ScrollView} from "react-native";

const SearchScreen = () => {

    const [challengeList, setChallengeList] = useState([1,2,3]);


    //aca hay que poner algo que funcione, puse esto para usar de ejemplo
  /*  const [query] = useMutation(CREATE_CHALLENGE, {
        onCompleted: result => {
            setChallengeList([...challengeList, result.saveChallenge])
        }
    });*/

  return (
  <View>

      <Card style={{width:350,height:500}}>

       <SearchBarComponent></SearchBarComponent>
          <Divider />
          <ScrollView>
            {
                challengeList.map((challengeId, i) =>
                  <View key={i} style={{marginBottom:30}}>
                      <ChallengeCard ></ChallengeCard>
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
