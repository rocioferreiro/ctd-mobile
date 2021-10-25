import React, {useEffect, useState} from "react";
import {View} from "./Themed";
import {ActivityIndicator, Card, Divider, useTheme} from 'react-native-paper';
import ChallengeCard from "./ChallengeCard/ChallengeCard";
import {useLazyQuery} from "@apollo/client";
import SearchBarComponent from "./SearchBar/SearchBarComponent";
import {Dimensions, ScrollView, Text} from "react-native";
import ChallengePage from "./Challenge/ChallengePage";
import {FIND_CHALLENGES_BY_FILTER} from "./apollo-graph/Queries";
import LottieView from "lottie-react-native";

import {useTranslation} from "react-i18next";
import {Post} from "../Models/Post";
import {Challenge} from "../Models/Challenge";
import {getUserId} from "../Storage";

type Props = {
    challenges?: Challenge[];
    navigation?: any
}



const ChallengeCardScrollView = (props:Props) => {
    const {t} = useTranslation();
    const [selectedChallenge, setSelectedChallenge] = useState();
    const [userId, setUserId] = useState('');
    const {colors} = useTheme();
    const [token, setToken] = React.useState('')



    useEffect(() => {
        getToken().then(t => {
            setToken(t);
            getUserId().then(id => {
                setUserId(id);

            });
        });
    }, []);








    return (
        <View>
            {
                selectedChallenge ?
                    <ChallengePage  currentUserId={userId} setSelectedChallenge={setSelectedChallenge} challenge={selectedChallenge}/> :
                    <Card style={{
                        width: Dimensions.get('window').width,
                        height: '100%',
                        backgroundColor: colors.surface
                    }}>

                        <Text style={{marginTop:Dimensions.get('window').height*0.06, fontSize:40, fontWeight:'bold', marginBottom:5, color:colors.primary}}> {t('search-screen.challenges')} </Text>

                                <View style={{backgroundColor: 'rgba(0,0,0,0)' }}>
                                    <Divider/>
                                    <ScrollView style={{
                                        marginBottom: Dimensions.get('screen').height * 0.20,
                                        backgroundColor: 'rgba(0,0,0,0)',
                                        overflow: "visible"
                                    }}>
                                        {props.challenges.map((challenge, i) =>
                                            <View key={i} style={{marginBottom: 5}}>
                                                <ChallengeCard token={token} navigation={props.navigation} setSelectedChallenge={setSelectedChallenge} challenge={challenge}/>
                                                <Divider/>
                                            </View>
                                        )}
                                    </ScrollView>
                                </View>


                    </Card>

            }
        </View>

    )
}

export default ChallengeCardScrollView;
