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
import {ChallengeObjective} from "../Models/Challenge";




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
    challenge: {
        categories: [],
        coordinates: [],
        description: "Challenge Description",
        endEvent: "11/6/2021",
        endInscription: "11/6/2021",
        objectives: ["Obj1","obj2"],
        owner: "User",
        startEvent: "11/6/2021",
        startInscription: "11/6/2021",
        title?: "Challenge Title",

    }
    navigation: any;

}


const ChallengePage = (props:Props) => {
    const { colors } = useTheme();
    const [marker, setMarker] = useState<LatLng>();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
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

        <View >

             <ScrollView>
                 <View style={{width: Dimensions.get('window').width,
                     height: '100%',
                     marginTop:50}}>
                     <ImageBackground
                        style={{width:"100%", height:300}}
                         source={{uri: 'https://picsum.photos/700'}}
                     >



                             <Text>Centered text</Text>



                     </ImageBackground>


                     <Card >

                         <Card.Content>
                             <Title style={{ fontSize: 25, color: colors.primary,
                                 marginTop: 5}}> props.challenge.description</Title>

                         </Card.Content>


                     </Card>

                     <Card style={{backgroundColor:colors.primary}}>

                         <Card.Content>
                             <Title style={{ fontSize: 25, color: colors.background,
                                 marginTop: 5}}>Release Date: props.challenge.startEvent</Title>
                             <Title style={{ fontSize: 25, color: colors.background,
                                 marginTop: 5}}>End Event: props.challenge.endEvent</Title>
                             <Title style={{ fontSize: 25, color: colors.background,
                                 marginTop: 5}}> Inscriptions start: props.challenge.startInscription</Title>
                             <Title style={{ fontSize: 25, color: colors.background,
                                 marginTop: 5}}> Inscriptions end: props.challenge.endInscription</Title>

                         </Card.Content>


                     </Card>

                     <Card >

                         <Card.Content>
                             <Title style={{ fontSize: 25, color: colors.primary,
                                 marginTop: 5}}>Challenge Objectives</Title>
                             <Title style={{ fontSize: 25, color: colors.primary,
                                 marginTop: 5}}>Obj 1</Title>
                             <Title style={{ fontSize: 25, color: colors.primary,
                                 marginTop: 5}}>Obj 2</Title>

                         </Card.Content>


                     </Card>
                     <View style={{backgroundColor: 'rgba(0,0,0,0)'}}>
                         <Card style={styles.card}>
                             <View style={styles.mapWrapper}>
                                 {location &&
                                 <MapView
                                     style={styles.map}
                                     initialRegion={{
                                         latitude: location.latitude,
                                         longitude: location.longitude,
                                         latitudeDelta: 0.1,
                                         longitudeDelta: 0.1,
                                     }}
                                  >
                                     {
                                         marker &&
                                         <Marker coordinate={marker}/>
                                     }
                                 </MapView>}

                             </View>

                         </Card>
                     </View>


                 </View>

             </ScrollView>


        </View>





    )
}

export default ChallengePage;
