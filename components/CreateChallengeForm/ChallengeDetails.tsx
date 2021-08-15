import React from "react";

import {Button, Card, Checkbox, TextInput, useTheme} from "react-native-paper";
import {View, Text, StyleSheet, Image, CheckBox, TouchableWithoutFeedback} from "react-native";
import {ONUObjectives} from "./ONUObjectives";
const obj1 = require(`../../assets/images/objetive1.png`)
const obj2 = require(`../../assets/images/objetive2.png`)
const obj3 = require(`../../assets/images/objetive3.png`)
const obj4 = require(`../../assets/images/objetive4.png`)
const obj5 = require(`../../assets/images/objetive5.png`)
const obj6 = require(`../../assets/images/objetive6.png`)
const obj7 = require(`../../assets/images/objetive7.png`)
const obj8 = require(`../../assets/images/objetive8.png`)
const obj9 = require(`../../assets/images/objetive9.png`)
const obj10 = require(`../../assets/images/objetive10.png`)
const obj11 = require(`../../assets/images/objetive11.png`)
const obj12 = require(`../../assets/images/objetive12.png`)
const obj13 = require(`../../assets/images/objetive13.png`)
const obj14 = require(`../../assets/images/objetive14.png`)
const obj15 = require(`../../assets/images/objetive15.png`)
const obj16 = require(`../../assets/images/objetive16.png`)
const obj17 = require(`../../assets/images/objetive17.png`)

const ChallengeDetails = () => {
  const { colors } = useTheme();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [onuObjectives, setOnuObjectives] = React.useState([]);
  const onuPictures = [obj1, obj2, obj3, obj4, obj5, obj6, obj7, obj8, obj9, obj10, obj11, obj12, obj13, obj14, obj15, obj16, obj17]

  const styles = StyleSheet.create({
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      color: colors.primary,
      marginLeft: 5,
      marginTop: -22,
    },
    card: {
      width: '100%',
      height: 500,
      padding: '3%',
    },
    input: {
      marginTop: 5,
      width: '100%',
      backgroundColor: colors.surface
    },
    image: {
      width: 70,
      height: 70,
    },
    imageWrapperChecked: {
      borderColor: 'rgb(243,117,122)',
      borderStyle: 'solid',
      borderWidth:  5,
      width: 80,
      height: 80,
    },
    imageWrapper: {
      width: 80,
      height: 80,
    }
  });


  return (
    <View>
      <Card style={styles.card}>
        <Text style={styles.title}> Create a new Challenge! </Text>

        <TextInput
            label="Challenge Title"
            style={styles.input}
            value={title}
            onChangeText={title => setTitle(title)}
        />

        <TextInput
          label="Challenge Description"
          style={styles.input}
          value={description}
          multiline={true}
          onChangeText={description => setDescription(description)}
        />

        <View style={{display: 'flex'}}>
          {Object.keys(ONUObjectives).map((o, index) => {
            return <TouchableWithoutFeedback
              key={index}
              onPress={() => {

              }}>
              <View style={styles.imageWrapper}>
                <Image
                  style={styles.image}
                  source={onuPictures[index]}
                />
              </View>
            </TouchableWithoutFeedback>
          })}

        </View>



      </Card>
    </View>
  )
}

export default ChallengeDetails;
