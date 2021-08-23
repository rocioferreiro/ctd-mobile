import React, {useEffect, useState} from "react";
import Slider from '@react-native-community/slider';
import {Badge, Card, IconButton, useTheme} from "react-native-paper";
import {View, Text} from "../Themed";
import {Dimensions, StyleSheet, TextInput} from "react-native";
import {ChallengeObjective} from "./Types";
import {useLazyQuery} from "@apollo/client";
import Toast from "react-native-toast-message";
import {GET_SCORE} from "../apollo-graph/Queries";

type Props = {
    formik: any
}

const minPoints = 0;
const maxPoints = 1000;

const ChallengePoints = (props: Props) => {

    function toastOn() {
        Toast.show({
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Review previews fields',
            topOffset: Dimensions.get("window").height * 0.05,
        });
    }

    const parseChallenge = (challenge) => {
        return {
            "startEvent":'',
            "endEvent": '',
            "startInscription": '',
            "endInscription": '',
            "owner": "",
            "categories": challenge.ONUObjective,
            "objectives": challenge.challengeObjectives,
            "coordinates": {
                "latitude": 0,
                "longitude": 0
            }
        }
    }

    const [totalPoints, setTotalPoints] = useState(0);
    const [objectivePoints, setObjectivePoints] = useState("0");
    const {colors} = useTheme();

    const [getScore, {data: resultedPoints}] = useLazyQuery(GET_SCORE, {
        variables: {newChallenge: parseChallenge(props.formik.values)},
        onError: () => {
            toastOn();
        }
    });

    useEffect(() => {
        getScore()
    }, [])

    useEffect(() => {
        if(resultedPoints){
            console.log(resultedPoints)
            setTotalPoints(parseInt(resultedPoints.getSuggestedScore))
        }
    }, [resultedPoints])

    const styles = StyleSheet.create({
        card: {
            width: '100%',
            minHeight: Dimensions.get('window').height * 0.74,
            padding: '3%',
            borderWidth: 0,
            backgroundColor: 'rgba(0,0,0,0)'
        },
        title: {
            fontSize: 30,
            fontWeight: 'bold',
            color: colors.primary,
            marginLeft: 5,
            marginTop: 10
        },
        subTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.primary,
            marginLeft: 5,
            marginTop: 20,
            marginBottom: 20
        },
        points: {
            minWidth: 50,
            minHeight: 30,
            borderRadius: 50,
            backgroundColor: colors.accent,
            alignSelf: "center",
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.primary,
            marginBottom: 10
        },
        sliderContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            flexDirection: "row",
            justifyContent: "space-between"
        },
        sliderText: {
            fontSize: 12,
            fontWeight: 'bold',
            color: colors.primary,
        },
        objectivesContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            paddingLeft: 50,
            paddingRight: 50,
        },
        objective: {
            backgroundColor: 'rgba(0,0,0,0)',
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        objectiveText: {
            fontSize: 18,
            color: colors.primary,
        },
        objectivePointsInput: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: colors.primary,
            opacity: 0.5,
            width: 150,
            height: 40,
            borderRadius: 50,
            paddingLeft: 15
        },
        buttonsContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            flexDirection: "row",
        }
    });

    const onInputChanged = (value, objective: ChallengeObjective) => {
        if (!value) {
            setObjectivePoints("0");
            const currentObjectives = [...props.formik.values.challengeObjectives];
            const changedObjective = currentObjectives.find(o => o.name == objective.name);
            changedObjective.points = '0';
            props.formik.setFieldValue('challengeObjectives', currentObjectives);
        }
        const newValue = parseInt(value);
        if (newValue && newValue <= maxPoints && newValue >= minPoints) {
            setObjectivePoints(`${newValue}`);
            const currentObjectives = [...props.formik.values.challengeObjectives];
            const changedObjective = currentObjectives.find(o => o.name == objective.name);
            changedObjective.points = `${newValue}`;
            props.formik.setFieldValue('challengeObjectives', currentObjectives);
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0)'}}>
            <Card style={styles.card}>
                <Text style={styles.title}>How many points will you Reward?</Text>
                <Text style={styles.subTitle}>Total points for completing the challenge</Text>
                <Badge style={styles.points} size={50}>
                    {totalPoints}
                </Badge>
                <Slider
                    step={10}
                    minimumValue={minPoints}
                    maximumValue={maxPoints}
                    value={totalPoints}
                    aria-label="slider"
                    minimumTrackTintColor={colors.primary}
                    maximumTrackTintColor={`rgba(${colors.primary}, 0.5)`}
                    thumbTintColor={colors.accent}
                    onValueChange={(current) => {
                        props.formik.setFieldValue('totalPoints', current);
                        setTotalPoints(current);
                    }}
                />
                <View style={styles.sliderContainer}>
                    <Text style={styles.sliderText}>{minPoints}</Text>
                    <Text style={styles.sliderText}>{maxPoints}</Text>
                </View>
                <Text style={styles.subTitle}>Individual objective rewards</Text>
                <View style={styles.objectivesContainer}>
                    {props.formik.values.challengeObjectives.map((objective: ChallengeObjective, index) => {
                        return (
                            <View key={index} style={styles.objective}>
                                <Text style={styles.objectiveText}>{objective.name}</Text>
                                <View style={styles.objectivePointsInput}>
                                    <TextInput keyboardType={"numeric"} value={'' + objective.points}
                                               onChangeText={(value) => onInputChanged(value, objective)}
                                               style={{fontSize: 14, color: colors.primary, fontWeight: "bold"}}/>
                                    <View style={styles.buttonsContainer}>
                                        <IconButton
                                            icon="minus"
                                            color={colors.primary}
                                            size={30}
                                            onPress={() => onInputChanged(`${parseInt(objectivePoints) - 1}`, objective)}
                                            style={{padding: 0, marginRight: -10}}
                                        />
                                        <IconButton
                                            icon="plus"
                                            color={colors.primary}
                                            size={30}
                                            onPress={() => onInputChanged(`${parseInt(objectivePoints) + 1}`, objective)}
                                            style={{padding: 0}}
                                        />
                                    </View>
                                </View>
                            </View>)
                    })}
                </View>
            </Card>
        </View>
    )
}

export default ChallengePoints;
