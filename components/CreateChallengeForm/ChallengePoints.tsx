import React, {useState} from "react";
import Slider from '@react-native-community/slider';
import {Badge, Card, IconButton, useTheme} from "react-native-paper";
import {View, Text} from "../Themed";
import {Dimensions, StyleSheet, TextInput} from "react-native";

type Props = {
    formik: any
}

const minPoints = 0;
const maxPoints = 1000;

const ChallengePoints = (props: Props) => {
    const [totalPoints, setTotalPoints] = useState(0);
    const [objectivePoints, setObjectivePoints] = useState("0");
    const {colors} = useTheme();

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

    const onInputChanged = (value) => {
        if (!value) setObjectivePoints("0");
        const newValue = parseInt(value);
        if (newValue && newValue <= maxPoints && newValue >= minPoints) {
            setObjectivePoints(`${newValue}`)
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0)'}}>
            <Card style={styles.card}>
                <Text style={styles.title}>How many points will you Reward?</Text>
                <Text style={styles.subTitle}>Total points for completing the challenge</Text>
                <Badge style={styles.points}>
                    {totalPoints}
                </Badge>
                <Slider
                    step={10}
                    minimumValue={minPoints}
                    maximumValue={maxPoints}
                    aria-label="slider"
                    minimumTrackTintColor={colors.primary}
                    maximumTrackTintColor={`rgba(${colors.primary}, 0.5)`}
                    thumbTintColor={colors.accent}
                    onValueChange={(current) => setTotalPoints(current)}
                />
                <View style={styles.sliderContainer}>
                    <Text style={styles.sliderText}>{minPoints}</Text>
                    <Text style={styles.sliderText}>{maxPoints}</Text>
                </View>
                <Text style={styles.subTitle}>Individual objective rewards</Text>
                <View style={styles.objectivesContainer}>
                    <View style={styles.objective}>
                        <Text style={styles.objectiveText}>Objective 1</Text>
                        <View style={styles.objectivePointsInput}>
                            <TextInput keyboardType={"numeric"} value={objectivePoints} onChangeText={onInputChanged}
                                       style={{fontSize: 14, color: colors.primary, fontWeight: "bold"}}/>
                            <View style={styles.buttonsContainer}>
                                <IconButton
                                    icon="minus"
                                    color={colors.primary}
                                    size={30}
                                    onPress={() => onInputChanged(`${parseInt(objectivePoints) - 1}`)}
                                    style={{padding: 0, margin: 0, marginRight: -10}}
                                />
                                <IconButton
                                    icon="plus"
                                    color={colors.primary}
                                    size={30}
                                    onPress={() => onInputChanged(`${parseInt(objectivePoints) + 1}`)}
                                    style={{padding: 0, margin: 0}}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Card>
        </View>
    )
}

export default ChallengePoints;
