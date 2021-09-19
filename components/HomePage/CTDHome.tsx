import React from "react";

import {Dimensions, Image, ScrollView, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {Badge, Button, useTheme} from "react-native-paper";
import {View, Text} from "../Themed";
import * as Progress from 'react-native-progress';
import {onuPictures} from "../CreateChallengeForm/Details/onuObjectiveInfo";
import CTDBadge from "./Badge";
import PostFeed from "./PostFeed";
import {LinearGradient} from "expo-linear-gradient";



const CTDHome = () => {



    const {colors} = useTheme();
    const categories=["1","2","3"]
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
            fontSize: 23,
            color: '#ffffff',
            fontWeight: 'bold',

        },
        subtitle: {
            backgroundColor: 'rgba(0,0,0,0)',
            fontSize: 30,
            color: colors.accent,
            textAlign:'right',
            fontWeight: 'bold',
            marginLeft:20,
        },
        detailtitle: {
            backgroundColor: 'rgba(0,0,0,0)',
            color: '#ffffff',
            textAlign:'left',
            fontSize: 10,
            flex:1,
            width:50,
            padding:5
        },
        logo: {
            height: 110,
            width: 110,
        },
        othertitle: {
            backgroundColor: 'rgba(0,0,0,0)',
            fontSize: 16,
            color: colors.primary,
            fontWeight: 'bold',
            paddingBottom:10
        },
        topSDGs: {
            backgroundColor: 'rgba(0,0,0,0)',
            fontSize: 19,
            color: colors.primary,
            fontWeight: 'bold',
            paddingBottom:10
        },
        level: {
            backgroundColor: 'rgba(0,0,0,0)',
            color: colors.backdrop,
            fontSize: 12,
            paddingBottom:4,
        },
        nextlevel: {
            backgroundColor: 'rgba(0,0,0,0)',
            color: colors.backdrop,
            fontSize: 12,
            textAlign:'right',
            flex:1,
            paddingBottom:4,
        },
        ods: {
            backgroundColor: 'rgba(0,0,0,0)',
            color: colors.primary,
            fontSize: 7,
            paddingBottom:4,
            width:70,
            textAlign:'center',
            fontWeight: 'bold',

        },
        box: {
            width: '100%',
            height: 200,
        },
    });





    return (
        <View style={styles.container}>
            <View style={{flex:1,width:Dimensions.get("screen").width, height:Dimensions.get("window").height * 0.1,backgroundColor:colors.surface}}>
                <ScrollView  contentContainerStyle={{ flexGrow:1, justifyContent: "center", width: '100%'}} style={{ flex: 1,backgroundColor:"rgba(0,0,0,0)"}}  >
                    <LinearGradient
                        colors={[colors.primary,"rgba(0,0,0,0)"]}
                        start={{
                            x: 1,
                            y: 0,
                        }}
                        end={{
                            x: 1,
                            y: 1,
                        }}
                        style={styles.box}
                    >
                    <View style={{justifyContent: "center", alignItems: "center", padding:10,backgroundColor:"rgba(0,0,0,0)"}}>
                    <View style={{width:"70%",justifyContent: "center", alignItems: "center", padding:10, backgroundColor:"rgba(0,0,0,0)"}}>

                    <Image resizeMode={"contain"} source={require('../../assets/images/ctd-logo.png')} style={styles.logo}/>
                    <Text style={styles.title}>Connect the Dots</Text>
                        </View>
                    </View>
                    </LinearGradient>
                    <View style={{justifyContent: "center", alignItems: "center", padding:10, backgroundColor:colors.surface}}>

                    <View style={{width:"80%",justifyContent: "center", alignItems: "center", padding:15, backgroundColor:colors.primary,borderRadius:90}}>
                        <View style={{flexDirection:'row', flexWrap:'wrap',backgroundColor:colors.primary,alignItems:"center"}}>
                        <Text style={styles.subtitle}>36500k</Text>
                        <Text style={styles.detailtitle}> Global Sustainable Points</Text>
                        </View>
                    </View>

                    </View>
                    <View style={{width:"100%",justifyContent: "center", alignItems: "center", padding:10, backgroundColor:colors.surface}}>
                        <View style={{width:"100%",justifyContent: "center", alignItems: "flex-start", backgroundColor:colors.surface}}>
                            <Text style={styles.othertitle}> Your Experience</Text>
                            <View style={{flexDirection:'row', flexWrap:'wrap',backgroundColor:colors.surface}}>
                            <Text style={styles.level}>Level 1</Text>
                            <Text style={styles.nextlevel}>Level 2</Text>
                            </View>
                        </View>
                    <Progress.Bar   style={{borderRadius:20}} unfilledColor={'#ffffff'} color={colors.accent} progress={0.3} width={350}   height={30}/>
                    </View>
                    <View style={{width:"100%",justifyContent: "center", alignItems: "center", padding:10, backgroundColor:colors.surface}}>
                        <View style={{width:"100%",justifyContent: "center", alignItems: "flex-start", backgroundColor:colors.surface}}>
                            <Text style={styles.topSDGs}> Top SGDs</Text>
                        </View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "center",
                            paddingHorizontal: 10,
                            paddingTop: 10,
                            backgroundColor: 'rgba(0,0,0,0)'
                        }}>
                            {categories.map((s, index) => {
                                return <TouchableWithoutFeedback key={index}>
                                    <View  style={{backgroundColor: colors.surface}} >
                                <CTDBadge></CTDBadge>

                                            <Image
                                                style={{width: 80, height: 80, borderRadius: 25, borderColor: colors.accent, borderWidth:10,  marginHorizontal: 20}}
                                                source={onuPictures[parseInt(s)].image}/>
                                        <View style={{justifyContent: "center", alignItems: "center", padding:10, backgroundColor:colors.surface}}>
                                    <Text style={styles.ods}>2k Challenges Active</Text>
                                        </View>
                                    </View>


                                </TouchableWithoutFeedback>
                            })}
                        </View>
                    </View>
                    <PostFeed></PostFeed>
                </ScrollView>
            </View>

            </View>
    )
}

export default CTDHome;