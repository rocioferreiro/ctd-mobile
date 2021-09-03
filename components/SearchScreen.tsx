import React, {useEffect, useState} from "react";
import {View, Text} from "./Themed";
import {ActivityIndicator, Card, Divider, useTheme} from 'react-native-paper';
import ChallengeCard from "./ChallengeCard/ChallengeCard";
import {useQuery} from "@apollo/client";
import SearchBarComponent from "./SearchBar/SearchBarComponent";
import {Dimensions, ScrollView} from "react-native";
import {color} from "react-native-elements/dist/helpers";
import ChallengePage from "./Challenge/ChallengePage";
import {getApolloClientInstance} from "./apollo-graph/Client";
import {FIND_CHALLENGES_OF_USER} from "./apollo-graph/Queries";
import LottieView from "lottie-react-native";


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

    if (loading) return <View style={{display: 'flex', backgroundColor: colors.surface, justifyContent:'center', width: '100%', height: '100%'}}><ActivityIndicator size="large" /></View>;
    if (error) {
        console.log(error.message);
        return <LottieView
          style={{ width: '95%',
              height: 400,marginTop:Dimensions.get('window').height*0.07}}
          source={require('../assets/lottie/network-lost.json')}
          autoPlay
          loop
          speed={0.4}
          resizeMode={'cover'}
        />
    }

    const onChange = (searchValue: string) => {
        if (!searchValue || searchValue === "") setChallengeList(data.getCreatedChallengesByUser);
        else {
            const filteredChallenges = data.getCreatedChallengesByUser.filter(challenge =>
                challenge.title.toLowerCase().includes(searchValue.toLowerCase().trim())
            );
            console.log(filteredChallenges)
            setChallengeList(filteredChallenges);
        }
    }

  return (
       <View>
            {selectedChallenge ? <ChallengePage  setSelectedChallenge={setSelectedChallenge} challenge={ selectedChallenge} />:
               <Card style={{
                   width: Dimensions.get('window').width,
                   height: '100%',
                   backgroundColor: colors.surface
               }}>
                   <SearchBarComponent onChange={onChange}/>
                   <Divider/>
                   <ScrollView style={{marginBottom: Dimensions.get('screen').height*0.20, backgroundColor: 'rgba(0,0,0,0)', overflow: "visible"}}>
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
};


export default SearchScreen;
