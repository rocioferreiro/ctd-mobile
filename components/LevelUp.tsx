import React from 'react';
import {Button, Card, useTheme} from "react-native-paper";
import {Dimensions, StyleSheet} from "react-native";
import LottieView from 'lottie-react-native';
import {View, Text} from "./Themed";

type Props = {
    close: () => void
}

const LevelUp = (props: Props) => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            height: Dimensions.get('window').height,
            paddingTop: Dimensions.get('window').height * 0.15,
            alignContent: 'center',
        },
        title: {
            fontSize: 42,
            fontWeight: 'bold',
            color: colors.accent,
            textAlign: 'center',
            marginBottom: 15
        },
        subTitle: {
            fontSize: 32,
            fontWeight: 'bold',
            color: colors.primary,
            textAlign: 'center'
        },
        animation: {
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
                <Text style={styles.title}>LEVEL UP!</Text>
                <Text style={styles.subTitle}>Congratulations!</Text>
                <Text style={styles.subTitle}>You are now level 4.</Text>
                <LottieView
                    style={styles.animation}
                    source={require('../assets/lottie/level-up.json')}
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

export default LevelUp;
