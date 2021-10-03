import React, {useEffect, useState} from "react";
import MapView, {LatLng, Marker} from "react-native-maps";
import {
  useTheme,
  Title,
  Avatar,
    Button,
  ActivityIndicator
} from 'react-native-paper';
import {Dimensions, Image, ImageBackground, ScrollView, TouchableWithoutFeedback} from "react-native";
import {View,Text} from "../Themed";
import { StyleSheet } from 'react-native';
import {Challenge} from "../Models/Challenge";
import {useLazyQuery} from "@apollo/client";
import {FIND_USER_BY_ID, NEW_FIND_USER_BY_ID} from "../apollo-graph/Queries";
import LottieView from "lottie-react-native";
import JoinButton from "./JoinButton";
import {onuPictures} from "../CreateChallengeForm/Details/onuObjectiveInfo";
import {useTranslation} from "react-i18next";
import {getUserId} from "../Storage";


const mockedChallenges = [
    {
        id: 1,
        title: "Challenge 1"
    },
    {
        id: 1,
        title: "Challenge Title 2"
    },
    {
        id: 1,
        title: "Best Challenge Title 3"
    },
]

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

interface Props {
    challenge: Challenge
    setSelectedChallenge:(Challenge)=>void

}

const ChallengePage = (props:Props) => {
    const {t, i18n} = useTranslation();
    const [language, setLanguage] = React.useState(i18n.language);
    const [onuObjectives, setOnuObjectives] = React.useState([]);
    const [openChoices, setOpenChoices] = React.useState(false);
    const { colors } = useTheme();
    const [marker, setMarker] = useState<LatLng>(props.challenge ? props.challenge.coordinates: {latitude: 0, longitude: 0});
    const getOwner = () => {
      if(props.challenge) return props.challenge.owner
      else return ''
    }
    const [getUser, {data, loading, error}] = useLazyQuery(FIND_USER_BY_ID, {variables:{userId: getOwner()}})
    const [getLoggedInUser, {data: loggedInUserData}] = useLazyQuery(NEW_FIND_USER_BY_ID);

    useEffect(() => {
      console.log(props.challenge)
      if(props.challenge) {
          getUser()
          getLoggedInUser()
      }
    }, [props.challenge])

    /*useEffect(() => {
        if (props.otherUserId) {
            setUserId(props.otherUserId);
            getUserId().then(id => {
                setLoggedInUserId(id);
                getLoggedInUser({variables: {targetUserId: id, currentUserId: id}});

            });
        } else {
            getUserId().then(id => {
                setUserId(id);
                setLoggedInUserId(id);
            });
        }
    }, [props.otherUserId]);
    */

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

  if (loading) return <View style={{display: 'flex', marginTop:Dimensions.get('window').height*0.4, justifyContent:'center'}}><ActivityIndicator size="large" /></View>;
  if (error) {
    console.log(error.message);
    return <LottieView
      style={{ width: '95%',
        height: 400,marginTop:Dimensions.get('window').height*0.07}}
      source={require('../../assets/lottie/network-lost.json')}
      autoPlay
      loop
      speed={0.4}
      resizeMode={'cover'}
    />;
  }

    return (props.challenge && data) ?

    <View style={{flex:1,width:Dimensions.get("screen").width, height:Dimensions.get("window").height * 0.1,backgroundColor:colors.surface}}>
        <View style={{width:"100%",alignItems:"flex-start" ,padding:10,marginTop: 20,backgroundColor:colors.surface}}>
        <Button icon="keyboard-backspace" onPress={()=>props.setSelectedChallenge(null)}>
            {t('challenge-page.back')}
        </Button>
        </View>
             <ScrollView  contentContainerStyle={{ flexGrow:1, justifyContent: "center", width: '100%'}} style={{ flex: 1,backgroundColor:"rgba(0,0,0,0)"}}  >

                     <ImageBackground
                        style={{width:"100%", height:300, display:"flex", justifyContent: "center", alignItems: "center"}}
                         source={require('../../assets/images/compost.jpg')}
                     >
                       <Avatar.Text style={{borderColor: colors.background, borderWidth: 3}} label={data.findUserById.name[0] + data.findUserById.lastname[0]}/>
                       <Text style={styles.title}> {props.challenge.title}</Text>
                       <Text style={{color: colors.background}}> {data.findUserById.mail} </Text>

                     </ImageBackground>
                 <View style={{width:"100%",justifyContent: "center", alignItems: "center", padding:10, backgroundColor:colors.surface}}>
              <View style={{width:"90%",justifyContent: "center", alignItems: "center", padding:10, backgroundColor:colors.surface}}>
                         <Title style={{ fontSize: 20, color: colors.primary,
                             marginTop: 5,fontWeight:"bold"}}>  {t('challenge-page.challenge-description')}:  {props.challenge.description}</Title>

              </View>
                 </View>
                 <View style={{justifyContent: "center", alignItems: "center", padding:10, backgroundColor:colors.surface}}>
                 <View style={{width:"90%",justifyContent: "center", alignItems: "center",padding:15,marginRight:20,marginLeft:20, backgroundColor:colors.primary,borderRadius:10}}>
                         <Title style={{ fontSize: 20, color: colors.background,
                             marginTop: 5}}>{t('challenge-page.release-date')}:   {props.challenge.startEvent}</Title>
                         <Title style={{ fontSize: 20, color: colors.accent,
                             marginTop: 5,fontWeight:"bold"}}>{t('challenge-page.end-event')}:   {props.challenge.endEvent}</Title>
                         <Title style={{ fontSize: 20, color: colors.background,
                             marginTop: 5}}>{t('challenge-page.inscriptions-start')}:   {props.challenge.startInscription}</Title>
                         <Title style={{ fontSize: 20, color: colors.accent,
                             marginTop: 5,fontWeight:"bold"}}>{t('challenge-page.inscriptions-end')}:   {props.challenge.endInscription}</Title>
                 </View>
                 </View>

                 <View style={{width:"100%",justifyContent: "center", padding:15,marginLeft:4, backgroundColor:colors.surface}}>
                     <Button icon="check-bold" style={{backgroundColor:"rgba(0,0,0,0)"}}>
                         <Title style={{ fontSize: 20, color: colors.primary,
                             padding:10}}>{t('challenge-page.challenge-objetives')}</Title>
                     </Button>
                     {props.challenge.objectives.map((objective, i) =>
                         <View key={i} style={{marginBottom: 5, backgroundColor: 'rgba(0,0,0,0)'}}>
                             <Title style={{ marginLeft: 4,fontSize: 20, color: colors.primary,
                                 marginTop: 5}}>{objective.name}</Title>
                         </View>
                     )}

                 </View>

                 <View style={{width:"100%",justifyContent: "center",padding:10, backgroundColor:colors.surface}}>
                     <JoinButton/>
                 </View>
                 <View style={{width:"100%",justifyContent: "center", padding:15, backgroundColor:colors.surface}}>

                     <Button icon="information" style={{backgroundColor:"rgba(0,0,0,0)"}}>
                         <Title style={{ fontSize: 20, color: colors.primary,
                             padding:10}}>{t('challenge-page.sustainable-objetives')}</Title>
                     </Button>

                   <View style={{
                     display: 'flex',
                     flexDirection: 'row',
                     justifyContent: "center",
                     paddingHorizontal: 10,
                     paddingTop: 10,
                     backgroundColor: 'rgba(0,0,0,0)'
                   }}>
                     {props.challenge.categories.map((s, index) => {
                       return <TouchableWithoutFeedback key={index}>
                         <Image
                           style={{width: 50, height: 50, borderRadius: 25, marginHorizontal: 10}}
                           source={onuPictures[parseInt(s)].image}/>
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
                                         latitude: props.challenge? props.challenge.coordinates.latitude: 0,
                                         longitude: props.challenge? props.challenge.coordinates.longitude: 0,
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

    </View> : <View/>


}

export default ChallengePage;
