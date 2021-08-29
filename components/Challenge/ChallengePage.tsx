import React, {useState} from "react";
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
    TextInput
} from 'react-native-paper';

import {Dimensions, ImageBackground, ScrollView} from "react-native";
import {color} from "react-native-elements/dist/helpers";
import {View,Text} from "../Themed";
import {  Image} from 'react-native';
import { StyleSheet } from 'react-native';
import {Tuple} from "../Models/User";
import {Challenge, ChallengeObjective} from "../Models/Challenge";
import JoinFAB from "./JoinFAB";




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
    const [marker, setMarker] = useState<LatLng>(props.challenge.coordinates);

    const styles = StyleSheet.create({
        title: {
            fontSize: 35,
            fontWeight: 'bold',
            color: colors.primary,
            marginLeft: 25,
            marginTop: -22,
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


    return (

    <View style={{flex:1,width:"100%", height:Dimensions.get("window").height * 0.1}}>

             <ScrollView  contentContainerStyle={{ flexGrow:1, justifyContent: "center"}}  >

                     <ImageBackground
                        style={{width:"100%", height:300}}
                         source={{uri: 'https://picsum.photos/700'}}
                     >
                             <Text>Centered text</Text>


                     </ImageBackground>

              <View style={{width:"100%",justifyContent: "center", alignItems: "center"}}>
                 <Card style={{width:"90%",display: 'flex', justifyContent: 'center',alignItems: "center"}} >

                     <Card.Content>
                         <Title style={{ fontSize: 20, color: colors.primary,
                             marginTop: 5}}> This is a challenge descroption where users will specify what will be achievid</Title>

                     </Card.Content>


                 </Card>
              </View>
                 <View style={{width:"100%",justifyContent: "center", alignItems: "center"}}>
                 <Card style={{backgroundColor:colors.primary,width:"90%",display: 'flex', justifyContent: 'center',alignItems: "center"}}>

                     <Card.Content style={{marginRight:74}}>
                         <Title style={{ fontSize: 20, color: colors.background,
                             marginTop: 5}}>Release Date:     10/11/2021</Title>
                         <Title style={{ fontSize: 20, color: colors.background,
                             marginTop: 5}}>End Event:      10/11/2021</Title>
                         <Title style={{ fontSize: 20, color: colors.background,
                             marginTop: 5}}> Inscriptions start:  10/11/2021</Title>
                         <Title style={{ fontSize: 20, color: colors.background,
                             marginTop: 5}}> Inscriptions end:   10/11/2021</Title>

                     </Card.Content>


                 </Card>
                 </View>

                 <Card >

                     <Card.Content >
                         <Title style={{ fontSize: 25, color: colors.primary,
                             marginTop: 5}}>Challenge Objectives: </Title>
                         <Title style={{ marginLeft: 4,fontSize: 20, color: colors.primary,
                             marginTop: 5}}>Obj 1</Title>
                         <Title style={{  marginLeft: 4, fontSize: 20, color: colors.primary,
                             marginTop: 5}}>Obj 2</Title>

                     </Card.Content>



                 </Card>


                         <Card style={styles.card}>

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
                     </Card>







             </ScrollView>

    </View>









    )
}

export default ChallengePage;
