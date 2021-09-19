import React from "react";

import {Dimensions, Image, ScrollView, StyleSheet} from "react-native";
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
        },
        title: {
            backgroundColor: 'rgba(0,0,0,0)',
            fontSize: 30,
            color: '#ffffff',
            fontWeight: 'bold'
        },
        logo: {
            height: 110,
            width: 110,
        }
    });





    return (
        <View style={styles.container}>
            <View style={{flex:1,width:Dimensions.get("screen").width, height:Dimensions.get("window").height * 0.1,backgroundColor:colors.surface}}>
                <ScrollView  contentContainerStyle={{ flexGrow:1, justifyContent: "center", width: '100%'}} style={{ flex: 1,backgroundColor:"rgba(0,0,0,0)"}}  >
                    <View style={{width:"90%",justifyContent: "center", alignItems: "center", padding:10, backgroundColor:colors.surface}}>
                    <Image resizeMode={"contain"} source={require('../../assets/images/ctd-logo.png')} style={styles.logo}/>
                    <Text style={styles.title}>Connect the Dots</Text>
                    </View>
                </ScrollView>
            </View>

            </View>
    )
}

export default CTDHome;