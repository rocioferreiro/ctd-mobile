import React from "react";
import {Dimensions, Image, RefreshControl, ScrollView, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {Card, useTheme} from "react-native-paper";
import {Button} from "react-native-elements";
import {View, Text} from "../Themed";
import * as Progress from 'react-native-progress';
import CTDBadge from "./Badge";
import PostFeed from "./PostFeed";
import {LinearGradient} from "expo-linear-gradient";
import CreatePost from "../CreatePost/CreatePost";
import Toast from "react-native-toast-message";
import {onuLogos} from "../ONUObjectives";
import {useTranslation} from "react-i18next";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {CREATE_CHALLENGE} from "../apollo-graph/Mutations";
import Stepper from "../CreateChallengeForm/Stepper";
import ChallengeCreationSuccessful from "../CreateChallengeForm/ChallengeCreationSuccessful";
import {useFormik} from "formik";
import {convertDateToString, CreateChallengeFormValues} from "../CreateChallengeForm/Types";
import {getToken, getUserId} from "../Storage";
import {GET_TOP_ODS} from "../apollo-graph/Queries";
import {GET_SUSTAINABLE_POINTS} from "../apollo-graph/Queries";
import {getXpRange} from "../Models/User";
import {NEW_FIND_USER_BY_ID} from "../apollo-graph/Queries";

const CTDHome = ({navigation}) => {
  const {t} = useTranslation();
  const {colors} = useTheme();

  function toastOn() {
    Toast.show({
      type: 'error',
      text1: 'Challenge Creation Error',
      text2: 'Try again later',
      topOffset: Dimensions.get("window").height * 0.05,
    });
  }
  const categories = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"];
  const categoryColors = [colors.accent, "#707070", "#919191", "#a1a1a1", "#b1b1b1", "#c1c1c1",
    "#d1d1d1", "#e1e1e1", "#e1e1e1", "#e1e1e1", "#e1e1e1", "#e1e1e1", "#e1e1e1", "#e1e1e1", "#e1e1e1", "#e1e1e1", "#e1e1e1"];
  const [createPost, setCreatePost] = React.useState(false);
  const [create, setCreate] = React.useState(false)
  const [creationSuccess, setCreationSuccess] = React.useState(false)
  const [userId, setUserId] = React.useState('');
  const [token, setToken] = React.useState('');
  const [showAll, setShowAll] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [topOds, setTopOds] = React.useState([]);

  const {data: topOdsData} = useQuery(GET_TOP_ODS);

  const [createChallenge, {loading}] = useMutation(CREATE_CHALLENGE, {
    onCompleted: () => {
      setCreationSuccess(true);
      setCreate(false);
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
  const [getUser, {data: userData}] = useLazyQuery(NEW_FIND_USER_BY_ID, {
    context: {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    },
    onError: error => {
      console.log('user error');
      console.log(error);
    }
  });


  const {data: sustainablePointsData} = useQuery(GET_SUSTAINABLE_POINTS);

  React.useEffect(() => {
    getUserId().then(id => setUserId(id));
    getToken().then(t => {
      setToken(t)
    })
  }, [])

  React.useEffect(() => {
    if (topOdsData) {
      const onlyTopOds = topOdsData.getOdsOrderedByPopularity.map(top => top.ods.toString());
      const restOfOds =  categories.filter(category => !onlyTopOds.includes(category));
      setTopOds(onlyTopOds.concat(restOfOds));
    }
  }, [topOdsData])

  React.useEffect(() => {
    if (userId) {
      getUser({variables: {targetUserId: userId}});
    }
  }, [userId]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setToken(token)
    setTimeout(() => setRefreshing(false), 70)
  }, [refreshing]);

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
    score: 0,
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
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surface,
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
    },
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
    },
    title: {
      backgroundColor: 'rgba(0,0,0,0)',
      fontSize: 23,
      color: '#ffffff',
      fontWeight: 'bold',

    },
    subtitle: {
      backgroundColor: 'rgba(0,0,0,0)',
      fontSize: 37,
      color: colors.accent,
      textAlign: 'right',
      fontWeight: 'bold',
      marginHorizontal: 20,
    },
    create: {
      backgroundColor: 'rgba(0,0,0,0)',
      fontSize: 20,
      color: colors.primary,
      textAlign: 'center',
      fontWeight: 'normal',
      margin: 10,
    },
    detailtitle: {
      backgroundColor: 'rgba(0,0,0,0)',
      color: '#ffffff',
      textAlign: 'left',
      fontSize: 14
    },
    logo: {
      height: 100,
      width: 100,
    },
    othertitle: {
      backgroundColor: 'rgba(0,0,0,0)',
      fontSize: 16,
      color: colors.primary,
      fontWeight: 'bold',
      paddingBottom: 10
    },
    topSDGs: {
      backgroundColor: 'rgba(0,0,0,0)',
      fontSize: 19,
      color: colors.primary,
      fontWeight: 'bold',
      paddingBottom: 10
    },
    level: {
      backgroundColor: 'rgba(0,0,0,0)',
      color: colors.backdrop,
      fontSize: 12,
      paddingBottom: 4,
    },
    nextlevel: {
      backgroundColor: 'rgba(0,0,0,0)',
      color: colors.backdrop,
      fontSize: 12,
      textAlign: 'right',
      flex: 1,
      paddingBottom: 4,
    },
    ods: {
      backgroundColor: 'rgba(0,0,0,0)',
      color: colors.primary,
      fontSize: 10,
      paddingBottom: 4,
      width: 70,
      textAlign: 'center',
      fontWeight: 'bold',

    },
    box: {
      width: '100%',
      height: 200,
    },
  });

  function toastOnPostError() {
    Toast.show({
      type: 'error',
      text1: t('home.create-post-error'),
      text2: t('home.create-post-error-subtitle'),
      topOffset: Dimensions.get("window").height * 0.05,
    });
  }

  return (
    <View style={styles.container}>
      {(!create && !creationSuccess && !createPost) &&
      <View style={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        backgroundColor: colors.surface
      }}>
          <ScrollView contentContainerStyle={{justifyContent: "center", width: '100%'}}
                      style={{flex: 1, backgroundColor: "rgba(0,0,0,0)"}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
              <LinearGradient
                  colors={[colors.primary, "rgba(0,0,0,0)"]}
                  start={{
                    x: 1,
                    y: 0,
                  }}
                  end={{
                    x: 1,
                    y: 1,
                  }}
                  style={styles.box}
              >
                  <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                    paddingTop: 30,
                    backgroundColor: "rgba(0,0,0,0)"
                  }}>
                      <View style={{
                        width: "70%",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 10,
                        backgroundColor: "rgba(0,0,0,0)"
                      }}>

                <Image resizeMode={"contain"} source={require('../../assets/images/ctd-logo.png')} style={styles.logo}/>
                <Text style={styles.title}>Connect the Dots</Text>
                <Button onPress={()=> navigation.navigate('levelUp')}/>
              </View>
            </View>
          </LinearGradient>
          <View style={{justifyContent: "center", alignItems: "center", padding: 10, backgroundColor: colors.surface}}>

            <View style={{
              width: "80%",
              justifyContent: "center",
              alignItems: "center",
              padding: 15,
              backgroundColor: colors.primary,
              borderRadius: 90
            }}>
                <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  backgroundColor: colors.primary,
                  alignItems: "center",
                  justifyContent: 'space-between',
                  width: '80%'
                }}>
                  <Text style={styles.subtitle}>{sustainablePointsData ? sustainablePointsData.getGlobalSustainablePoints : ""} </Text>
                  <View style={{backgroundColor: 'rgba(0,0,0,0)', display: 'flex', justifyContent: 'flex-end'}}>
                    <Text style={styles.detailtitle}> {t('home.global')}</Text>
                    <Text style={styles.detailtitle}> {t('home.sustainable')}</Text>
                    <Text style={styles.detailtitle}> {t('home.points')}</Text>
                  </View>
                </View>
            </View>
          </View>
          <View style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            backgroundColor: colors.surface
          }}>
            <View style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "flex-start",
              backgroundColor: colors.surface
            }}>
              <Text style={styles.othertitle}> {t('home.your-experience')}</Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', backgroundColor: colors.surface}}>
                <Text style={styles.level}> {t('home.level')} {userData?.findUserById?.user?.level}</Text>
                <Text style={styles.nextlevel}>{t('home.level')} {userData?.findUserById?.user?.level+1}</Text>
              </View>
            </View>
            {userData &&
              <Progress.Bar style={{borderRadius: 20}} unfilledColor={'#ffffff'} color={colors.accent}
                            progress={userData?.findUserById?.user?.level === 0 ?
                              userData?.findUserById?.user?.xp / getXpRange(1)[1] :
                              userData?.findUserById?.user?.xp / getXpRange(userData?.findUserById?.user?.level)[1]}
                            width={350} height={30}/>
            }
          </View>
          <View style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            backgroundColor: colors.surface
          }}>
            <View style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "flex-start",
              backgroundColor: colors.surface
            }}>
              <Text style={styles.topSDGs}>{t('home.top')}</Text>
            </View>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: "center",
              flex: 1,
              flexWrap: "wrap",
              paddingHorizontal: 10,
              paddingTop: 10,
              backgroundColor: 'rgba(0,0,0,0)'
            }}>
              {topOds.slice(0, 3).map((ods, index) => {
                return <TouchableWithoutFeedback key={index} onPress={() => {navigation.navigate('ranking', {ods: parseInt(ods)})}}>
                  <View style={{backgroundColor: colors.surface}}>
                    <CTDBadge color={categoryColors[index]} number={index + 1}/>
                    <Image style={{
                      width: 80,
                      height: 80,
                      borderRadius: 40,
                      borderColor: categoryColors[index],
                      borderWidth: 6,
                      marginHorizontal: 20
                    }}
                           source={onuLogos[parseInt(ods)].image} resizeMode={'cover'}/>
                    <View style={{
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 10,
                      backgroundColor: colors.surface
                    }}>
                      <Text style={styles.ods}>2k {t('home.challenges-active')}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              })}
            </View>
          </View>

          <View style={{backgroundColor: colors.surface, alignItems: "flex-end", marginTop: -20}}>
            <Button onPress={() => setShowAll(!showAll)}
                    icon={{name: !showAll ? 'add' : 'remove', type: 'ionicon'}}
                    buttonStyle={styles.button}
            />
          </View>

            {showAll && <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "center",
                flex: 1,
                flexWrap: "wrap",
                paddingHorizontal: 10,
                paddingTop: 10,
                backgroundColor: 'rgba(0,0,0,0)'
              }}>

            {categories.slice(3).map((s, index) => {
              return <TouchableWithoutFeedback key={index+3} onPress={() => {navigation.navigate('ranking', {ods: parseInt(s)})}}>
                <View style={{backgroundColor: colors.surface}}>
                  <CTDBadge color={categoryColors[index+3]} number={index + 4}/>
                  <Image style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    borderColor: categoryColors[index+3],
                    borderWidth: 6,
                    marginHorizontal: 20
                  }}
                         source={onuLogos[parseInt(s)].image} resizeMode={'cover'}/>
                  <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                    backgroundColor: colors.surface
                  }}>
                    <Text style={styles.ods}>2k {t('home.challenges-active')}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            })}
              </View>}

              <PostFeed navigation={navigation}/>

          </ScrollView>
      </View>}

      {createPost && <Card style={styles.creationCard}>
          <View style={{width: '25%', backgroundColor: 'rgba(0,0,0,0)',}}>
              <Button onPress={() => setCreatePost(false)}
                      icon={{name: 'chevron-back-outline', type: 'ionicon'}}
                      buttonStyle={styles.button}
                      titleStyle={{color: colors.primary}}
                      title={t('home.cancel')}
              />
          </View>
          <CreatePost toastOn={toastOnPostError} setCreatePost={setCreatePost}/>
      </Card>
      }

      {create && <Card style={styles.creationCard}>
        {/*<Image source={require('../assets/images/dots.png')} resizeMode={'cover'} style={styles.background}/>*/}
        {/*PARA FONDO COLOR: descomentar el de abajo, comentar el de arriba*/}
          <Image source={require('../../assets/images/connections.png')} resizeMode={'cover'}
                 style={styles.background}/>
          <View style={{width: '25%', backgroundColor: 'rgba(0,0,0,0)',}}>
              <Button onPress={() => setCreate(false)}
                      icon={{name: 'chevron-back-outline', type: 'ionicon'}}
                      buttonStyle={styles.button}
                      titleStyle={{color: colors.primary}}
                      title="Cancel"
              />
          </View>
          <Stepper onSubmit={onSubmitCreation} formik={formik} isLoading={loading}/>
      </Card>}

      {creationSuccess && <ChallengeCreationSuccessful close={() => setCreationSuccess(false)}/>}

    </View>
  )
}

export default CTDHome;
