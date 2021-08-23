import React from "react";
import {View, Text} from "./Themed";
import Stepper from "./CreateChallengeForm/Stepper";
import {Card, useTheme} from "react-native-paper";
import {Dimensions, StyleSheet, Image} from "react-native";
import {Button} from "react-native-elements";
import ChallengeCreationSuccessful from "./CreateChallengeForm/ChallengeCreationSuccessful";
import Toast from 'react-native-toast-message';
import {useFormik} from "formik";
import {convertDateToString, CreateChallengeFormValues} from "./CreateChallengeForm/Types";
import {CREATE_CHALLENGE} from "./apollo-graph/Mutations";
import {useMutation} from "@apollo/client";

const Home = () => {

    function toastOn() {
        Toast.show({
            type: 'error',
            text1: 'Challenge Creation Error',
            text2: 'Try again later',
            topOffset: Dimensions.get("window").height * 0.05,
        });
    }

    const [create, setCreate] = React.useState(false)
    const [creationSuccess, setCreationSuccess] = React.useState(false)
    const {colors} = useTheme();
    const [createChallenge] = useMutation(CREATE_CHALLENGE, {
        onCompleted: result => {
            setCreationSuccess(true);
            setCreate(false);
        },
        onError: err => {
            toastOn();
            console.log(err);
        },
        refetchQueries: []
    });

    const styles = StyleSheet.create({
        background: {
            flex: 1,
            justifyContent: "center",
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            position: "absolute",
            zIndex: 0
        },
        homeCard: {
            paddingTop: Dimensions.get('window').height * 0.1,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height - 20,
        },
        button: {
            backgroundColor: 'rgba(0,0,0,0)',
            marginBottom: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            marginLeft: -10
        },
        creationCard: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height * 0.95,
            marginTop: Dimensions.get('window').height * 0.03,
            backgroundColor: colors.surface
        }
    });

    const parseAndSendChallenge = (challenge) => {
        const newChallengeDTOInput = {
            "title": challenge.title,
            "startEvent": convertDateToString(challenge.startsFrom),
            "endEvent": convertDateToString(challenge.finishesOn),
            "startInscription": convertDateToString(challenge.inscriptionsFrom),
            "endInscription": convertDateToString(challenge.inscriptionsTo),
            "description": challenge.description + '\n' + challenge.locationExtraInfo,
            "owner": "meta-hys6qpx-c67af8c8-132c-4a8e-a0d7-154c9b71bb17",// TODO change to user id when users are implemented
            "categories": challenge.ONUObjective,
            "objectives": challenge.challengeObjectives,
            "coordinates": {
                "latitude": challenge.coordinates.coordinates[0],
                "longitude": challenge.coordinates.coordinates[1]
            }
        }
        console.log(newChallengeDTOInput);
        createChallenge({variables: {newChallenge: newChallengeDTOInput}}).catch(e => {
            toastOn();
        });
    }
    const onSubmitCreation = () => {
        parseAndSendChallenge(formik.values);
        // console.log(formik.values);
    }

    const initialValues: CreateChallengeFormValues = {
        title: '',
        description: '',
        challengeObjectives: [],
        coordinates: null,
        locationExtraInfo: '',
        inscriptionsFrom: new Date(),
        inscriptionsTo: new Date(),
        startsFrom: new Date(),
        finishesOn: new Date(),
        totalPoints: 0,
        ONUObjective: []
    }
    const formik = useFormik(
        {
            initialValues: initialValues,
            onSubmit: onSubmitCreation
        }
    )

    return (
        <View style={{backgroundColor: colors.surface}}>
            {(!create && !creationSuccess) && <Card style={styles.homeCard}>
                <Text> Home Screen </Text>
                <View style={{width: '60%', marginTop: 10}}>
                    <Button raised={true}
                            title={'Create a new Challenge!'}
                            onPress={() => setCreate(true)}
                            buttonStyle={{backgroundColor: colors.primary}}
                    />
                </View>

            </Card>}
            {create && <Card style={styles.creationCard}>
                {/*<Image source={require('../assets/images/dots.png')} resizeMode={'cover'} style={styles.background}/>*/}
                {/*PARA FONDO COLOR: descomentar el de abajo, comentar el de arriba*/}
                <Image source={require('../assets/images/connections.png')} resizeMode={'cover'}
                       style={styles.background}/>
                <View style={{width: '25%', backgroundColor: 'rgba(0,0,0,0)',}}>
                    <Button onPress={() => setCreate(false)}
                            icon={{name: 'chevron-back-outline', type: 'ionicon'}}
                            buttonStyle={styles.button}
                            titleStyle={{color: colors.primary}}
                            title="Cancel"
                    />
                </View>
                <Stepper onSubmit={onSubmitCreation} formik={formik}/>
            </Card>}
            {creationSuccess && <ChallengeCreationSuccessful close={() => setCreationSuccess(false)}/>}
        </View>
    )
}

export default Home;
