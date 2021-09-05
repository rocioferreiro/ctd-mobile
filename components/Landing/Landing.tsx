import React from 'react';
import {Dimensions, StyleSheet, Image} from "react-native";
import {Text, View} from "../Themed";
import {Button, useTheme} from "react-native-paper";

const Landing = () => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        background: {
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
            zIndex: -1,
            position: "absolute",
        },
        root: {
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
            justifyContent: "center",
            alignItems: "center",
        },
        title: {
            backgroundColor: 'rgba(0,0,0,0)',
            fontSize: 30,
            color: '#FFC300',
            fontWeight: 'bold'
        },
        content: {
            display: "flex",
            zIndex: 1,
            width: Dimensions.get('screen').width,
            height: '30%',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0)'
        },
        button: {
            backgroundColor: '#FFC300',
            borderRadius: 20,
        }
    });

    return (
        <View style={styles.root}>
            <Image source={require('../../assets/images/background/dots-background.png')} resizeMode={'cover'} style={styles.background}/>
            <View style={styles.content}>
                <Text style={styles.title}>Connect the Dots</Text>
                <Button style={styles.button} mode={'contained'}>Login</Button>
                <Button style={styles.button} mode={'contained'}>Register</Button>
            </View>
        </View>
    )
}

export default Landing;
