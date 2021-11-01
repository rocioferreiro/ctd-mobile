import {Dimensions, View} from "react-native";
import {ActivityIndicator} from "react-native-paper";
import React, {useEffect} from "react";
import {useMutation} from "@apollo/client";
import {VERIFY_CHALLENGE} from "./apollo-graph/Mutations";

const VerifyChallenge = (props) => {

    const [verifyChallenge] = useMutation(VERIFY_CHALLENGE, {
        onCompleted: () => props.navigation.navigate('challenge-verification'),
        onError: () => props.navigation.navigate('home')
    });

    useEffect(() => {
        verifyChallenge({variables: {challengeId: props.challengeId}}).catch(e => console.log(e));
    }, [])

    return (
        <View style={{height: Dimensions.get('window').height, alignItems: "center", justifyContent: "center"}}>
            <ActivityIndicator size={72}/>
        </View>
    )

}

export default VerifyChallenge;
