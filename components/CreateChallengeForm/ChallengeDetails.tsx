import React from "react";

import {Button, Card, TextInput, useTheme, List} from "react-native-paper";
import {View, Text, StyleSheet, Image, Dimensions, ImageBackground} from "react-native";
import OnuObjectiveChoice from "./onuObjectiveChoice";
import {Icon} from "react-native-elements";
import {colorShade} from "../Models/shadingColor";
const onuBanner = require(`../../assets/images/onubanner.jpeg`)

const ChallengeDetails = () => {
  const { colors } = useTheme();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [goal, setGoal] = React.useState('');
  const [goals, setGoals] = React.useState<string[]>([])
  const [onuObjectives, setOnuObjectives] = React.useState([]);
  const [openChoices, setOpenChoices] = React.useState(false);

  const styles = StyleSheet.create({
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      color: colors.primary,
      marginLeft: 5,
      marginTop: -20,
    },
    card: {
      width: '100%',
      minHeight: Dimensions.get('window').height * 0.74,
      padding: '3%',
      borderWidth: 0,
      backgroundColor: 'rgba(0,0,0,0)'
    },
    input: {
      marginTop: 5,
      width: '100%',
      backgroundColor: colorShade(colors.surface, -10),
      fontSize: 20
    },
    inputWithIcon: {
      width: '85%',
      backgroundColor: colorShade(colors.surface, -10),
      fontSize: 20
    },
    goalAdder: {
      marginTop: 5,
      display: "flex",
      flexWrap: "wrap",
      flexDirection:"row"
    },
    goalAdderIcon: {
      marginTop: '2.5%',
      display: "flex",
      justifyContent:"center",
      width: 40,
      height: 40,
      borderRadius: 50,
      backgroundColor: colors.primary,
      marginLeft: 10,
    },
    icon: {
      textAlign: 'center',
    },
    button: {
      width: '60%',
      justifyContent: 'center',
      display: 'flex',
      marginTop: 10,
      marginBottom: 10,
      marginRight: 'auto',
      marginLeft: 'auto'
    },
    banner: {
      width: Dimensions.get('window').width * 0.7,
      resizeMode: "contain",
      height: Dimensions.get('window').height * 0.17
    },
    imageButton: {
      width: '100%',
      height: Dimensions.get('window').height * 0.17,
      justifyContent: 'center',
      display: 'flex',
      marginTop: 10,
      marginBottom: 10,
      marginRight: 'auto',
      marginLeft: 'auto',
      backgroundColor: 'rgba(0,0,0,0)'
    },
    listItem: {
      backgroundColor: colors.accent,
      width: '90%',
      borderRadius: 20,
      marginTop: 10,
      marginLeft: 10,
      marginRight:10
    }
  });


  return (
    <View style={{flex: 1}}>
      <Card style={styles.card}>
        <Text style={styles.title}>Create a new Challenge!</Text>

        <TextInput
            label="Challenge Title"
            style={styles.input}
            value={title}
            onChangeText={title => setTitle(title)}
        />

        <TextInput
          label="Challenge Description"
          style={[styles.input, {height: Dimensions.get("window").height * 0.12}]}
          value={description}
          multiline={true}
          onChangeText={description => setDescription(description)}
        />

        <Button style={openChoices ? styles.button : styles.imageButton} mode={'contained'} onPress={() => setOpenChoices(!openChoices)}> {openChoices ?
          'Close Options' :
          <Image source={onuBanner} style={styles.banner}/>}</Button>
        {openChoices && <OnuObjectiveChoice selected={onuObjectives} setSelected={setOnuObjectives}/>}

        {!openChoices &&
          <View>
            <View style={styles.goalAdder}>
              <TextInput
                label="Challenge Goal"
                style={styles.inputWithIcon}
                value={goal}
                onChangeText={t => setGoal(t)}
              />
              <View style={styles.goalAdderIcon}>
                <Icon style={styles.icon} name={'add-outline'} type={'ionicon'} color={'#fff'} onPress={() => {
                  if(goal !== '') {
                    setGoals([...goals, goal])
                    setGoal('')
                  }
                }} />
              </View>
            </View>

            {goals.map((t,index) =>
              <List.Item key={index} style={styles.listItem}
              title={t}
              rippleColor={'#313131'}
              right={props => <Icon {...props} name="trash-outline" type={'ionicon'} onPress={() => setGoals(goals.filter(i => i !== t))} />}
              />)}

          </View>
        }
      </Card>
    </View>
  )
}

export default ChallengeDetails;
