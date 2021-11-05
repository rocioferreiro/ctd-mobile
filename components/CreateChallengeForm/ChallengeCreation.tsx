import Stepper from "./Stepper";
import React from "react";
import {View} from "../Themed";
import {Button} from "react-native-elements";
import {Card, useTheme} from "react-native-paper";
import {useFormik} from "formik";
import {Dimensions, Image, StyleSheet} from "react-native";
import {convertDateToString, CreateChallengeFormValues} from "./Types";
import {getToken, getUserId} from "../Storage";
import {useMutation} from "@apollo/client";
import {CREATE_CHALLENGE} from "../apollo-graph/Mutations";
import Toast from "react-native-toast-message";

function toastOn() {
  Toast.show({
    type: 'error',
    text1: 'Challenge Creation Error',
    text2: 'Try again later',
    topOffset: Dimensions.get("window").height * 0.05,
  });
}

type Props = {
  navigation?: any,
  route?: any
}

const ChallengeCreation = (props: Props) => {

  const {colors} = useTheme();
  const [userId, setUserId] = React.useState<string>('')
  const [token, setToken] = React.useState('');
  const [createChallenge, {loading}] = useMutation(CREATE_CHALLENGE, {
    onCompleted: () => {
      props.navigation.navigate('challengeCreationSuccessful')
    },
    onError: err => {
      toastOn();
      console.log(err);
    },
    refetchQueries: [],
    context: {
      headers: {
        "Authorization": "Bearer " + token
      }
    }
  });

  React.useEffect(() => {
    getUserId().then(id => setUserId(id));
    getToken().then(t => setToken(t))
  }, [])

  const parseAndSendChallenge = (challenge) => {
    const newChallengeDTOInput = {
      "title": challenge.title,
      "startEvent": convertDateToString(challenge.startsFrom),
      "endEvent": convertDateToString(challenge.finishesOn),
      "startInscription": convertDateToString(challenge.inscriptionsFrom),
      "endInscription": convertDateToString(challenge.inscriptionsTo),
      "description": challenge.description + (challenge.locationExtraInfo ? '\n' + challenge.locationExtraInfo : ''),
      "owner": userId,
      "categories": challenge.ONUObjective,
      "objectives": challenge.challengeObjectives,
      "coordinates": {
        "latitude": challenge.coordinates.coordinates[0],
        "longitude": challenge.coordinates.coordinates[1]
      },
      "image": challenge.image,
    }
    createChallenge({variables: {newChallenge: newChallengeDTOInput}}).catch(() => {
      toastOn();
    });
  }
  const onSubmitCreation = () => {
    parseAndSendChallenge(formik.values);
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
    ONUObjective: [],
    image: ''
  }

  const formik = useFormik(
    {
      initialValues: initialValues,
      onSubmit: onSubmitCreation
    }
  )
  const styles = StyleSheet.create({
    creationCard: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height * 0.95,
      marginTop: Dimensions.get('window').height * 0.03,
      backgroundColor: colors.surface
    },
    button: {
      backgroundColor: 'rgba(0,0,0,0)',
      marginBottom: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      marginLeft: -10
    },
    background: {
      flex: 1,
      justifyContent: "center",
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      position: "absolute",
      zIndex: 0
    }
  });



  return <View style={{backgroundColor: colors.surface}}>
    <Card style={styles.creationCard}>
      {/*<Image source={require('../assets/images/dots.png')} resizeMode={'cover'} style={styles.background}/>*/}
      {/*PARA FONDO COLOR: descomentar el de abajo, comentar el de arriba*/}
        <Image source={require('../../assets/images/connections.png')} resizeMode={'cover'}
               style={styles.background}/>
        <View style={{width: '25%', backgroundColor: 'rgba(0,0,0,0)',}}>
            <Button onPress={() => props.navigation.goBack()}
                    icon={{name: 'chevron-back-outline', type: 'ionicon'}}
                    buttonStyle={styles.button}
                    titleStyle={{color: colors.primary}}
                    title="Cancel"
            />
        </View>
        <Stepper onSubmit={onSubmitCreation} formik={formik} isLoading={loading}/>
    </Card>
  </View>

}

export default ChallengeCreation;
