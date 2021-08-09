import React from "react";
import {View, Text} from "./Themed";
import MyStepper from "./CreateChallengeForm/MyStepper";
import {Card} from "react-native-paper";

const Home = () => {
  return (
    <View>
        <Card style={{width:300,height:600}}>
      <Text> Home Screen </Text>
        <MyStepper></MyStepper>
        </Card>
    </View>
  )
}

export default Home;
