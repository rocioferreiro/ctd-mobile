import React, {useEffect} from "react";
import {Button, Card, useTheme, List} from "react-native-paper";
import {View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Image, ScrollView, Keyboard} from "react-native";
import OnuObjectiveChoice from "./onuObjectiveChoice";
import {Icon, Input} from "react-native-elements";
import {colorShade} from "../../Models/shadingColor";
import {onuPictures} from './onuObjectiveInfo';
import {ONUObjectives} from "../../ONUObjectives";
import {useTranslation} from "react-i18next";

type Props = {
  setDisabled: (boolean) => void
  formik: any
}

const ChallengeDetails = (props: Props) => {
    const {t, i18n} = useTranslation();
    const [language, setLanguage] = React.useState(i18n.language);
  const { colors } = useTheme();
  const {formik} = props;
  const [keyboardShown, setKeyboardShown] = React.useState(false);
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);
  const [goal, setGoal] = React.useState('');
  const [goals, setGoals] = React.useState<any[]>([])
  const [onuObjectives, setOnuObjectives] = React.useState([]);
  const [openChoices, setOpenChoices] = React.useState(false);
  const [errorMarker, setErrorMarker] = React.useState({title: false, description: false, goals: false, onu: false})

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

  const verifyChange = (addingGoal) => {
    if(addingGoal) {
      if(formik.values.title.length > 1 && formik.values.description.length > 1 && formik.values.ONUObjective.length > 0)
        props.setDisabled(false)
      else props.setDisabled(true)
    } else{
      if(formik.values.title.length > 1 && formik.values.description.length > 1 && goals.length>0 && formik.values.ONUObjective.length > 0)
        props.setDisabled(false)
      else props.setDisabled(true)
    }

  }

  useEffect(() => {
    if(formik.values.ONUObjective && formik.values.ONUObjective.length > 0) {
        setOnuObjectives(formik.values.ONUObjective.map(i =>{return {image: onuPictures[i].image, index: i, obj: Object.keys(ONUObjectives)[i]}} ))
    }
    if(formik.values.challengeObjectives && formik.values.challengeObjectives.length > 0){
      setGoals(formik.values.challengeObjectives)
      verifyChange(true)
    } else {
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

    return (
        <View style={{flex: 1}}>
          <ScrollView style={{backgroundColor: "rgba(0,0,0,0)"}}>
            <View style={styles.card}>
                {openChoices ?
                    <OnuObjectiveChoice formik={formik} selected={onuObjectives} setSelected={setOnuObjectives}
                                        setOpen={setOpenChoices}/> :

                    <View>
                        <Text style={styles.title}>{t('challenge-details.create-new-challenge')}</Text>

                        <Input
                          placeholder={t('challenge-details.challenge-title')}
                          style={[styles.input, errorMarker.title ? {borderColor: colors.error, borderWidth:1} : {}]}
                          value={formik.values.title}
                          onChangeText={title => {
                            formik.setFieldValue('title', title)
                            verifyChange(false)
                            setErrorMarker({title: title.length <= 1, description: errorMarker.description, goals: errorMarker.goals, onu: errorMarker.onu})
                          }}
                          inputContainerStyle={{borderBottomWidth: 0}}
                        />

                        <Input
                            placeholder={t('challenge-details.challenge-description')}
                            style={[styles.input, errorMarker.description ? {borderColor: colors.error, borderWidth:1} : {}, {minHeight: Dimensions.get("window").height * 0.12, paddingTop: 20}]}
                            value={formik.values.description}
                            onChangeText={(desc) => {
                                formik.setFieldValue('description', desc);
                                verifyChange(false)
                                setErrorMarker({title: errorMarker.title, description: desc.length <= 1, goals: errorMarker.goals, onu: errorMarker.onu})
                            }}
                            multiline={true}
                            inputContainerStyle={{borderBottomWidth: 0}}
                        />

                        <Text style={styles.label}> {t('challenge-details.sustainable-objetives')} </Text>
                        {onuObjectives.length > 0 ?
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
                                            onPress={() => setOpenChoices(true)}> {t('challenge-details.edit-objetives')}</Button>
                                </View>
                            </View> :
                              <View>
                                  <Text style={{width: '100%', marginLeft: 10, color: colors.primary, paddingTop: 10}}>{t('challenge-details.select-at-least')} </Text>
                                  <View style={{
                                      display: "flex",
                                      justifyContent: 'center',
                                      width: '100%',
                                      flexDirection: 'row',
                                      padding: 15
                                  }}>
                                      <Button style={styles.optionsButton} mode={'contained'}
                                              onPress={() => setOpenChoices(true)}>{t('challenge-details.choose-objetives')} </Button>
                                  </View>
                              </View>
                        }
                        <Text style={styles.label}>{t('challenge-details.challenge-goals')}</Text>
                        <View>
                            <View style={styles.goalAdder}>

                                <Input
                                    placeholder={t('challenge-details.goal-placeholder')}
                                    style={[styles.inputWithIcon, {position: "absolute", bottom: keyboardShown? keyboardHeight - Dimensions.get("window").height*0.3 : 0}]}
                                    value={goal}
                                    onChangeText={t => {setGoal(t);}}
                                    inputContainerStyle={{borderBottomWidth: 0}}
                                    rightIcon={
                                        <View style={[styles.goalAdderIcon, {position: "absolute",left: Dimensions.get('window').width*0.77}]}>
                                            <Icon style={styles.icon}
                                                  name={'add-outline'}
                                                  type={'ionicon'}
                                                  color={'#fff'}
                                                  onPress={() => {
                                                      if (goal !== '') {
                                                          setGoals([...goals, {name: goal, points: 0}]);
                                                          formik.setFieldValue('challengeObjectives', [...formik.values.challengeObjectives, {name: goal, points: 0}]);
                                                          setGoal('');
                                                          setErrorMarker({title: errorMarker.title, description: errorMarker.description, goals: false, onu: errorMarker.onu})
                                                          verifyChange(true)
                                                      }
                                                  }}
                                            />
                                        </View>
                                    }
                                />
                            </View>
                            {errorMarker.goals && <Text style={[styles.label, {color: colors.error, display: "flex", flexDirection: "row", justifyContent: "center"}]}>{t('challenge-details.goal-at-least')} </Text>}
                            {goals.map((t, index) =>
                                <List.Item key={index} style={styles.listItem}
                                           title={t.name}
                                           rippleColor={'#313131'}
                                           right={props => <Icon {...props} name="close-outline" type={'ionicon'}
                                                                 onPress={() => {
                                                                    const newGoals = goals.filter(i => i.name !== t.name)
                                                                     setGoals(newGoals);
                                                                     formik.setFieldValue('challengeObjectives', newGoals);
                                                                     setErrorMarker({title: errorMarker.title, description: errorMarker.description, goals: goals.length <= 1, onu: errorMarker.onu})
                                                                     verifyChange(false)
                                                                 }}/>}
                                />)}

                        </View>
                    </View>
                }
            </View>
          </ScrollView>
        </View>
    )
}

export default ChallengeDetails;
