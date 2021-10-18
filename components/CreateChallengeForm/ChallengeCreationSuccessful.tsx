import React from 'react';
import {View, Text} from "../Themed";
import {Button, Card, useTheme} from "react-native-paper";
import {Dimensions, StyleSheet} from "react-native";
import LottieView from 'lottie-react-native';

type Props = {
    close: () => void
}

const ChallengeCreationSuccessful = (props: Props) => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            height: Dimensions.get('window').height,
            paddingTop: Dimensions.get('window').height * 0.2,
            alignContent: 'center'
        },
        title: {
            fontSize: 35,
            fontWeight: 'bold',
            color: colors.primary,
            textAlign: 'center'

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
        <Card style={styles.container}>
            <View style={{backgroundColor: 'rgba(0,0,0,0)'}}>
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
                    <Button dark={false} style={styles.button} mode={'contained'} onPress={props.close}>Return</Button>
                </View>
            </View>
        </Card>

    );
}

export default ChallengeCreationSuccessful;
