import React, {useState} from "react";

import {Portal, Searchbar, Card, Divider, Modal, useTheme} from 'react-native-paper';

import {Dimensions, ScrollView} from "react-native";
import {color} from "react-native-elements/dist/helpers";
import {View} from "../Themed";



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
            <Card style={{
                width: Dimensions.get('window').width,
                height: '100%',
                marginTop:50,
                backgroundColor:color.surface
            }}>

                <Divider />
                <ScrollView>

                </ScrollView>

            </Card>
        </View>





    )
}

export default ChallengePage;
