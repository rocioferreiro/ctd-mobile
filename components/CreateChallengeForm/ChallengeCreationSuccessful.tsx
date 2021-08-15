import React from 'react';
import {View, Text} from "../Themed";
import {Button, Card, useTheme} from "react-native-paper";
import {StyleSheet} from "react-native";
import LottieView from 'lottie-react-native';

const ChallengeCreationSuccessful = () => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        title: {
            fontSize: 35,
            fontWeight: 'bold',
            color: colors.primary,
            marginLeft: 25,
        },
        checkmark: {
            width: '100%',
            height: 400,
        },
        buttonContainer: {
            justifyContent: "center",
            width: '100%',
            alignItems: "center",
            backgroundColor: 'rgba(0,0,0,0)'
        },
        button: {
            width: '30%',
            backgroundColor: colors.accent,
            borderRadius: 30
        }
    });

    return(
        <View>
            <Card>
                <Text style={styles.title}>Challenge created!</Text>
                <LottieView
                    style={styles.checkmark}
                    source={require('../../assets/lottie/checkmark.json')}
                    autoPlay
                    loop
                    speed={0.4}
                    resizeMode={'cover'}
                />
                <View style={styles.buttonContainer}>
                    <Button dark={false} style={styles.button} mode={'contained'}>Return</Button>
                </View>
            </Card>
        </View>
    );
}

export default ChallengeCreationSuccessful;
