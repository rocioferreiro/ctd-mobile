import React, {useEffect, useState} from "react";
import {Dimensions, Image, ScrollView, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {Button, Colors, IconButton, List, useTheme} from "react-native-paper";
import {useLazyQuery, useMutation} from "@apollo/client";
import {NEW_FIND_USER_BY_ID} from "../apollo-graph/Queries";
import {getToken, getUserId} from "../Storage";
import {useFormik} from "formik";
import {Gender, UserForEdition} from "../Models/User";
import {colorShade} from "../Models/shadingColor";
import {Icon, Input, colors} from "react-native-elements";
import {useTranslation} from "react-i18next";
import DropDown from "react-native-paper-dropdown";
import { DatePickerModal } from 'react-native-paper-dates';
import ProfileLocation from "./ProfileLocation";
import CancelButton from "../CreatePost/CancelButton";
import ImagePicker from "../CreateChallengeForm/inscriptions/ImagePicker";
import {Text} from "../Themed";
import ImageButton from "../CreatePost/ImageButton";
import ImageButtonProfile from "./ImageButtonProfile";
import ProfileOds from "./ProfileOds";
import {CREATE_POST, UPDATE_USER, UPDATE_USER_LOCATION} from "../apollo-graph/Mutations";
import Toast from "react-native-toast-message";
import * as Location from "expo-location";





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
  const [disabled, setDisabled] = React.useState(true)
  const [ addImage, setAddImage] = React.useState(false)
  const [ odsIsOpen, setOdsIsOpen] = React.useState(true)
  const [updateUserSuccess,setUpdateUserSuccess] = React.useState(false)
  const [updateUserLocationSuccess,setUpdateUserLocationSuccess] = React.useState(false)
  const [userId, setUserId] = React.useState('');
 // const [openChoices,setOpenChoices] =React.useState(false);

  React.useEffect(() => {
    getUserId().then(id => setUserId(id));
    getToken().then(t => setToken(t))
  }, [])

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
      console.log(data.findUserById.user.favouriteODS.length)
      //if(data.findUserById.user.favouriteODS.length>0) setOpenChoices(true)
    }});

  const onSubmitEdit = (formik) => {
    parseAndSendUpdateUser(formik)
    parseAndSendUpdateUser(formik)

    toastOnUpdateUserSuccess()

    navigation.navigate('profile')
    //TODO integracion
  }



  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      setUpdateUserSuccess(true);
    },
    onError: err => {
      toastOnUpdateUserError();
      console.log(err);
    },
    context: {
      headers: {
        "Authorization": "Bearer " + token
      }
    },
    refetchQueries:['newFindUserById']

  }
  );

  const [updateUserLocation] = useMutation(UPDATE_USER_LOCATION, {
    onCompleted: () => {
      setUpdateUserLocationSuccess(true);
    },
    onError: err => {
      toastOnUpdateUserError();
      console.log(err);
    },
    context: {
      headers: {
        "Authorization": "Bearer " + token
      }
    },
    refetchQueries:['newFindUserById']
  });

  function getGender(gender) {
    if(gender==0) return "MALE"
    if(gender==1) return "FEMALE"
    else  return "OTHER"

  }

  const parseAndSendUpdateUser = (formik) => {
    const  userInputDto = {
      name: formik.values.name,
      lastname: formik.values.lastname,
      favouriteODS: formik.values.favouriteODS,
      address: {coordinates: {latitude: formik.values.address.coordinates.latitude,longitude: formik.values.address.coordinates.latitude },
        country: formik.values.address.country,id: formik.values.address.id,locality:formik.values.address.locality,
        number: formik.values.address.number,province: formik.values.address.province,street: formik.values.address.street},
      biography: formik.values.biography,
      photo: formik.values.photoUrl,
      id:userId,
      age:userData.findUserById.user.age,
      geoHash: userData.findUserById.user.geoHash,
      level: userData.findUserById.user.level,
      mail:userData.findUserById.user.mail,
      role:userData.findUserById.user.role,
      socialLogin: userData.findUserById.user.socialLogin,
      xp:userData.findUserById.user.xp,
      gender:getGender(formik.values.gender),
      birthDate: formik.values.birthDate,

    }
    console.log(userInputDto)
    updateUser({variables: {user: userInputDto}}).catch(() => {
      toastOnUpdateUserError();
    });
  }

  const parseAndSendUpdateUserLocation = (formik) => {
    const  addressInputDto = {
    coordinates: {latitude: formik.values.address.coordinates.latitude,longitude: formik.values.address.coordinates.latitude },
        country: formik.values.address.country,id: formik.values.address.id,locality:formik.values.address.locality,
        number: formik.values.address.number,province: formik.values.address.province,street: formik.values.address.street
    }
    console.log(addressInputDto)
    updateUserLocation({variables: {address: addressInputDto}}).catch(() => {
      toastOnUpdateUserError();
    });
  }



  function toastOnUpdateUserError() {
    Toast.show({
      type: 'error',
      text1: t('edit-profile.update-user-error'),
      text2: t('edit-profile.update-user-error-description'),
      topOffset: Dimensions.get("window").height * 0.05,
    });
  }

  function toastOnUpdateUserSuccess() {
    Toast.show({
      type: 'success',
      text1: t('edit-profile.update-user-success'),
      text2: t('edit-profile.update-user-success-description'),
      topOffset: Dimensions.get("window").height * 0.05,
    });
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
    birthDate: new Date(),
    coordinates:null
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
        birthDate: userData.findUserById.user.birthDate ? new Date(userData.findUserById.user.birthDate) : new Date(),
        coordinates: userData.findUserById.user.address.coordinates,
        photo: userData.findUserById.user.photo
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
    inputBio: {
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
      height: 120,
      //position:'absolute'

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
    },
    bioInputContainer: {
      marginLeft:-Dimensions.get('window').width*0.15,
      paddingHorizontal:0,
      flexDirection: 'row',
      backgroundColor: 'rgba(0,0,0,0)',

    },
    photoInputContainer: {
      marginLeft:-Dimensions.get('window').width*0.05,
      paddingHorizontal:0,
      flexDirection: 'row',
      backgroundColor: 'rgba(0,0,0,0)',

    },
    adddImageContainer: {
      marginLeft:-Dimensions.get('window').width*0.1,
      paddingHorizontal:0,
      flexDirection: 'row',
      backgroundColor: 'rgba(0,0,0,0)',

    },
    editOptionsButton: {
      width: Dimensions.get('window').width * 0.4,
      height: Dimensions.get('window').height * 0.05,
      borderRadius: 30,
      backgroundColor: colorShade(colors.accent, 5),
      //textAlign: "center",
      justifyContent: "center",
      //marginBottom: 10
    },
  });


  return (
  <View style={styles.container}>
    <IconButton icon={'chevron-left'} style={{marginTop: 25}} onPress={navigation.goBack}/>
    <View style={{height: Dimensions.get('window').height*0.05, paddingTop: 10, alignSelf: 'center'}}/>
    <ScrollView style={{
      backgroundColor: 'rgba(0,0,0,0)',
      overflow: "visible",
      marginBottom: Dimensions.get('screen').height * 0.20
    }}>
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
            setValue={v => formik.setFieldValue('gender', genderList[v].value)}
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
      title={t('register.profile-info')}
      style={styles.backgroundAlt}
      left={props => <List.Icon {...props} icon="card-account-details-outline" />}
      expanded={profileExpanded}
      onPress={handlePressProfile}>


      <View style={styles.bioInputContainer}>
        <Input
            placeholder={t('register.bio-placeholder')}
            style={styles.inputBio}
            value={formik.values.biography}
            label={t('register.bio')}
            labelStyle={{color: colors.primary, paddingHorizontal: 15, paddingTop: 10}}
            maxLength={200}
            multiline={true}
            onChangeText={t => formik.setFieldValue('biography', t)}
            inputContainerStyle={{borderBottomWidth: 0}}
        />
      </View>
      <View style={{width:Dimensions.get("screen").width, backgroundColor: colors.surface}}>

        <ScrollView style={{
          backgroundColor: 'rgba(0,0,0,0)',
          overflow: "visible",
          marginBottom: Dimensions.get('screen').height * 0.03
        }}>
          <View style={{marginLeft:-Dimensions.get('window').width*0.15,
            paddingHorizontal:0,
            flexDirection: 'row',
            backgroundColor: 'rgba(0,0,0,0)',}}>
          <Text style={{
            color: colors.primary,
            fontWeight: "bold",
            fontSize: 15,
            marginLeft: 2,
            paddingHorizontal: 15,
            paddingTop: 5
          }}> {t('register.profile-image')}</Text>
          </View>
          {addImage ?
              <View style={styles.photoInputContainer}>
              <View style={{
                display: "flex",
                width: '100%',
                backgroundColor: "rgba(0,0,0,0)"
              }}>
                <CancelButton  setAddImage={setAddImage}/>
                <ImagePicker image={formik.values.photoUrl} setImage={t => formik.setFieldValue('photoUrl', t)}/>
              </View>
              </View>
              :
              <View style={styles.adddImageContainer}>

                <View style={[{flexDirection:'row', alignItems:'center'}]}>

                <Text style={{
                  color: colors.primary,
                  fontWeight: "normal",
                  fontSize: 15,
                  marginLeft: 2,
                  paddingHorizontal: 15,
                  paddingTop: 5
                }}> {t('register.add-profile-image')}</Text>
                  <View style={{marginTop:6}}>
                  <ImageButtonProfile setAddImage={setAddImage}/>
                  </View>
                </View>
              </View>
          }



        </ScrollView>
      </View>


    </List.Accordion>

    <List.Accordion
      title={t('register.location')}
      style={styles.background}
      left={props => <List.Icon {...props} icon="map-marker" />}
      expanded={locationExpanded}
      onPress={handlePressLocation}>
      <View>
        <View style={{marginLeft:-Dimensions.get('window').width*0.15,
          paddingHorizontal:0,
          flexDirection: 'row',
          backgroundColor: 'rgba(0,0,0,0)',}}>
          <Text style={{
            color: colors.primary,
            fontWeight: "bold",
            fontSize: 15,
            marginLeft: 2,
            paddingHorizontal: 15,
            paddingTop: 10
          }}> {t('register.change-location')}</Text>
        </View>
        <View style={{marginLeft:-Dimensions.get('window').width*0.15,
          backgroundColor: 'rgba(0,0,0,0)',}}>
        <ProfileLocation setDisabled={setDisabled} formik={formik}/>
         </View>
      </View>
    </List.Accordion>

    <List.Accordion
      title={t('register.favorite-sdg')}
      style={styles.backgroundAlt}
      left={props => <List.Icon {...props} icon="star-circle-outline" />}
      expanded={odsExpanded}
      onPress={handlePressOds}>
    <View>
{/*      {   formik.values.favouriteODS.length>0 ?
          <View >
            <Text style={{fontWeight: "bold",
              color: colors.primary,
              marginLeft: 5,
              fontSize: 20, padding:10}}> {t('profile-ods.choose-favorite-ods')} </Text>
            <View style={{display: 'flex', flexDirection: 'column'}}>
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "center",
                paddingHorizontal: 10,
                paddingTop: 10
              }}>
                {formik.values.favouriteODS.map((s, index) => {
                  return <TouchableWithoutFeedback key={index}>
                    <Image
                        style={{width: 50, height: 50, borderRadius: 25, marginHorizontal: 10}}
                        source={s.image}/>
                  </TouchableWithoutFeedback>
                })}
              </View>
              <View style={{
                display: "flex",
                justifyContent: 'center',
                width: '100%',
                flexDirection: 'row',
                padding: 15
              }}>
                <Button style={styles.editOptionsButton} mode={'contained'}
                        onPress={() => {setOpenChoices(true)
                        }}> {t('profile-ods.edit-ods')}</Button>
              </View>
            </View>
          </View>

          :*/}
        <View style={{
          marginLeft: -Dimensions.get('window').width * 0.15,
          backgroundColor: 'rgba(0,0,0,0)',
        }}>
          <ProfileOds setDisabled={setDisabled} setOdsIsOpen={setOdsIsOpen} formik={formik}/>
        </View>


    </View>
    </List.Accordion>

    {/*<Button style={styles.button}> User info </Button>*/}
    {/*<Button style={styles.button}> Profile info </Button>*/}
    {/*<Button style={styles.button}> Location </Button>*/}
    {/*<Button style={styles.button}> Favourite ODS </Button>*/}

    <Button style={styles.doneButton} onPress={()=>onSubmitEdit(formik)}> Done! </Button>
    </ScrollView>
  </View>)
}

export default EditProfile;
