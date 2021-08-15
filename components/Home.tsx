import React from "react";
import {View, Text} from "./Themed";
import Stepper from "./CreateChallengeForm/Stepper";
import {Card} from "react-native-paper";
import {Dimensions} from "react-native";

const Home = () => {
    return (
        <View>
            <Card style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
            }}>
                <Text> Home Screen </Text>
                <Stepper/>
            </Card>
        </View>
    )
}

export default Home;
