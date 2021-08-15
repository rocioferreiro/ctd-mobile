import React from 'react';
import {View, Text} from "../Themed";
import {Button, Card, useTheme} from "react-native-paper";
import {StyleSheet} from "react-native";

const ChallengeCreationSuccessful = () => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        title: {
            fontSize: 35,
            fontWeight: 'bold',
            color: colors.primary,
            marginLeft: 25,
            marginTop: -10,
        },
    });

    return(
        <View>
            <Card>
                <Text style={styles.title}>Challenge created!</Text>
                <Button>Return</Button>
            </Card>
        </View>
    );
}

export default ChallengeCreationSuccessful;
