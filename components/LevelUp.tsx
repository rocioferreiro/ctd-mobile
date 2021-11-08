import React, {useEffect} from 'react';
import {Button, Card, useTheme} from "react-native-paper";
import {Dimensions, StyleSheet} from "react-native";
import LottieView from 'lottie-react-native';
import {View, Text} from "./Themed";
import {getUserId} from "./Storage";
import {useLazyQuery} from "@apollo/client";
import {GET_USER_LEVEL} from "./apollo-graph/Queries";
import {useTranslation} from "react-i18next";

type Props = {
    close: () => void
}

const LevelUp = (props: Props) => {
    const { colors } = useTheme();
    const {t} = useTranslation();

    const styles = StyleSheet.create({
        container: {
            height: Dimensions.get('window').height,
            paddingTop: Dimensions.get('window').height * 0.15,
            alignContent: 'center',
            alignItems: 'center'
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

    const [getUserLevel, {data: userLevelData}] = useLazyQuery(GET_USER_LEVEL);

    useEffect(() => {
        getUserId().then(id => {
            getUserLevel({variables: {targetUserId: id}})
        });
    }, []);

    return(
        <Card style={styles.container}>
            <View style={{backgroundColor: 'rgba(0,0,0,0)'}}>
                <Text style={styles.title}>{t("level-up.level-up")}</Text>
                <Text style={styles.subTitle}>{t("level-up.congratulations")}</Text>
                <Text style={styles.subTitle}>{t("level-up.level")} {userLevelData ? userLevelData.findUserById.user.level : ""}.</Text>
                <LottieView
                    style={styles.animation}
                    source={require('../assets/lottie/level-up.json')}
                    autoPlay
                    loop
                    speed={0.4}
                    resizeMode={'cover'}
                />
                <View style={styles.buttonContainer}>
                    <Button dark={false} style={styles.button} mode={'contained'} onPress={props.close}>{t("level-up.return")}</Button>
                </View>
            </View>
        </Card>

    );
}

export default LevelUp;
