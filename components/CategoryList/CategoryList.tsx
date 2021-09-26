import React, {useEffect, useState} from 'react';
import {View, Text} from "../Themed";
import {categoryBackgrounds, colors, onuLogos, ONUObjectives} from "../ONUObjectives";
import {Card, Divider, useTheme} from "react-native-paper";
import {Dimensions, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import SearchBarComponent from "../SearchBar/SearchBarComponent";
import ChallengeCard from "../ChallengeCard/ChallengeCard";
import {TabScreen} from "react-native-paper-tabs";
import {useLazyQuery} from "@apollo/client";
import {FIND_CHALLENGES_BY_CATEGORY, FIND_CHALLENGES_OF_USER} from "../apollo-graph/Queries";
import {getUserId} from "../Storage";

const CategoryList = () => {


    const [challengeList, setChallengeList] = useState<any>([]);
    const [selectedSDG, setSelectedSDG] = React.useState<number>(-1)
    const [selectedChallenge, setSelectedChallenge] = useState();
    const [findChallengesByCategory, {data, error, loading}] = useLazyQuery(FIND_CHALLENGES_BY_CATEGORY);


   /* useEffect(() => {
        if (selectedSDG>0) {
            findChallengesByCategory( {variables: {category: selectedSDG}})
        }
    }, []);*/

    useEffect(() => {
        if (data) {
            console.log(selectedSDG)
            setChallengeList(data.getChallengeByFilter.challenges)
            console.log(data)
            console.log("challenges should be above")
        }
    }, [data]);

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
        findChallengesByCategory( {variables:{category:i}})
        setSelectedSDG(i)


    }

    return (
        <View>
            {selectedSDG <0 ?
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                    {Object.values(ONUObjectives).map((v, i) => {
                        return (
                            <TouchableOpacity onPress={() => handleSelectSDG(i+1)}>
                                <View style={styles.card} key={i}>
                                    <View style={[styles.sideNumberContainer, {backgroundColor: colors[i]}]}>
                                        <Text style={styles.number}>{i + 1}</Text>
                                        <Image style={styles.logo} source={onuLogos[i].image}/>
                                    </View>
                                    <View style={styles.sideImageContainer}>
                                        <Image style={{
                                            ...StyleSheet.absoluteFillObject,
                                            backgroundColor: colors[i],
                                            opacity: 0.5,
                                            width: '100%',
                                            height: '100%'
                                        }} source={categoryBackgrounds[i].image} resizeMode={'cover'}/>
                                        <Text style={styles.name}>{v}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                    }
                </ScrollView> :
                <View style={{backgroundColor: 'rgba(0,0,0,0)' }}>
                    <SearchBarComponent onChange={onChange}/>
                    <Divider/>
                    <ScrollView style={{
                        marginBottom: Dimensions.get('screen').height * 0.20,
                        backgroundColor: 'rgba(0,0,0,0)',
                        overflow: "visible"
                    }}>
                        {challengeList.map((challenge, i) =>
                            <View key={i} style={{marginBottom: 5}}>
                                <ChallengeCard setSelectedChallenge={setSelectedChallenge} challenge={challenge}/>
                                <Divider/>
                            </View>
                        )
                        }
                    </ScrollView>
                </View>
            }
            </View>
    );
}
export default CategoryList;
