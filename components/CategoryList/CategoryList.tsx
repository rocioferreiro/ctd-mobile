import React from 'react';
import {View, Text} from "../Themed";
import {categoryBackgrounds, colors, onuLogos, ONUObjectives} from "../ONUObjectives";
import {Card, useTheme} from "react-native-paper";
import {Dimensions, Image, ImageBackground, ScrollView, StyleSheet} from "react-native";

const CategoryList = () => {

    const styles = StyleSheet.create({
        container: {
          backgroundColor: 'rgba(0,0,0,0)'
        },
        card: {
            display: 'flex',
            flexDirection: 'row',
            borderRadius: 5,
            width: Dimensions.get('window').width * 0.8,
            height: Dimensions.get('window').height * 0.15,
            marginBottom: 10,
            marginTop: 10,
            overflow: 'hidden',
            backgroundColor: 'rgba(0,0,0,0)'
        },
        sideNumberContainer: {
            flex: 2,
            display: 'flex',
            alignItems: 'center',
            borderTopStartRadius: 15,
            borderBottomStartRadius: 15,
            borderTopEndRadius: 0,
            borderBottomEndRadius: 0,
            paddingTop: 10,
            paddingBottom: 10,
            paddingHorizontal: 3,
        },
        logo: {
            flex: 4,
            maxWidth: '100%',
            resizeMode: "contain"
        },
        number: {
            fontSize: 35,
            fontWeight: 'bold',
            color: '#ffffff',
            flex: 6
        },
        sideImageContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            flex: 10,
            display: 'flex',
            justifyContent: 'flex-end',
            borderTopStartRadius: 0,
            borderBottomStartRadius: 0,
            borderTopEndRadius: 15,
            borderBottomEndRadius: 15,
            overflow: 'hidden'
        },
        name: {
            fontWeight: 'bold',
            color: '#ffffff',
            marginLeft: 6,
            marginBottom: 6,
        },
    });

    return (
        <ScrollView style={styles.container}>
            {Object.values(ONUObjectives).map((v, i) => {
                return (
                    <View style={styles.card} key={i}>
                        <View style={[styles.sideNumberContainer, {backgroundColor: colors[i]}]}>
                            <Text style={styles.number}>{i+1}</Text>
                            <Image style={styles.logo} source={onuLogos[i].image}/>
                        </View>
                        <View style={styles.sideImageContainer}>
                            <Image style={{
                                ...StyleSheet.absoluteFillObject,
                                backgroundColor: colors[i],
                                opacity: 0.5,
                                width: '100%',
                                height: '100%'
                            }} source={categoryBackgrounds[i].image} resizeMode={'cover'}/>
                            <Text style={styles.name}>{v}</Text>
                        </View>
                    </View>
                )
            })}
        </ScrollView>
    );
}
export default CategoryList;
