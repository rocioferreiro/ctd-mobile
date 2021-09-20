import React from "react";

import {Dimensions, Image, ScrollView, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {Card, useTheme} from "react-native-paper";
import {Button} from "react-native-elements";
import {View, Text} from "../Themed";
import * as Progress from 'react-native-progress';
import CTDBadge from "./Badge";
import PostFeed from "./PostFeed";
import {LinearGradient} from "expo-linear-gradient";
import CreatePost from "../CreatePost/CreatePost";
import Toast from "react-native-toast-message";
import {onuLogos} from "../ONUObjectives";

const CTDHome = () => {

    const {colors} = useTheme();
    const categories=["1","2","3"]
    const categoryColors=[colors.accent,"#707070","#c1c1c1"]
    const [createPost, setCreatePost] = React.useState(false)
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surface,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        },
        creationCard: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height * 0.95,
            marginTop: Dimensions.get('window').height * 0.03,
            backgroundColor: colors.surface
        },
        button: {
            backgroundColor: 'rgba(0,0,0,0)',
            marginBottom: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            marginLeft: -10
        },
        background: {
            flex: 1,
            justifyContent: "center",
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            position: "absolute",
            zIndex: 0
        },
        title: {
            backgroundColor: 'rgba(0,0,0,0)',
            fontSize: 23,
            color: '#ffffff',
            fontWeight: 'bold',

        },
        subtitle: {
            backgroundColor: 'rgba(0,0,0,0)',
            fontSize: 37,
            color: colors.accent,
            textAlign:'right',
            fontWeight: 'bold',
            marginHorizontal:20,
        },
        detailtitle: {
            backgroundColor: 'rgba(0,0,0,0)',
            color: '#ffffff',
            textAlign:'left',
            fontSize: 14
        },
        logo: {
            height: 100,
            width: 100,
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
            fontSize: 10,
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

    function toastOnPostError() {
        Toast.show({
            type: 'error',
            text1: 'Post Creation Error',
            text2: 'Try again later',
            topOffset: Dimensions.get("window").height * 0.05,
        });
    }

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
                    <View style={{justifyContent: "center", alignItems: "center", padding:10, paddingTop: 30, backgroundColor:"rgba(0,0,0,0)"}}>
                    <View style={{width:"70%",justifyContent: "center", alignItems: "center", padding:10, backgroundColor:"rgba(0,0,0,0)"}}>

                    <Image resizeMode={"contain"} source={require('../../assets/images/ctd-logo.png')} style={styles.logo}/>
                    <Text style={styles.title}>Connect the Dots</Text>
                        </View>
                    </View>
                    </LinearGradient>
                    <View style={{justifyContent: "center", alignItems: "center", padding:10, backgroundColor:colors.surface}}>

                    <View style={{width:"80%",justifyContent: "center", alignItems: "center", padding:15, backgroundColor:colors.primary,borderRadius:90}}>
                        <View style={{flexDirection:'row', flexWrap:'wrap',backgroundColor:colors.primary,alignItems:"center", justifyContent: 'space-between'}}>
                            <Text style={styles.subtitle}>36500k </Text>
                            <View style={{backgroundColor: 'rgba(0,0,0,0)', flex:1}}>
                                <Text style={styles.detailtitle}> Global</Text>
                                <Text style={styles.detailtitle}> Sustainable</Text>
                                <Text style={styles.detailtitle}> Points</Text>
                            </View>
                        </View>
                    </View>

                    </View>
                    <View style={{width:"100%",justifyContent: "center", alignItems: "center", padding:10, backgroundColor:colors.surface}}>
                        <View style={{width:"100%",justifyContent: "center", alignItems: "flex-start", backgroundColor:colors.surface}}>
                            <Text style={styles.othertitle}> Your Experience </Text>
                            <View style={{flexDirection:'row', flexWrap:'wrap',backgroundColor:colors.surface}}>
                            <Text style={styles.level}>Level 1</Text>
                            <Text style={styles.nextlevel}>Level 2</Text>
                            </View>
                        </View>
                    <Progress.Bar   style={{borderRadius:20}} unfilledColor={'#ffffff'} color={colors.accent} progress={0.3} width={350}   height={30}/>
                    </View>
                    <View style={{width:"100%",justifyContent: "center", alignItems: "center", padding:10, backgroundColor:colors.surface}}>
                        <View style={{width:"100%",justifyContent: "center", alignItems: "flex-start", backgroundColor:colors.surface}}>
                            <Text style={styles.topSDGs}> Top SGDs </Text>
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
                                        <CTDBadge color={categoryColors[index]} number={index+1} />
                                        <Image style={{width: 80, height: 80, borderRadius: 40, borderColor: categoryColors[index], borderWidth:6,  marginHorizontal: 20}}
                                                source={onuLogos[parseInt(s)].image} resizeMode={'cover'}/>
                                        <View style={{justifyContent: "center", alignItems: "center", padding:10, backgroundColor:colors.surface}}>
                                            <Text style={styles.ods}>2k Challenges Active</Text>
                                        </View>
                                    </View>


                                </TouchableWithoutFeedback>
                            })}
                        </View>
                    </View>
                    <View style={{backgroundColor: colors.surface, alignItems:"flex-end",marginTop:-20}}>
                        <Button onPress={() => setCreatePost(true)}
                                icon={{name: 'add', type: 'ionicon'}}
                                buttonStyle={styles.button}
                        />
                    </View>

                    <PostFeed/>

                </ScrollView>
            </View>

            {createPost && <Card style={styles.creationCard}>
                <View style={{width: '25%', backgroundColor: 'rgba(0,0,0,0)',}}>
                    <Button onPress={() => setCreatePost(false)}
                            icon={{name: 'chevron-back-outline', type: 'ionicon'}}
                            buttonStyle={styles.button}
                            titleStyle={{color: colors.primary}}
                            title="Cancel"
                    />
                </View>
                <CreatePost toastOn={toastOnPostError} setCreatePost={setCreatePost} />
            </Card>
            }

            </View>
    )
}

export default CTDHome;
