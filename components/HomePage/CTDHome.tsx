import React from "react";

import {Dimensions, Image, ScrollView, StyleSheet} from "react-native";
import {Button, useTheme} from "react-native-paper";
import {View, Text} from "../Themed";
import * as Progress from 'react-native-progress';


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
            fontSize: 20,
            color: '#ffffff',
            fontWeight: 'bold'
        },
        subtitle: {
            backgroundColor: 'rgba(0,0,0,0)',
            fontSize: 30,
            color: colors.accent,
            fontWeight: 'bold'
        },
        detailtitle: {
            backgroundColor: 'rgba(0,0,0,0)',
            color: '#ffffff',
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
                    <View style={{justifyContent: "center", alignItems: "center", padding:10, backgroundColor:colors.surface}}>
                    <View style={{width:"70%",justifyContent: "center", alignItems: "center", padding:10, backgroundColor:colors.surface}}>

                    <Image resizeMode={"contain"} source={require('../../assets/images/ctd-logo.png')} style={styles.logo}/>
                    <Text style={styles.title}>Connect the Dots</Text>
                        </View>
                    </View>
                    <View style={{justifyContent: "center", alignItems: "center", padding:10, backgroundColor:colors.surface}}>
                    <View style={{width:"60%",justifyContent: "center", alignItems: "center", padding:15, backgroundColor:colors.primary,borderRadius:20}}>
                        <Text style={styles.subtitle}>36500k</Text>
                        <Text style={styles.detailtitle}> Global Sustainable Points</Text>
                    </View>
                    </View>
                    <View style={{justifyContent: "center", alignItems: "center", padding:10, backgroundColor:colors.surface}}>
                    <Progress.Bar   style={{borderRadius:20}} unfilledColor={'#ffffff'} color={colors.accent} progress={0.3} width={200}   height={40}/>
                    </View>
                </ScrollView>
            </View>

            </View>
    )
}

export default CTDHome;