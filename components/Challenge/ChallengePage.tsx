import React, {useState} from "react";

import {Portal, Searchbar, Card, Divider, Modal, useTheme} from 'react-native-paper';

import {Dimensions, ImageBackground, ScrollView} from "react-native";
import {color} from "react-native-elements/dist/helpers";
import {View,Text} from "../Themed";
import {  Image} from 'react-native';
import { StyleSheet } from 'react-native';




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


const ChallengePage = () => {
    const { colors } = useTheme();




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

                 </View>

             </ScrollView>


        </View>





    )
}

export default ChallengePage;
