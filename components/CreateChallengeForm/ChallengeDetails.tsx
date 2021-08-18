import React from "react";

import {Button, Card, useTheme, List} from "react-native-paper";
import {View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Image} from "react-native";
import OnuObjectiveChoice from "./onuObjectiveChoice";
import {Icon, Input} from "react-native-elements";
import {ONUObjectives} from "./ONUObjectives";
import {colorShade} from "../Models/shadingColor";

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
      backgroundColor: colors.surface,
      fontSize: 20,
      borderRadius: 30,
      padding: 15,
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.5,
      shadowColor: '#DAB99D',
      elevation: 4
    },
    inputWithIcon: {
      width: '85%',
      backgroundColor: colors.surface,
      fontSize: 20,
      borderRadius: 30,
      padding: 10,
    },
    goalAdder: {
      marginTop: 5,
      display: "flex",
      flexWrap: "wrap",
      flexDirection:"row"
    },
    goalAdderIcon: {
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
    optionsButton: {
      width: Dimensions.get('window').width * 0.5,
      height: Dimensions.get('window').height * 0.05,
      borderRadius: 40,
      backgroundColor: colors.accent,
      textAlign: "center",
      justifyContent: "center",
      marginBottom: 10
    },
    editOptionsButton: {
      width: Dimensions.get('window').width * 0.4,
      height: Dimensions.get('window').height * 0.04,
      borderRadius: 30,
      backgroundColor: colorShade(colors.accent, 5),
      textAlign: "center",
      justifyContent: "center",
      marginBottom: 10
    },
    listItem: {
      backgroundColor: colors.surface,
      width: '90%',
      borderRadius: 20,
      marginTop: 10,
      marginLeft: 10,
      marginRight:10,
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.5,
      shadowColor: '#DAB99D',
      elevation: 3
    },
    label: {
      fontWeight: "bold",
      color: colors.primary,
      marginLeft: 5,
      fontSize: 20
    }
  });


  return (
    <View style={{flex: 1}}>
      <Card style={styles.card}>
        {openChoices ?
          <OnuObjectiveChoice selected={onuObjectives} setSelected={setOnuObjectives} setOpen={setOpenChoices}/> :

          <View>
            <Text style={styles.title}>Create a new Challenge!</Text>

            <Input
              placeholder={"Challenge Title"}
              style={styles.input}
              value={title}
              onChangeText={title => setTitle(title)}
              inputContainerStyle={{borderBottomWidth: 0}}
            />

            <Input
              placeholder={"Challenge Description"}
              style={[styles.input, {height: Dimensions.get("window").height * 0.12, paddingTop: 20}]}
              value={description}
              onChangeText={t => setDescription(t)}
              multiline={true}
              inputContainerStyle={{borderBottomWidth: 0}}
            />

            <Text style={styles.label}> Sustainable objectives </Text>
            {onuObjectives.length > 0 ?
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: "center", paddingHorizontal: 10, paddingTop: 10}}>
                  {onuObjectives.map((s, index) => {
                    return <TouchableWithoutFeedback key={index}>
                      <Image style={{width: 50, height: 50, borderRadius: 25, marginHorizontal:10}} source={s.image}/>
                    </TouchableWithoutFeedback>
                  })}
                </View>
                <View style={{display: "flex", justifyContent: 'center', width:'100%', flexDirection: 'row', padding: 15}}>
                  <Button style={styles.editOptionsButton} mode={'contained'} onPress={() => setOpenChoices(true)}> Edit objectives </Button>
                </View>
              </View> :
              <View style={{display: "flex", justifyContent: 'center', width:'100%', flexDirection: 'row', padding: 15}}>
                <Button style={styles.optionsButton} mode={'contained'} onPress={() => setOpenChoices(true)}> Choose objectives </Button>
              </View>
            }
            <Text style={styles.label}> Challenge Goals </Text>
            <View>
                <View style={styles.goalAdder}>

                    <Input
                      placeholder={"Goal..."}
                      style={styles.inputWithIcon}
                      value={goal}
                      onChangeText={t => setGoal(t)}
                      inputContainerStyle={{borderBottomWidth: 0}}
                      rightIcon={
                        <View style={styles.goalAdderIcon}>
                        <Icon style={styles.icon} name={'add-outline'} type={'ionicon'} color={'#fff'} onPress={() => {
                          if(goal !== '') {
                            setGoals([...goals, goal])
                            setGoal('')
                          }
                        }} />
                        </View>
                      }
                    />
                </View>
              {goals.map((t,index) =>
                <List.Item key={index} style={styles.listItem}
                           title={t}
                           rippleColor={'#313131'}
                           right={props => <Icon {...props} name="close-outline" type={'ionicon'} onPress={() => setGoals(goals.filter(i => i !== t))} />}
                />)}

            </View>
          </View>
        }
      </Card>
    </View>
  )
}

export default ChallengeDetails;
