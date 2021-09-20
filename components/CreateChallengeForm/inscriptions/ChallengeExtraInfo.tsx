import React, {useEffect} from "react";
import {Card, useTheme} from "react-native-paper";
import {View} from "../../Themed";
import ImagePicker from "./ImagePicker";
import DatePicker from "./DatePicker";
import {Dimensions, StyleSheet, Text} from "react-native";
import {Icon, Input} from "react-native-elements";
import {useTranslation} from "react-i18next";

type Props = {
  formik: any
  setDisabled: (boolean) => void
}

const ChallengeExtraInfo = (props: Props) => {
  const {t, i18n} = useTranslation();
  const [language, setLanguage] = React.useState(i18n.language);
  const {colors} = useTheme()
  const [openInscriptionCalendar, setOpenInscriptionCalendar] = React.useState(false)
  const [openChallengeCalendar, setOpenChallengeCalendar] = React.useState(false)
  const [image, setImage] = React.useState(null)
  const [errorIns, setErrorIns] = React.useState(false)
  const [errorCh, setErrorCh] = React.useState(false)

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
      marginBottom: 5,
      fontSize: 20
    },
    input: {
      backgroundColor: colors.surface,
      fontSize: 15,
      borderRadius: 30,
      padding: 5,
      paddingLeft: 10,
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.5,
      shadowColor: '#DAB99D',
      elevation: 4,
      margin: 0,
      opacity:1
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

  const addDays = (days : number, date): Date => {
    var futureDate = new Date(date);
    futureDate.setDate(futureDate. getDate() + days);
    return futureDate;
  }

  const verifyErrors = () => {
    if(addDays(7, props.formik.values.inscriptionsFrom).getTime() > new Date(props.formik.values.inscriptionsTo).getTime()){
      setErrorIns(true)
      props.setDisabled(true)
    } else {
      setErrorIns(false)
      props.setDisabled(false)
    }
    if(addDays(2, props.formik.values.inscriptionsTo).getTime() > new Date(props.formik.values.startsFrom).getTime()) {
      setErrorCh(true)
      props.setDisabled(true)
    } else {
      setErrorCh(false)
      props.setDisabled(false)
    }

    if(!image) props.setDisabled(true)

  }
  useEffect(() => {
    verifyErrors()
  }, [])

  useEffect(() => {
    verifyErrors()
  }, [openInscriptionCalendar, openChallengeCalendar, image])

  return (
    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0)'}}>
      <View style={styles.card}>
        <View style={{backgroundColor: 'rgba(0,0,0,0)'}}>
          <Text style={styles.title}>{t('challenge-extra-info.when-will-challenge')}</Text>

          <Text style={styles.label}>{t('challenge-extra-info.inscriptions-open')}</Text>
          <Text style={{color: errorIns ? colors.error : colors.primary, marginLeft: 5, marginBottom: 10}}>{t('challenge-extra-info.at-least-week')}</Text>

          <View style={{backgroundColor: 'rgba(0,0,0,0)', display: 'flex', flexDirection:'row'}}>
            <View style={{backgroundColor: 'rgba(0,0,0,0)', display: 'flex', flexDirection:'column', justifyContent:"space-evenly", marginLeft: 30,}}>
              <Text style={{color: colors.primary, marginTop:-20}}>{t('challenge-extra-info.from')}</Text>
              <Text style={{color: colors.primary}}> {t('challenge-extra-info.to')}</Text>
            </View>

            <View style={{backgroundColor: 'rgba(0,0,0,0)', display: 'flex', flexDirection:'column'}}>
              <Input
                style={styles.input}
                value={props.formik.values.inscriptionsFrom.toDateString()}
                inputContainerStyle={{borderBottomWidth: 0, width: (Dimensions.get("window").width*0.5)}}
              />
              <Input
                style={styles.input}
                value={props.formik.values.inscriptionsTo.toDateString()}
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

          <Text style={styles.label}>{t('challenge-extra-info.challenge-active')}</Text>
          {errorCh && <Text style={{color: colors.error, marginLeft: 5, marginBottom: 10}}> {t('challenge-extra-info.select-valid-date')} </Text>}

          <View style={{backgroundColor: 'rgba(0,0,0,0)', display: 'flex', flexDirection:'row'}}>
            <View style={{backgroundColor: 'rgba(0,0,0,0)', display: 'flex', flexDirection:'column', justifyContent:"space-evenly", marginLeft: 30,}}>
              <Text style={{color: colors.primary, marginTop:-20}}> {t('challenge-extra-info.from')}</Text>
              <Text style={{color: colors.primary}}> {t('challenge-extra-info.to')}</Text>
            </View>

            <View style={{backgroundColor: 'rgba(0,0,0,0)', display: 'flex', flexDirection:'column'}}>
              <Input
                style={styles.input}
                value={props.formik.values.startsFrom.toDateString()}
                disabled={true}
                inputContainerStyle={{borderBottomWidth: 0, width: (Dimensions.get("window").width*0.5)}}
              />
              <Input
                style={styles.input}
                value={props.formik.values.finishesOn.toDateString()}
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

        <Text style={styles.label}>{t('challenge-extra-info.upload-image')}</Text>
        <ImagePicker image={image} setImage={setImage}/>
      </View>

      <DatePicker startDate={props.formik.values.inscriptionsFrom} setStartDate={date => {props.formik.setFieldValue('inscriptionsFrom', date)}} close={() => setOpenInscriptionCalendar(false)}
                  endDate={props.formik.values.inscriptionsTo} setEndDate={date => {props.formik.setFieldValue('inscriptionsTo', date)}} open={openInscriptionCalendar}/>
      <DatePicker startDate={props.formik.values.startsFrom} setStartDate={date => {props.formik.setFieldValue('startsFrom', date)}} close={() => setOpenChallengeCalendar(false)}
                    endDate={props.formik.values.finishesOn} setEndDate={date => {props.formik.setFieldValue('finishesOn', date)}} open={openChallengeCalendar} minDate={addDays(3,props.formik.values.inscriptionsTo)}/>

    </View>
  )
}

export default ChallengeExtraInfo;
