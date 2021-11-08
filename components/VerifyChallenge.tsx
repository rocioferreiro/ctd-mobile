import {Dimensions, View} from "react-native";
import {ActivityIndicator} from "react-native-paper";
import React, {useEffect} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {VERIFY_CHALLENGE} from "./apollo-graph/Mutations";
import {GET_CHALLENGE_TOKEN} from "./apollo-graph/Queries";

const VerifyChallenge = (props) => {

    const {data: challengeTokenData} = useQuery(GET_CHALLENGE_TOKEN, {variables: {challengeId: props.route.params.challengeId}});

    const [verifyChallenge] = useMutation(VERIFY_CHALLENGE, {
        onCompleted: () => props.navigation.navigate('challenge-verification', {challengeId: props.route.params.challengeId}),
        onError: () => props.navigation.navigate('home')
    });

    useEffect(() => {
        if (challengeTokenData) {
            verifyChallenge({variables: {challengeId: props.route.params.challengeId, challengeToken: challengeTokenData.getChallengeToken}}).catch(e => console.log(e));
        }
    }, [challengeTokenData])

    return (
        <View style={{height: Dimensions.get('window').height, alignItems: "center", justifyContent: "center"}}>
            <ActivityIndicator size={72}/>
        </View>
    )

}

export default VerifyChallenge;
