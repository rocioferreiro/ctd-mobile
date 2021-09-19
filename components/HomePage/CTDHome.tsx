import React from "react";

import {Dimensions,StyleSheet} from "react-native";
import {useTheme} from "react-native-paper";
import {View, Text} from "../Themed";


const CTDHome = () => {



    const {colors} = useTheme();


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
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
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



    return (
        <View style={{backgroundColor: colors.surface}}>
                <Text> Home Screen </Text>
                <View style={{width: '60%', marginTop: 10, backgroundColor: 'rgba(0,0,0,0)'}}>
                </View>
        </View>
    )
}

export default CTDHome;