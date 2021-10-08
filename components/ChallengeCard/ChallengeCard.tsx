import * as React from 'react';
import {Avatar, Button, Card, Title, Paragraph, useTheme, ActivityIndicator} from 'react-native-paper';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from "react-native";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";
import {useLazyQuery} from "@apollo/client";
import {NEW_FIND_USER_BY_ID} from "../apollo-graph/Queries";
import {View} from "../Themed";
import {getToken} from "../Storage";

interface Props {
  challenge: any;
  setSelectedChallenge: (Challenge) => void,
  navigation: any
}

const ChallengeCard = (props: Props) => {
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    joinButton: {
      borderRadius: 20,
      backgroundColor: colors.accent,
      width: 60,
      paddingLeft: 17,
      marginBottom: 7,
      paddingRight: 17,
      paddingTop: 8,
      paddingBottom: 8
    },
    viewButton: {
      borderRadius: 20,
      backgroundColor: '#c1c1c1',
      width: 60,
      paddingLeft: 17,
      marginBottom: 7,
      paddingRight: 17,
      paddingTop: 8,
      paddingBottom: 8
    },
    button: {
      position: 'absolute',
      zIndex: 2,
      top: 0,
      left: 0,
      padding: 0,
      margin: 0
    }
  });
  //const [viewProfile, setViewProfile] = useState(false);
  const getOwner = () => {
    if (props.challenge) return props.challenge.owner
    else return ''
  };
  const [token,setToken] = React.useState('')
  React.useEffect(() => {
    getToken().then(t => setToken(t))
  }, [])
  const [getUser, {data, loading, error}] = useLazyQuery(NEW_FIND_USER_BY_ID, {
    variables: {
      currentUserId: getOwner(),
      targetUserId: getOwner()
    },
    context: {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
  });
  const LeftContent = props => <Avatar.Text
    label={data.findUserById.user.name[0] + data.findUserById.user.lastname[0]} {...props}/>

  useEffect(() => {
    if (props.challenge) getUser()
  }, [props.challenge]);

  if (loading) return <View style={{
    display: 'flex',
    marginTop: Dimensions.get('window').height * 0.4,
    justifyContent: 'center'
  }}><ActivityIndicator size="large"/></View>;
  if (error) {
    console.log(error.message);
    return <Text>Error</Text>
  }

  return (
    (props.challenge && data) ?
      <Card style={{backgroundColor: colors.surface}}>
        <TouchableOpacity onPress={() => {
          props.navigation.navigate('profile', {otherId: props.challenge.owner.id ? props.challenge.owner.id : props.challenge.owner})
        }} style={{backgroundColor: 'transparent', marginRight: 20}}>
        <Card.Title title={data.findUserById.user.name + ' ' + data.findUserById.user.lastname}
                    subtitle={t('challenge-card.level') + ' ' + data.findUserById.user.level} left={LeftContent}/>
        </TouchableOpacity>
        <Card.Content>
          <Title style={{
            fontSize: 25, color: colors.primary,
            marginTop: 5
          }}>{props.challenge.title}</Title>
          <Paragraph style={{
            color: colors.primary,
            fontSize: 15,
            marginBottom: 5
          }}>{t('challenge-card.challenge-description')}</Paragraph>
        </Card.Content>
        <Card.Cover source={require('../../assets/images/compost.jpg')}/>
        <Card.Actions>
          <Button style={{
            backgroundColor: '#c1c1c1',
            borderRadius: 20,
            width: 100,
            marginLeft: 40,
            marginRight: 120,
          }} onPress={() => {
            props.navigation.navigate('challenge', {challengeId: props.challenge.id});
          }}
          ><Title style={{
            fontSize: 15, color: colors.primary, padding: 0
          }}>{t('challenge-card.view')}</Title>
          </Button>
          <Button style={{
            backgroundColor: colors.accent,
            borderRadius: 20,
            width: 100,
          }}
          ><Title style={{
            fontSize: 15, color: colors.primary, padding: 0
          }}>{t('challenge-card.join')}</Title>
          </Button>
        </Card.Actions>
        {/*<Modal animationType="fade"*/}
        {/*       presentationStyle={"fullScreen"}*/}
        {/*       visible={viewProfile}*/}
        {/*       onRequestClose={() => {*/}
        {/*         setViewProfile(!viewProfile);*/}
        {/*       }}>*/}
        {/*  <IconButton onPress={() => setViewProfile(false)}*/}
        {/*              style={[styles.button, Platform.OS === 'ios' ? {marginTop: Dimensions.get("screen").height*0.05}: {}]}*/}
        {/*              icon={'chevron-left'}*/}
        {/*              size={40}*/}
        {/*  />*/}
        {/*  <Profile navigation={props.navigation} otherUserId={getOwner()}/>*/}
        {/*</Modal>*/}
      </Card>
      :
      <View/>
  );
}

export default ChallengeCard;
