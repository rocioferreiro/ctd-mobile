import React, {useEffect, useState} from 'react';
import {View, Text} from "../Themed";
import {categoryBackgrounds, colors, onuLogos, ONUObjectives} from "../ONUObjectives";
import {Dimensions, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {onuPictures} from "../CreateChallengeForm/Details/onuObjectiveInfo";
import {Card, Divider, IconButton, useTheme} from "react-native-paper";
import SearchBarComponent from "../SearchBar/SearchBarComponent";
import ChallengeCard from "../ChallengeCard/ChallengeCard";
import {TabScreen} from "react-native-paper-tabs";
import {useLazyQuery} from "@apollo/client";
import {FIND_CHALLENGES_BY_CATEGORY, FIND_CHALLENGES_OF_USER} from "../apollo-graph/Queries";
import {getToken, getUserId} from "../Storage";
import ChallengePage from "../Challenge/ChallengePage";

interface Props {
  setSelectedChallenge: (Challenge) => void;
}

const CategoryList = (props: Props) => {

  const onuInfo = onuPictures()

  const [challengeList, setChallengeList] = useState<any>([]);
  const [selectedSDG, setSelectedSDG] = React.useState<number>(-1)
  const [token,setToken] = React.useState('')
  React.useEffect(() => {
    getToken().then(t => setToken(t))
  }, [])
  const [findChallengesByCategory, {data, error, loading}] = useLazyQuery(FIND_CHALLENGES_BY_CATEGORY, {
    fetchPolicy: 'cache-and-network',
    context: {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
  });

  useEffect(() => {
    if (data) {
      setChallengeList(data.getChallengeByFilter.challenges)
    }
  }, [data]);

  const onChange = (searchValue: string) => {
    if (!searchValue || searchValue === "") setChallengeList(data.getChallengeByFilter.challenges);
    else {
      const filteredChallenges = data.getChallengeByFilter.challenges.filter(challenge =>
        challenge.title.toLowerCase().includes(searchValue.toLowerCase().trim())
      );
      setChallengeList(filteredChallenges);
    }
  }
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(0,0,0,0)'
    },
    card: {
      display: 'flex',
      flexDirection: 'row',
      borderRadius: 5,
      width: Dimensions.get('window').width * 0.8,
      height: Dimensions.get('window').height * 0.15,
      marginBottom: 10,
      marginTop: 10,
      overflow: 'hidden',
      backgroundColor: 'rgba(0,0,0,0)'
    },
    sideNumberContainer: {
      flex: 2,
      display: 'flex',
      alignItems: 'center',
      borderTopStartRadius: 15,
      borderBottomStartRadius: 15,
      borderTopEndRadius: 0,
      borderBottomEndRadius: 0,
      paddingTop: 10,
      paddingBottom: 10,
      paddingHorizontal: 3,
    },
    logo: {
      flex: 4,
      maxWidth: '100%',
      resizeMode: "contain"
    },
    number: {
      fontSize: 35,
      fontWeight: 'bold',
      color: '#ffffff',
      flex: 6
    },
    sideImageContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      flex: 10,
      display: 'flex',
      justifyContent: 'flex-end',
      borderTopStartRadius: 0,
      borderBottomStartRadius: 0,
      borderTopEndRadius: 15,
      borderBottomEndRadius: 15,
      overflow: 'hidden'
    },
    name: {
      fontWeight: 'bold',
      color: '#ffffff',
      marginLeft: 6,
      marginBottom: 6,
    },
  });

  function handleSelectSDG(i: number) {
    findChallengesByCategory({variables: {category: i-1}})
    setSelectedSDG(i)
  }

  return (
    <View style={{backgroundColor: 'rgba(0,0,0,0)'}}>
      {selectedSDG < 0 ?
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {onuInfo.map((v, i) => {
            return (
              <TouchableOpacity key={i} onPress={() => handleSelectSDG(i + 1)}>
                <View style={styles.card}>
                  <View style={[styles.sideNumberContainer, {backgroundColor: colors[i]}]}>
                    <Text style={styles.number}>{i + 1}</Text>
                    <Image style={styles.logo} source={onuLogos[i].image}/>
                  </View>
                  <View style={[styles.sideImageContainer, {backgroundColor: colors[i]}]}>
                    <Image style={{
                      ...StyleSheet.absoluteFillObject,
                      backgroundColor: colors[i],
                      opacity: 0.5,
                      width: '100%',
                      height: '100%'
                    }} source={categoryBackgrounds[i].image} resizeMode={'cover'}/>
                    <Text style={styles.name}>{v.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
          <View style={{padding: Dimensions.get("window").height * 0.05, backgroundColor: 'transparent'}}/>
        </ScrollView> :
        <View style={{backgroundColor: 'rgba(0,0,0,0)'}}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'transparent', width: Dimensions.get('screen').width}}>
            <IconButton icon={'chevron-left'} onPress={() => {setSelectedSDG(-1)}}/>
            <View style={{width: '100%'}}>
              <SearchBarComponent onChange={onChange}/>
            </View>
          </View>
          <Divider/>
          <ScrollView style={{
            marginBottom: Dimensions.get('screen').height * 0.20,
            backgroundColor: 'rgba(0,0,0,0)',
            overflow: "visible"
          }}>
            {challengeList.map((challenge, i) =>
              <View key={i} style={{marginBottom: 5}}>
                <ChallengeCard setSelectedChallenge={props.setSelectedChallenge} challenge={challenge}/>
                <Divider/>
              </View>
            )}
            <View style={{padding: Dimensions.get("window").height * 0.05, backgroundColor: 'transparent'}}/>
          </ScrollView>
        </View>
      }
    </View>
  );
}
export default CategoryList;
