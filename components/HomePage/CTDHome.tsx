import React from "react";

import {Dimensions,StyleSheet} from "react-native";
import {Button, useTheme} from "react-native-paper";
import {View, Text} from "../Themed";


const CTDHome = () => {



    const {colors} = useTheme();
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surface,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        }
    });





    return (
        <View style={styles.container}>
            <Text> HOME SCREEN</Text>
        </View>
    )
}

export default CTDHome;