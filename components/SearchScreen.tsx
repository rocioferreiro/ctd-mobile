import React, {useEffect, useState} from "react";
import {View, Text} from "./Themed";
import {Portal, Searchbar, Card, Divider, Modal, useTheme} from 'react-native-paper';
import ChallengeCard from "./ChallengeCard/ChallengeCard";
import {ApolloProvider, useQuery} from "@apollo/client";
import SearchBarComponent from "./SearchBar/SearchBarComponent";
import {Dimensions, ScrollView} from "react-native";
import {color} from "react-native-elements/dist/helpers";
import ChallengePage from "./Challenge/ChallengePage";
import {getApolloClientInstance} from "./apollo-graph/Client";
import {FIND_CHALLENGES_OF_USER} from "./apollo-graph/Queries";




const SearchScreen = () => {
    const [selectedChallenge,setSelectedChallenge]= useState()

    const { colors } = useTheme();

    const client= getApolloClientInstance()

    const {data,error,loading} = useQuery(FIND_CHALLENGES_OF_USER);
    const [challengeList, setChallengeList] = useState<any>([]);


    useEffect(() => {
        if(data) {
            setChallengeList(data.getCreatedChallengesByUser)
        }
    }, [data])

    if (loading) return <Text>Loading...</Text>;
    if (error) {
        console.log(error.message);
        return <Text>Error :(</Text>;
    }

    const onChange = (searchValue: string) => {
        if (!searchValue || searchValue === "") setChallengeList(data);
        else {
            const filteredChallenges = challengeList.filter(challenge =>
                challenge.title.toLowerCase().includes(searchValue.toLowerCase().trim())
            );
            setChallengeList(filteredChallenges);
        }
    }

  return (
       <View>
            {selectedChallenge ? <ChallengePage  setSelectedChallenge={setSelectedChallenge} challenge={ selectedChallenge} />:
               <Card style={{
                   width: Dimensions.get('window').width,
                   height: '100%',
                   marginTop: 50,
                   backgroundColor: color.surface
               }}>
                   <SearchBarComponent onChange={onChange}/>
                   <Divider/>
                   <ScrollView>
                       {challengeList.map((challenge, i) =>
                           <View key={i} style={{marginBottom: 5}}>
                               <ChallengeCard setSelectedChallenge={setSelectedChallenge} challenge={challenge}/>
                               <Divider/>
                           </View>
                       )
                       }
                   </ScrollView>

               </Card>

           }
      </View>

  )
}
export default SearchScreen;


