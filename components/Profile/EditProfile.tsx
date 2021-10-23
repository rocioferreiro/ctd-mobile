import React, {useEffect, useState} from "react";
import {Dimensions, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {Button, IconButton, List, useTheme} from "react-native-paper";
import {useLazyQuery} from "@apollo/client";
import {NEW_FIND_USER_BY_ID} from "../apollo-graph/Queries";
import {getToken, getUserId} from "../Storage";
import {useFormik} from "formik";
import {Gender, UserForEdition} from "../Models/User";
import {colorShade} from "../Models/shadingColor";
import {Icon, Input} from "react-native-elements";
import {useTranslation} from "react-i18next";
import DropDown from "react-native-paper-dropdown";
import { DatePickerModal } from 'react-native-paper-dates';

const EditProfile = ({navigation}) => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [token,setToken] = React.useState('')
  const [userExpanded, setUserExpanded] = React.useState(false);
  const handlePressUser = () => setUserExpanded(!userExpanded);
  const [profileExpanded, setProfileExpanded] = React.useState(false);
  const handlePressProfile = () => setProfileExpanded(!profileExpanded);
  const [locationExpanded, setLocationExpanded] = React.useState(false);
  const handlePressLocation = () => setLocationExpanded(!locationExpanded);
  const [odsExpanded, setOdsExpanded] = React.useState(false);
  const handlePressOds = () => setOdsExpanded(!odsExpanded);
  const [showDropDown, setShowDropDown] = useState(false);
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      formik.setFieldValue('birthDate', params.date)
    },
    [setOpen]
  );

  const [getUser, {data: userData}] = useLazyQuery(NEW_FIND_USER_BY_ID, {
    context: {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    },
    onCompleted: data => {
      console.log(data)
    }});

  const onSubmitEdit = () => {
    //TODO integracion
  }

  const genderList = [
    {
      label: t("gender.male"),
      value: Gender.MALE,
    },
    {
      label: t("gender.female"),
      value: Gender.FEMALE,
    },
    {
      label: t("gender.other"),
      value: Gender.OTHER,
    },
  ];

  const initialValues: UserForEdition = {
    name: '',
    lastname: '',
    favouriteODS: [],
    address: null,
    biography: '',
    photoUrl: '',
    gender: Gender.OTHER,
    birthDate: new Date()
  }

  let formik = useFormik(
        {
          initialValues: initialValues,
          onSubmit: onSubmitEdit
        })

  useEffect(() => {
    getToken().then(t => setToken(t));
    getUserId().then(id => {
      getUser({variables: {targetUserId: id, currentUserId: id}})
    });
  }, []);
  useEffect(() => {
    if(userData) {
      formik.setValues({
        name: userData.findUserById.user.name,
        lastname: userData.findUserById.user.lastname,
        address: userData.findUserById.user.address,
        favouriteODS: userData.findUserById.user.favouriteODS,
        biography: userData.findUserById.user.biography? userData.findUserById.user.biography : '',
        photoUrl: userData.findUserById.user.photoUrl? userData.findUserById.user.photoUrl : '',
        gender: userData.findUserById.user.gender? userData.findUserById.user.gender : Gender.OTHER,
        birthDate: userData.findUserById.user.birthDate ? new Date(userData.findUserById.user.birthDate) : new Date()
      })
    }
  }, [userData])

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      position: 'relative'
    },
    userInfoContainer: {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5
    },
    background: {
      justifyContent: "center",
      backgroundColor: colorShade(colors.surface, -15)
    },
    backgroundAlt: {
      justifyContent: "center",
      backgroundColor: colorShade(colors.surface, -25)
    },
    input: {
      marginTop: 5,
      width: '100%',
      backgroundColor: colors.surface,
      fontSize: 20,
      borderRadius: 30,
      padding: 15,
      shadowOffset: {width: 5, height: 5},
      shadowOpacity: 0.5,
      shadowColor: '#DAB99D',
      elevation: 4,
      height: 60
    },
    button: {
      backgroundColor: colors.accent,
      borderRadius: 20,
      marginTop: 50,
      marginHorizontal: Dimensions.get('window').width*0.2,
      //width: "40%",
      height: 30
    },
    fullNameContainer: {
      marginLeft:-Dimensions.get('window').width*0.15,
      paddingHorizontal:0,
      flexDirection: 'row',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    nameInputContainer: {
      // flex: 1,
      width: '50%',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    doneButton: {
      backgroundColor: colors.extra,
      borderRadius: 10,
      marginTop: Dimensions.get('window').height*0.05,
      marginHorizontal: Dimensions.get('window').width*0.35,
      alignContent: "center",
      justifyContent: "center",
      height: 50
    }
  });


  return <View style={styles.container}>
    <IconButton icon={'chevron-left'} style={{marginTop: 25}} onPress={navigation.goBack}/>
    <View style={{height: Dimensions.get('window').height*0.05, paddingTop: 10, alignSelf: 'center'}}/>

    <List.Accordion
      title={t("editProfile.user")}
      style={styles.background}
      left={props => <List.Icon {...props} icon="account" />}
      expanded={userExpanded}
      onPress={handlePressUser}>
      <View style={styles.fullNameContainer}>
      <View style={styles.nameInputContainer}>
        <Input
          placeholder={t('register.name')}
          style={styles.input}
          value={formik.values.name}
          label={t('register.name')}
          labelStyle={{color: colors.primary, paddingHorizontal: 15, paddingTop: 10}}
          maxLength={20}
          onChangeText={t => formik.setFieldValue('name', t)}
          inputContainerStyle={{borderBottomWidth: 0}}
        />
      </View>
      <View style={styles.nameInputContainer}>
        <Input
          placeholder={t('register.lastname')}
          style={styles.input}
          label={t('register.lastname')}
          labelStyle={{color: colors.primary, paddingHorizontal: 15, paddingTop: 10}}
          value={formik.values.lastname}
          maxLength={20}
          onChangeText={t => formik.setFieldValue('lastname', t)}
          inputContainerStyle={{borderBottomWidth: 0}}
        />
      </View>

      </View>

      <View style={styles.fullNameContainer}>
        <View style={styles.nameInputContainer}>

          <DropDown
            label={t("register.gender")}
            mode={'outlined'}
            inputProps={{style: styles.input}}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={formik.values.gender}
            setValue={v => formik.setFieldValue('gender', v)}
            list={genderList}
          />

        </View>
        <TouchableWithoutFeedback onPress={() => {
          setOpen(true)
        }}>
        <View style={styles.nameInputContainer}>
          <View style={{backgroundColor: 'transparent', position: "absolute", top: 12, right: 90}}>
            <Icon size={15} type={'feather'} name={'edit-2'}/>
          </View>
            <Input
              placeholder={t('register.birthDate')}
              disabled
              style={styles.input}
              value={formik.values.birthDate.toDateString()}
              label={t('register.birthDate')}
              labelStyle={{color: colors.primary, paddingHorizontal: 15, paddingTop: 10}}
              maxLength={20}
              inputContainerStyle={{borderBottomWidth: 0}}
            />
        </View>
        </TouchableWithoutFeedback>
        <DatePickerModal
          // locale={'en'} optional, default: automatic
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={formik.values.birthDate}
          onConfirm={onConfirmSingle}
          validRange={{
            startDate: new Date(1900, 1, 2),  // optional
            endDate: new Date(), // optional
          }}
        />


      </View>

    </List.Accordion>

    <List.Accordion
      title="Profile info"
      style={styles.backgroundAlt}
      left={props => <List.Icon {...props} icon="card-account-details-outline" />}
      expanded={profileExpanded}
      onPress={handlePressProfile}>

      <List.Item title="Second item" />
    </List.Accordion>

    <List.Accordion
      title="Location"
      style={styles.background}
      left={props => <List.Icon {...props} icon="map-marker" />}
      expanded={locationExpanded}
      onPress={handlePressLocation}>
      <List.Item title="First item" />
      <List.Item title="Second item" />
    </List.Accordion>

    <List.Accordion
      title="Favourite ODS"
      style={styles.backgroundAlt}
      left={props => <List.Icon {...props} icon="star-circle-outline" />}
      expanded={odsExpanded}
      onPress={handlePressOds}>
      <List.Item title="First item" />
      <List.Item title="Second item" />
    </List.Accordion>

    {/*<Button style={styles.button}> User info </Button>*/}
    {/*<Button style={styles.button}> Profile info </Button>*/}
    {/*<Button style={styles.button}> Location </Button>*/}
    {/*<Button style={styles.button}> Favourite ODS </Button>*/}

    <Button style={styles.doneButton}> Done! </Button>
  </View>
}

export default EditProfile;
