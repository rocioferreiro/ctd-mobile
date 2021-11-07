import React, {useEffect, useState} from "react";

import {ActivityIndicator, Card, Divider, useTheme} from 'react-native-paper';

import {useLazyQuery} from "@apollo/client";
import {Dimensions, ScrollView, Text} from "react-native";

import LottieView from "lottie-react-native";

import {useTranslation} from "react-i18next";
import {Post} from "../Models/Post";
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
    key:number,
}



const ChallengeCardScrollView = (props:Props) => {
    const {t} = useTranslation();
    const [selectedChallenge, setSelectedChallenge] = useState();
    const [userId, setUserId] = useState('');
    const {colors} = useTheme();
    const [token, setToken] = React.useState('')
    const [dataSourceCords, setDataSourceCords] = useState([]);
    const [scrollToIndex,setScrollToIndex]= useState(props.key)
    const [ref, setRef] = useState(null);

/*    React.useEffect(() => {
        if (props.challenges) setChallenges(props.challenges);
        else setChallenges([]);
    }, [])*/



    const scrollHandler = () => {
        console.log(dataSourceCords.length, scrollToIndex);
        if (dataSourceCords.length > scrollToIndex) {
            ref.scrollTo({
                x: 0,
                y: dataSourceCords[scrollToIndex - 1],
                animated: true,
            });
        } else {
            alert('Out of Max Index');
        }
    };

    useEffect(() => {
        scrollHandler()
        getToken().then(t => {
            setToken(t);
            getUserId().then(id => {
                setUserId(id);

            });
        });

        scrollHandler()
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
                                <View style={{backgroundColor: 'rgba(0,0,0,0)' }}>
                                    <Divider/>
                                    <ScrollView  ref={(ref) => {
                                        setRef(ref);
                                    }} style={{
                                        marginBottom: Dimensions.get('screen').height * 0.20,
                                        backgroundColor: 'rgba(0,0,0,0)',
                                        overflow: "visible"
                                    }}>
                                        {props.route.params.challenges.map((challenge, i) =>
                                            <View   onLayout={(event) => {
                                                const layout = event.nativeEvent.layout;
                                                dataSourceCords[i] = layout.y;
                                                setDataSourceCords(dataSourceCords);
                                                console.log(dataSourceCords);
                                                console.log('height:', layout.height);
                                                console.log('width:', layout.width);
                                                console.log('x:', layout.x);
                                                console.log('y:', layout.y);
                                            }}key={i} style={{marginBottom: 5}}>
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
