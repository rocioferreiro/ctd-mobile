import React, {useEffect, useState} from "react";
import MapView, {LatLng, Marker} from "react-native-maps";
import Toast from "react-native-toast-message";
import {
  useTheme,
  Title,
  Avatar,
  Button,
  ActivityIndicator
} from 'react-native-paper';
import {Dimensions, Image, ImageBackground, ScrollView, TouchableWithoutFeedback} from "react-native";
import {View, Text} from "../Themed";
import {StyleSheet} from 'react-native';
import {Challenge} from "../Models/Challenge";
import {useLazyQuery, useMutation} from "@apollo/client";
import {FIND_CHALLENGE_BY_ID, NEW_FIND_USER_BY_ID} from "../apollo-graph/Queries";
import LottieView from "lottie-react-native";
import JoinButton from "./JoinButton";
import {onuPictures} from "../CreateChallengeForm/Details/onuObjectiveInfo";
import {useTranslation} from "react-i18next";
import {getToken, getUserId} from "../Storage";
import {JOIN_CHALLENGE, UNJOIN_CHALLENGE} from "../apollo-graph/Mutations";
import ViewParticipantsButton from "./ViewParticipantsButton";
import UnJoinButton from "./UnJoinButton";

interface Props {
  challenge?: Challenge
  setSelectedChallenge?: (Challenge) => void
  currentUserId?: string,
  route?: any,
  navigation?: any
}

const ChallengePage = (props: Props) => {
  const [isJoined,setIsJoined]= React.useState(false)
  const onuInfo = onuPictures();
  const [challengeInfo, setChallengeInfo] = useState<Challenge>();
  const [currentId, setCurrentId] = useState<string>();
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const [marker, setMarker] = useState<LatLng>(props.challenge ? props.challenge.coordinates : {
    latitude: 0,
    longitude: 0
  });
  const getOwner = () => {
    if (challengeInfo) return challengeInfo.owner
    else return ''
  }
  const [token, setToken] = React.useState('');

  const [getUser, {data, loading, error}] = useLazyQuery(NEW_FIND_USER_BY_ID, {
    variables: {targetUserId: getOwner(), currentUserId: currentId},
    fetchPolicy: 'cache-and-network',
    context: {
      headers: {'Authorization': "Bearer " + token}
    },
  });
  const [joinChallenge] = useMutation(JOIN_CHALLENGE, {
    onCompleted: () => {
      setIsJoined(true);
      toastOn()

    },
    onError: err => {
      toastOnError();

    },
    refetchQueries: ["FIND_POSTS_OF_USER"],
    context: {
      headers: {
        "Authorization": "Bearer " + token
      }
    }
  });
  function handleJoin(){
    joinChallenge({variables: {idUser:props.currentUserId,idChallenge:challengeInfo.id}}).catch(() => {
      toastOn();
    });
  }

  const [unjoinChallenge] = useMutation(UNJOIN_CHALLENGE, {
    onCompleted: () => {
      setIsJoined(false);
      toastOn()

    },
    onError: err => {
      toastOnError();

    },
    refetchQueries: ["FIND_POSTS_OF_USER"],
    context: {
      headers: {
        "Authorization": "Bearer " + token
      }
    }
  });

  function handleUnjoin(){
    /* unjoinChallenge({variables: {userId:props.currentUserId,subscriptionChallengeId:props.challenge.id}}).catch(() => {
         toastOn();
     });*/
    console.log("unjoin")
  }

  function toastOn() {
    Toast.show({
      type: 'success',
      text1: 'You Joined this Challenge',
      text2: 'Good Luck!',
      topOffset: Dimensions.get("window").height * 0.05,
    });
  }

  function toastOnError() {
    Toast.show({
      type: 'error',
      text1: 'Join Challenge Error',
      text2: 'Try Again Later',
      topOffset: Dimensions.get("window").height * 0.05,
    });
  }
  const [getChallenge] = useLazyQuery(FIND_CHALLENGE_BY_ID,
    {
      context: {
        headers: {'Authorization': "Bearer " + token}
      },
      onCompleted: data1 => {
        setChallengeInfo(data1.findChallengeById);
        getUser();
        setMarker(data1.findChallengeById.coordinates);
      },
      onError: error1 => console.log(error1)
    });

  useEffect(() => {
    getToken().then(t => setToken(t));
    getUserId().then(u => setCurrentId(u))
  }, [])

  useEffect(() => {
    if (props.challenge) {
      setChallengeInfo(props.challenge);
      setMarker(props.challenge.coordinates);
    }
    else if (props.route.params?.challengeId)
      getChallenge({variables: {id: props.route.params?.challengeId}});


    if (props.currentUserId)
      setCurrentId(props.currentUserId);
    else
      getUserId().then(id => setCurrentId(id));
  }, [token]);

  useEffect(() => {
    if (props.challenge) {
      setChallengeInfo(props.challenge);
      getUser();
    }
  }, [props.challenge]);

  const styles = StyleSheet.create({
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      color: colors.background,
      marginTop: 10
    },
    card: {
      width: '100%',
      height: Dimensions.get('window').height * 0.7,
      // borderWidth: 10,
      // borderColor:colors.accent,
      padding: '3%',
      backgroundColor: 'rgba(0,0,0,0)'
    },
    map: {
      width: '100%',
      height: '100%',
    },
    mapWrapper: {
      height: '70%',
      borderWidth: 5,
      borderStyle: 'solid',
      borderColor: '#c1c1c1',
      borderRadius: 5,
      overflow: 'hidden',
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {
      marginTop: 5,
      width: '100%',
      backgroundColor: colors.surface,
      height: Dimensions.get("window").height * 0.1
    }
  });

  if (loading) return <View style={{
    display: 'flex',
    marginTop: Dimensions.get('window').height * 0.4,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }}><ActivityIndicator size="large"/></View>;
  if (error) {
    console.log(error.message);
    return <LottieView
      style={{
        width: '95%',
        height: 400, marginTop: Dimensions.get('window').height * 0.07
      }}
      source={require('../../assets/lottie/network-lost.json')}
      autoPlay
      loop
      speed={0.4}
      resizeMode={'cover'}
    />;
  }

  return ((challengeInfo) ?
    <View style={{
      width: Dimensions.get("window").width,
      height: Dimensions.get('window').height,
      backgroundColor: colors.surface
    }}>
      <View
        style={{width: "100%", alignItems: "flex-start", padding: 10, marginTop: 20, backgroundColor: colors.surface}}>
        <Button icon="keyboard-backspace" onPress={() => {
          if (props.challenge) props.setSelectedChallenge(null)
          else props.navigation.goBack()
        }}>
          {t('challenge-page.back')}
        </Button>
      </View>
      <ScrollView contentContainerStyle={{justifyContent: "center", width: '100%'}}
                  style={{backgroundColor: "rgba(0,0,0,0)"}}>

        <ImageBackground
          style={{width: "100%", height: 300, display: "flex", justifyContent: "center", alignItems: "center"}}
          source={require('../../assets/images/compost.jpg')}
        >
          <Avatar.Text style={{borderColor: colors.background, borderWidth: 3}}
                       label={data.findUserById.user.name[0] + data.findUserById.user.lastname[0]}/>
          <Text style={styles.title}> {challengeInfo.title}</Text>
          <Text style={{color: colors.background}}> {data.findUserById.user.mail} </Text>

        </ImageBackground>
        <View style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          backgroundColor: colors.surface
        }}>
          <View style={{
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            backgroundColor: colors.surface
          }}>
            <Title style={{
              fontSize: 20, color: colors.primary,
              marginTop: 5, fontWeight: "bold"
            }}>{challengeInfo.description}</Title>

          </View>
        </View>
        <View style={{justifyContent: "center", alignItems: "center", padding: 10, backgroundColor: colors.surface}}>
          <View style={{
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
            padding: 15,
            marginRight: 20,
            marginLeft: 20,
            backgroundColor: colors.primary,
            borderRadius: 10
          }}>
            <Title style={{
              fontSize: 20, color: colors.background,
              marginTop: 5
            }}>{t('challenge-page.release-date')}: {challengeInfo.startEvent}</Title>
            <Title style={{
              fontSize: 20, color: colors.accent,
              marginTop: 5, fontWeight: "bold"
            }}>{t('challenge-page.end-event')}: {challengeInfo.endEvent}</Title>
            <Title style={{
              fontSize: 20, color: colors.background,
              marginTop: 5
            }}>{t('challenge-page.inscriptions-start')}: {challengeInfo.startInscription}</Title>
            <Title style={{
              fontSize: 20, color: colors.accent,
              marginTop: 5, fontWeight: "bold"
            }}>{t('challenge-page.inscriptions-end')}: {challengeInfo.endInscription}</Title>
          </View>
        </View>

        <View style={{
          width: "100%",
          justifyContent: "center",
          padding: 15,
          marginLeft: 4,
          backgroundColor: colors.surface
        }}>
          <Button icon="check-bold" style={{backgroundColor: "rgba(0,0,0,0)"}}>
            <Title style={{
              fontSize: 20, color: colors.primary,
              padding: 10
            }}>{t('challenge-page.challenge-objectives')}</Title>
          </Button>
          {challengeInfo.objectives.map((objective, i) =>
            <View key={i} style={{marginBottom: 5, backgroundColor: 'rgba(0,0,0,0)'}}>
              <Title style={{
                marginLeft: 4, fontSize: 20, color: colors.primary,
                marginTop: 5
              }}>{objective.name}</Title>
            </View>
          )}

        </View>

        <View style={{width: "100%", justifyContent: "center", padding: 10, backgroundColor: colors.surface}}>
          {currentId !==challengeInfo.owner && !isJoined &&
          <JoinButton handleJoin={()=>handleJoin()}/>
          }
          {currentId!==challengeInfo.owner && isJoined &&
          <UnJoinButton handleUnJoin={()=>handleUnjoin()}/>
          }
          {currentId===challengeInfo.owner &&
          <ViewParticipantsButton/>
          }
        </View>
        <View style={{width: "100%", justifyContent: "center", padding: 15, backgroundColor: colors.surface}}>

          <Button icon="information" style={{backgroundColor: "rgba(0,0,0,0)"}}>
            <Title style={{
              fontSize: 20, color: colors.primary,
              padding: 10
            }}>{t('challenge-page.sustainable-objectives')}</Title>
          </Button>

          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "center",
            paddingHorizontal: 10,
            paddingTop: 10,
            backgroundColor: 'rgba(0,0,0,0)'
          }}>
            {challengeInfo.categories.map((s, index) => {
              return <TouchableWithoutFeedback key={index}>
                <Image
                  style={{width: 50, height: 50, borderRadius: 25, marginHorizontal: 10}}
                  source={onuInfo[parseInt(s)].image}/>
              </TouchableWithoutFeedback>
            })}
          </View>

                 </View>

                 <View style={{width:"100%",justifyContent: "center",padding:10,marginRight:6,marginLeft:6, backgroundColor:colors.surface,borderRadius:40}}>


                     <Title style={{ fontSize: 20, color: colors.primary,
                         marginTop: 5,fontWeight:"bold"}}>{t('challenge-page.challenge-location')}</Title>
                     {/*<Title style={{ fontSize: 15, color: colors.primary,*/}
                     {/*    marginTop: 5}}>This a is short description of the challenge location</Title>*/}

                 </View>


        <View style={styles.card}>

          <View style={styles.mapWrapper}>

            <MapView
              style={styles.map}
              initialRegion={{
                latitude: challengeInfo ? challengeInfo.coordinates.latitude : 0,
                longitude: challengeInfo ? challengeInfo.coordinates.longitude : 0,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
            >
              {
                marker &&
                <Marker coordinate={marker}/>
              }
            </MapView>

          </View>
        </View>

      </ScrollView>

    </View>
    :
    <View/>
)}

export default ChallengePage;
