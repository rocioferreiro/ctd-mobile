import React, {useEffect} from "react";
import {Button, Card, useTheme, List} from "react-native-paper";
import {View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Image, ScrollView, Keyboard} from "react-native";
import {Icon, Input} from "react-native-elements";
import {useTranslation} from "react-i18next";
import {onuPictures} from "../CreateChallengeForm/Details/onuObjectiveInfo";
import {colorShade} from "../Models/shadingColor";

import {ONUObjectives} from "../ONUObjectives";
import OdsChoiceProfile from "./OdsChoiceProfile";
import Toast from "react-native-toast-message";

type Props = {
    setDisabled: (boolean) => void
    setOdsIsOpen: (boolean) => void
    formik: any
}

const ProfileOds = (props: Props) => {
    const {t, i18n} = useTranslation();
    const { colors } = useTheme();
    const {formik} = props;
    const [keyboardShown, setKeyboardShown] = React.useState(false);
    const [keyboardHeight, setKeyboardHeight] = React.useState(0);
    const [onuObjectives, setOnuObjectives] = React.useState(props.formik.values.favouriteODS);
    const [openChoices, setOpenChoices] = React.useState(false);
    const [errorMarker, setErrorMarker] = React.useState({title: false, description: false, goals: false, onu: false})
    const onuInfo = onuPictures();

    const styles = StyleSheet.create({
        title: {
            fontSize: 30,
            fontWeight: 'bold',
            color: colors.primary,
            marginLeft: 5,
            marginTop: -20,
        },
        card: {
            width: '100%',
            //minHeight: Dimensions.get('window').height * 0.74,
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
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.5,
            shadowColor: '#DAB99D',
            elevation: 4
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
            height: Dimensions.get('window').height * 0.05,
            borderRadius: 30,
            backgroundColor: colorShade(colors.accent, 5),
            //textAlign: "center",
            justifyContent: "center",
            //marginBottom: 10
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

    const verifyChange = (addingGoal) => {
        if(addingGoal) {
            if( formik.values.favouriteODS.length > 0)
                props.setDisabled(false)
            else props.setDisabled(true)

        }

    }

    useEffect(() => {
        if(formik.values.favouriteODS && formik.values.favouriteODS.length > 0) {
            setOnuObjectives(formik.values.favouriteODS.map(i =>{return {image: onuInfo[i].image, index: i, obj: Object.keys(ONUObjectives)[i]}} ))
            verifyChange(true)
        }
        else {
            verifyChange(false)
        }

        const showSubscription = Keyboard.addListener("keyboardDidShow", e => {
            setKeyboardShown(true);
            setKeyboardHeight(e.endCoordinates.height)
            console.log(e.endCoordinates.height)
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardShown(false);
            setKeyboardHeight(0)
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };

    }, [])

    function toastOn(message: string, description: string = '') {
        Toast.show({
            type: 'error',
            text1: message,
            text2: description,
            topOffset: Dimensions.get("window").height * 0.05,
        });
    }

    return (
        <View style={{flex: 1, padding:15}}>
            <ScrollView style={{backgroundColor: "rgba(0,0,0,0)"}}>
                <View style={styles.card}>
                    {openChoices ?
                        <OdsChoiceProfile formik={formik} setOdsIsOpen={props.setOdsIsOpen}  selected={onuObjectives} setSelected={setOnuObjectives}
                                            setOpen={setOpenChoices}/> :

                        <View >
                            <Text style={{fontWeight: "bold",
                                color: colors.primary,
                                marginLeft: 5,
                                fontSize: 20, padding:10}}> {t('profile-ods.choose-favorite-ods')} </Text>
                            {onuObjectives.length > 0 && onuObjectives.length<4 ?
                                <View style={{display: 'flex', flexDirection: 'column'}}>
                                    <View style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: "center",
                                        paddingHorizontal: 10,
                                        paddingTop: 10
                                    }}>
                                        {onuObjectives.map((s, index) => {
                                            return <TouchableWithoutFeedback key={index}>
                                                <Image
                                                    style={{width: 50, height: 50, borderRadius: 25, marginHorizontal: 10}}
                                                    source={s.image}/>
                                            </TouchableWithoutFeedback>
                                        })}
                                    </View>
                                    <View style={{
                                        display: "flex",
                                        justifyContent: 'center',
                                        width: '100%',
                                        flexDirection: 'row',
                                        padding: 15
                                    }}>
                                        <Button style={styles.editOptionsButton} mode={'contained'}
                                                onPress={() => {setOpenChoices(true)
                                                                    props.setOdsIsOpen(false)}}> {t('profile-ods.edit-ods')}</Button>
                                    </View>
                                </View> :
                                <View>
                                    <Text style={{width: '100%', marginLeft: 10, color: colors.primary, paddingTop: 10}}>{t('profile-ods.select-at-least')} </Text>
                                    <View style={{
                                        display: "flex",
                                        justifyContent: 'center',
                                        width: '100%',
                                        flexDirection: 'row',
                                        padding: 15
                                    }}>
                                        <Button style={styles.optionsButton} mode={'contained'}
                                                onPress={() => setOpenChoices(true)}>{t('profile-ods.select-ods')} </Button>
                                    </View>
                                </View>
                            }

                        </View>
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default ProfileOds;