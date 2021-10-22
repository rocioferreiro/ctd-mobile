
import React from 'react';
import {View, Text} from "../Themed";
import {Button, Card, useTheme} from "react-native-paper";
import {Dimensions, StyleSheet} from "react-native";
import LottieView from 'lottie-react-native';
import {useTranslation} from "react-i18next";

type Props = {
    close: () => void
}

const ChallengeVerificationPage = (props: Props) => {
    const { colors } = useTheme();
    const {t, i18n} = useTranslation();

    const styles = StyleSheet.create({
        container: {
            height: Dimensions.get('window').height,
            paddingTop: Dimensions.get('window').height * 0.09,
            alignContent: 'center'
        },
        title: {
            fontSize: 25,
            fontWeight: 'bold',
            color: colors.primary,
            textAlign: 'center'

        },
        challengetitle: {
            fontSize: 25,
            fontWeight: 'normal',
            color: colors.primary,
            textAlign: 'center',
            fontStyle:'italic'

        },
        subtitle: {
            padding:3,
            paddingTop:10,
            fontSize: 23,
            fontWeight: 'bold',
            color: colors.extra,
            textAlign: 'center',
            fontStyle:'italic'

        },
        subtitle1: {
            paddingTop:10,
            fontSize: 20,
            fontWeight:'normal',
            color: colors.accent,
            textAlign: 'center'

        },
        trophy: {
            width: '100%',
            height: 320,

        },
        buttonContainer: {
            paddingTop:40,
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
                <Text style={styles.challengetitle}> Save the Turtles </Text>
                <Text style={styles.title}>{t('verification.challenge-completed')}</Text>
                <Text style={styles.subtitle}>{t('verification.you-earned')} 300 {t('verification.exp')}</Text>
                <Text style={styles.subtitle1}>{t('verification.well-done')}</Text>
                <LottieView
                    style={styles.trophy}
                    source={require('../../assets/lottie/67230-trophy-winner.json')}
                    autoPlay
                    loop
                    speed={1}
                    resizeMode={'contain'}
                />
                <View style={styles.buttonContainer}>
                    <Button dark={false} style={styles.button} mode={'contained'} onPress={props.close}>{t('verification.return')}</Button>
                </View>
            </View>
        </Card>

    );
}

export default ChallengeVerificationPage;



