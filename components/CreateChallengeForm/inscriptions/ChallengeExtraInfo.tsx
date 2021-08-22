import React from "react";
import {Card, useTheme} from "react-native-paper";
import {View} from "../../Themed";
import ImagePicker from "./ImagePicker";
import DatePicker from "./DatePicker";
import {Dimensions, StyleSheet, Text} from "react-native";
import {Icon, Input} from "react-native-elements";
import moment from "moment";

const ChallengeExtraInfo = () => {
  const {colors} = useTheme()
  const [startInscriptionDate, setStartInscriptionDate] = React.useState(moment().toString())
  const [startChallengeDate, setStartChallengeDate] = React.useState(moment().toString())
  const [endInscriptionDate, setEndInscriptionDate] = React.useState(moment().toString())
  const [endChallengeDate, setEndChallengeDate] = React.useState(moment().toString())
  const [openInscriptionCalendar, setOpenInscriptionCalendar] = React.useState(false)
  const [openChallengeCalendar, setOpenChallengeCalendar] = React.useState(false)

  const styles = StyleSheet.create({
    container: {
      margin: 50,
    },
    card: {
      width: '100%',
      minHeight: Dimensions.get('window').height * 0.74,
      padding: '3%',
      borderWidth: 0,
      backgroundColor: 'rgba(0,0,0,0)'
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      color: colors.primary,
      marginLeft: 5,
      marginTop: -20,
    },
    label: {
      fontWeight: "bold",
      color: colors.primary,
      marginLeft: 5,
      marginTop: 10,
      marginBottom: 15,
      fontSize: 20
    },
    input: {
      backgroundColor: colors.surface,
      fontSize: 15,
      borderRadius: 30,
      padding: 5,
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.5,
      shadowColor: '#DAB99D',
      elevation: 4,
      margin: 0
    },
    goalAdderIcon: {
      display: "flex",
      justifyContent:"center",
      width: 40,
      height: 40,
      borderRadius: 50,
      backgroundColor: colors.accent,
    },
    icon: {
      textAlign: 'center',
    },
  });

  return (
    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0)'}}>
      {(!openChallengeCalendar && !openInscriptionCalendar) &&
      <Card style={styles.card}>
        <View style={{backgroundColor: 'rgba(0,0,0,0)'}}>
          <Text style={styles.title}>When will your challenge be?</Text>

          <Text style={styles.label}>Inscriptions open</Text>

          <View style={{backgroundColor: 'rgba(0,0,0,0)', display: 'flex', flexDirection:'row'}}>
            <View style={{backgroundColor: 'rgba(0,0,0,0)', display: 'flex', flexDirection:'column', justifyContent:"space-evenly", marginLeft: 30,}}>
              <Text style={{color: colors.primary, marginTop:-20}}> From</Text>
              <Text style={{color: colors.primary}}> To</Text>
            </View>

            <View style={{backgroundColor: 'rgba(0,0,0,0)', display: 'flex', flexDirection:'column'}}>
              <Input
                style={styles.input}
                value={startInscriptionDate.toString()}
                disabled={true}
                inputContainerStyle={{borderBottomWidth: 0, width: (Dimensions.get("window").width*0.5)}}
              />
              <Input
                style={styles.input}
                value={endInscriptionDate.toString()}
                disabled={true}
                inputContainerStyle={{borderBottomWidth: 0, margin: 0, width: (Dimensions.get("window").width*0.5)}}
              />
            </View>

            <View style={{backgroundColor: 'rgba(0,0,0,0)', display: 'flex', flexDirection:'column', justifyContent:"center"}}>
              <View style={[styles.goalAdderIcon, {marginTop: -20}]}>
                <Icon style={styles.icon} name={'calendar-outline'} type={'ionicon'} color={'#fff'} onPress={() => {
                  setOpenInscriptionCalendar(true)
                }} />
              </View>
            </View>

          </View>

          <Text style={styles.label}>Challenge is active</Text>

          <View style={{backgroundColor: 'rgba(0,0,0,0)', display: 'flex', flexDirection:'row'}}>
            <View style={{backgroundColor: 'rgba(0,0,0,0)', display: 'flex', flexDirection:'column', justifyContent:"space-evenly", marginLeft: 30,}}>
              <Text style={{color: colors.primary, marginTop:-20}}> From</Text>
              <Text style={{color: colors.primary}}> To</Text>
            </View>

            <View style={{backgroundColor: 'rgba(0,0,0,0)', display: 'flex', flexDirection:'column'}}>
              <Input
                style={styles.input}
                value={startChallengeDate.toString()}
                disabled={true}
                inputContainerStyle={{borderBottomWidth: 0, width: (Dimensions.get("window").width*0.5)}}
              />
              <Input
                style={styles.input}
                value={endChallengeDate.toString()}
                disabled={true}
                inputContainerStyle={{borderBottomWidth: 0, margin: 0, width: (Dimensions.get("window").width*0.5)}}
              />
            </View>

            <View style={{backgroundColor: 'rgba(0,0,0,0)', display: 'flex', flexDirection:'column', justifyContent:"center"}}>
              <View style={[styles.goalAdderIcon, {marginTop: -20}]}>
                <Icon style={styles.icon} name={'calendar-outline'} type={'ionicon'} color={'#fff'} onPress={() => {
                  setOpenChallengeCalendar(true)
                }} />
              </View>
            </View>


          </View>


        </View>

        <Text style={styles.label}>Upload Image</Text>
        <ImagePicker/>
      </Card>
      }

      <DatePicker startDate={startInscriptionDate} setStartDate={setStartInscriptionDate} close={() => setOpenInscriptionCalendar(false)}
                  endDate={endInscriptionDate} setEndDate={setEndInscriptionDate} open={openInscriptionCalendar}/>
      <DatePicker startDate={startChallengeDate} setStartDate={setStartChallengeDate} close={() => setOpenChallengeCalendar(false)}
                    endDate={endChallengeDate} setEndDate={setEndChallengeDate} open={openChallengeCalendar}/>

    </View>
  )
}

export default ChallengeExtraInfo;
