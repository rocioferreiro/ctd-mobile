import {Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {Button, useTheme} from "react-native-paper";
import React from "react";
import {colorShade} from "../Models/shadingColor";
import {onuPictures} from "../CreateChallengeForm/Details/onuObjectiveInfo";
import {Challenge} from "../Models/Challenge";

type Props = {
  challenge:Challenge
}
const ChallengeONUObjetives = (props: Props) => {

    const {colors} = useTheme();
    const styles = StyleSheet.create({
        title: {
            fontSize: 35,
            fontWeight: 'bold',
            color: colors.primary,
            marginLeft: 5,
            marginTop: -20,
        },
        card: {
            width: '100%',
            minHeight: Dimensions.get('window').height * 0.74,
            padding: '3%',
            borderWidth: 0,
            backgroundColor: 'rgba(0,0,0,0)'
        },
        input: {
            marginTop: 5,
            width: '100%',
            backgroundColor: colors.surface,
            fontSize: 20,
            borderRadius: 30,
            padding: 15,
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.5,
            shadowColor: '#DAB99D',
            elevation: 4
        },
        inputWithIcon: {
            width: '85%',
            backgroundColor: colors.surface,
            fontSize: 20,
            borderRadius: 30,
            padding: 10,
        },
        goalAdder: {
            marginTop: 5,
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row"
        },
        goalAdderIcon: {
            display: "flex",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 50,
            backgroundColor: colors.primary,
            marginLeft: 10,
        },
        icon: {
            textAlign: 'center',
        },
        button: {
            width: '60%',
            justifyContent: 'center',
            display: 'flex',
            marginTop: 10,
            marginBottom: 10,
            marginRight: 'auto',
            marginLeft: 'auto'
        },
        optionsButton: {
            width: Dimensions.get('window').width * 0.5,
            height: Dimensions.get('window').height * 0.05,
            borderRadius: 40,
            backgroundColor: colors.accent,
            textAlign: "center",
            justifyContent: "center",
            marginBottom: 10
        },
        editOptionsButton: {
            width: Dimensions.get('window').width * 0.4,
            height: Dimensions.get('window').height * 0.04,
            borderRadius: 30,
            backgroundColor: colorShade(colors.accent, 5),
            textAlign: "center",
            justifyContent: "center",
            marginBottom: 10
        },
        listItem: {
            backgroundColor: colors.surface,
            width: '90%',
            borderRadius: 20,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.5,
            shadowColor: '#DAB99D',
            elevation: 3
        },
        label: {
            fontWeight: "bold",
            color: colors.primary,
            marginLeft: 5,
            fontSize: 20
        }
    });
    const onuInfo = onuPictures();
    return(
    <View style={{display: 'flex', flexDirection: 'column'}}>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "center",
            paddingHorizontal: 10,
            paddingTop: 10
        }}>
            {props.challenge.objectives.map((s, index) => {
                return <TouchableWithoutFeedback key={index}>
                    <Image
                        style={{width: 70, height: 70, borderRadius: 25, marginHorizontal: 10}}
                        source={onuInfo[index].image}/>
                </TouchableWithoutFeedback>
            })}
        </View>

    </View> );
}
export default ChallengeONUObjetives;
