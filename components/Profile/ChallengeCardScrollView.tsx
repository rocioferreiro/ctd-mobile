import React, {useEffect, useState} from "react";
import {Card, Divider, useTheme} from 'react-native-paper';
import {Dimensions, ScrollView} from "react-native";
import {useTranslation} from "react-i18next";
import {Challenge} from "../Models/Challenge";
import {getToken, getUserId} from "../Storage";
import {View} from "../Themed";
import ChallengePage from "../Challenge/ChallengePage";
import ChallengeCard from "../ChallengeCard/ChallengeCard";

type Props = {
    challenges?: Challenge[];
    navigation?: any
    challengeId?: any
    route?: any,
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
                    <ChallengePage currentUserId={userId} setSelectedChallenge={setSelectedChallenge} challenge={selectedChallenge}/> :
                    <Card style={{
                        width: Dimensions.get('window').width,
                        height: '100%',
                        backgroundColor: colors.surface
                    }}>
                                <View style={{backgroundColor: 'rgba(0,0,0,0)' }}>
                                    <Divider/>
                                    <ScrollView style={{
                                        marginBottom: Dimensions.get('screen').height * 0.20,
                                        backgroundColor: 'rgba(0,0,0,0)',
                                        overflow: "visible"
                                    }}>
                                        {props.route.params.challenges.map((challenge, i) =>
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
