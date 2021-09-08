import React from 'react';
import {Dimensions, StyleSheet, Image} from "react-native";
import {Text, View} from "../Themed";
import {Button, useTheme} from "react-native-paper";
import Login from "./Login/Login";
import Register from "../Register/Register";

const Landing = () => {
    const { colors } = useTheme();
    const [registerOpen, setRegisterOpen] = React.useState(false);
    const [loginOpen, setLoginOpen] = React.useState(false);

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
            color: '#ffffff',
            fontWeight: 'bold'
        },
        content: {
            display: "flex",
            width: Dimensions.get('screen').width,
            height: '35%',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0)'
        },
        button: {
            backgroundColor: colors.primary,
            borderRadius: 20,
            borderWidth: 2,
            zIndex: 1,
            borderColor: colors.light,
            fontWeight: 'bold',
            minWidth: '40%'
        },
        logo: {
            height: 110,
            width: 110,
        }
    });

    return (
        <View style={styles.root}>
            <Image source={require('../../assets/images/background/dots-background.png')} resizeMode={'cover'} style={styles.background}/>
            {registerOpen && <Register onCancel={() => {setRegisterOpen(false)}}/>}
            {loginOpen && <Login onCancel={() => {setLoginOpen(false)}}/>}
            {(!loginOpen && !registerOpen) &&
            <View style={styles.content}>
                <Image resizeMode={"contain"} source={require('../../assets/images/ctd-logo.png')} style={styles.logo}/>
                <Text style={styles.title}>Connect the Dots</Text>
                <Button style={styles.button} mode={'contained'} onPress={() => {setRegisterOpen(true)}}>Register</Button>
                <Button style={styles.button} mode={'contained'} onPress={() => {setLoginOpen(true)}}>Login</Button>
            </View>
            }
        </View>
    )
}

export default Landing;
