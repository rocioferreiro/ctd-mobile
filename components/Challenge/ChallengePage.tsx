import React, {useEffect, useState} from "react";
import MapView, {LatLng, Marker} from "react-native-maps";

import {
  Portal,
  Searchbar,
  Card,
  Divider,
  Modal,
  useTheme,
  Title,
  Paragraph,
  Avatar,
  TextInput, ActivityIndicator
} from 'react-native-paper';

import {Dimensions, ImageBackground, ScrollView} from "react-native";
import {color} from "react-native-elements/dist/helpers";
import {View,Text} from "../Themed";
import {  Image} from 'react-native';
import { StyleSheet } from 'react-native';
import {Tuple} from "../Models/User";
import {Challenge, ChallengeObjective} from "../Models/Challenge";
import JoinFAB from "./JoinFAB";
import {useLazyQuery} from "@apollo/client";
import {GET_USER_BY_ID} from "../apollo-graph/Queries";
import LottieView from "lottie-react-native";




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
    const { colors } = useTheme();
    const [marker, setMarker] = useState<LatLng>();
    const getOwner = () => {
      if(props.challenge) return props.challenge.owner
      else return ''
    }
    const [getUser, {data, loading, error}] = useLazyQuery(GET_USER_BY_ID, {variables:{userId: getOwner()}})

    useEffect(() => {
      if(props.challenge) getUser()
    }, [props.challenge])

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
            borderWidth: 0,
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
            borderColor: marker ? colors.extra : colors.surface,
            borderRadius: 16,
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
             <ScrollView  contentContainerStyle={{ flexGrow:1, justifyContent: "center", width: '100%'}} style={{ flex: 1,backgroundColor:"rgba(0,0,0,0)"}}  >

                     <ImageBackground
                        style={{width:"100%", height:300, display:"flex", justifyContent: "center", alignItems: "center"}}
                         source={{uri: 'https://picsum.photos/700'}}
                     >
                       <Avatar.Text style={{borderColor: colors.background, borderWidth: 3}} label={data.findUserById.name[0] + data.findUserById.lastname[0]}/>
                       <Text style={styles.title}> {props.challenge.title}</Text>
                       <Text style={{color: colors.background}}> {data.findUserById.mail} </Text>

                     </ImageBackground>

              <View style={{width:"100%",justifyContent: "center", alignItems: "center", padding:10, backgroundColor:colors.surface}}>
                         <Title style={{ fontSize: 20, color: colors.primary,
                             marginTop: 5}}> Challenge Description:  {props.challenge.description}</Title>

              </View>
                 <View style={{justifyContent: "center", alignItems: "center",padding:10,marginRight:20,marginLeft:20, backgroundColor:colors.primary,borderRadius:40}}>

                         <Title style={{ fontSize: 20, color: colors.background,
                             marginTop: 5}}>Release Date:   {props.challenge.startEvent}</Title>
                         <Title style={{ fontSize: 20, color: colors.background,
                             marginTop: 5}}>End Event:   {props.challenge.endEvent}</Title>
                         <Title style={{ fontSize: 20, color: colors.background,
                             marginTop: 5}}>Inscriptions start:   {props.challenge.startInscription}</Title>
                         <Title style={{ fontSize: 20, color: colors.background,
                             marginTop: 5}}>Inscriptions end:   {props.challenge.endInscription}</Title>
                 </View>

                 <View style={{width:"100%",justifyContent: "center", alignItems: "center", padding:10, backgroundColor:colors.surface}}>
                         <Title style={{ fontSize: 25, color: colors.primary,
                             marginTop: 5}}>Challenge Objectives: </Title>
                         <Title style={{ marginLeft: 4,fontSize: 20, color: colors.primary,
                             marginTop: 5}}>Obj 1</Title>
                         <Title style={{  marginLeft: 4, fontSize: 20, color: colors.primary,
                             marginTop: 5}}>Obj 2</Title>

                 </View>


                         <View style={styles.card}>

                             <View style={styles.mapWrapper}>

                                 <MapView
                                     style={styles.map}
                                     initialRegion={{
                                         latitude: -36.3789925,
                                         longitude: -60.3855889,
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
