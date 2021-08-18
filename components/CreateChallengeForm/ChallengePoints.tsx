import React, {useState} from "react";
import Slider from '@react-native-community/slider';
import {Badge, Card, useTheme} from "react-native-paper";
import {View,Text} from "../Themed";
import {Dimensions, StyleSheet} from "react-native";

const minPoints = 0;
const maxPoints = 1000;

const ChallengePoints = () => {
    const [value, setValue] = useState(0);
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        card: {
            width: '100%',
            minHeight: Dimensions.get('window').height * 0.74,
            padding: '3%',
            borderWidth: 0,
            backgroundColor: 'rgba(0,0,0,0)'
        },
        title: {
            fontSize: 35,
            fontWeight: 'bold',
            color: colors.primary,
            marginLeft: 5,
            marginTop: 10
        },
        subTitle: {
            fontSize: 20,
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
        }
    });

    return (
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0)'}}>
            <Card style={styles.card}>
                <Text style={styles.title}>What will you Reward?</Text>
                <Text style={styles.subTitle}>Total points for completing the challenge</Text>
                <Badge style={styles.points}>
                    {value}
                </Badge>
                    <Slider
                        step={10}
                        minimumValue={minPoints}
                        maximumValue={maxPoints}
                        aria-label="slider"
                        minimumTrackTintColor={colors.text}
                        maximumTrackTintColor={`rgba(${colors.text}, 0.5)`}
                        thumbTintColor={colors.accent}
                        onValueChange={(current) => setValue(current)}
                    />
                <View style={styles.sliderContainer}>
                    <Text style={styles.sliderText}>{minPoints}</Text>
                    <Text style={styles.sliderText}>{maxPoints}</Text>
                </View>
                <Text style={styles.subTitle}>Individual objective rewards</Text>
            </Card>
        </View>
    )
}

export default ChallengePoints;
