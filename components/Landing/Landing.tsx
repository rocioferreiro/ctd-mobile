import React from 'react';
import {Dimensions, StyleSheet, Image} from "react-native";
import {Text, View} from "../Themed";
import {Button, useTheme} from "react-native-paper";
import Login from "../Login/Login";

const Landing = () => {
    const { colors } = useTheme();
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
            color: '#FFC300',
            fontWeight: 'bold'
        },
        content: {
            display: "flex",
            width: Dimensions.get('screen').width,
            height: '30%',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0)'
        },
        button: {
            backgroundColor: '#FFC300',
            borderRadius: 20,
            zIndex: 1
        }
    });

    return (
        <View style={styles.root}>
            <Image source={require('../../assets/images/background/dots-background.png')} resizeMode={'cover'} style={styles.background}/>
            {loginOpen && <Login/>}
            {!loginOpen &&
            <View style={styles.content}>
                <Text style={styles.title}>Connect the Dots</Text>
                <Button style={styles.button} mode={'contained'} onPress={() => {console.log('register')}}>Register</Button>
                <Button style={styles.button} mode={'contained'} onPress={() => {setLoginOpen(true)}}>Login</Button>
            </View>
            }
        </View>
    )
}

export default Landing;
