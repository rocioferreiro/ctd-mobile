import "react-apollo"
import {View, Text} from "../Themed";
import React, {useContext, useEffect, useState} from "react";
import {Dimensions, Image, ImageBackground, ScrollView, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";
import {Button, useTheme} from "react-native-paper";
import {Avatar, ProgressBar} from 'react-native-paper';
import {useLazyQuery} from "@apollo/client";
import {FIND_POSTS_OF_USER} from "../apollo-graph/Queries";
import {getUserId} from "../Storage";
import {AuthContext} from "../../App";

export function Profile() {
  const {colors} = useTheme();
  const auth = useContext(AuthContext);
  const [userId, setUserId] = useState('');
  const [findPostsOfUser, {data: postData, error: postError, loading: postLoading}] = useLazyQuery(FIND_POSTS_OF_USER, {variables: {userId: userId}});

  useEffect(() => {
    getUserId().then(id => {
      setUserId(id);
      findPostsOfUser();
    });
  }, []);

  //TODO DELETE LATER
  useEffect(() => {
    console.log(postData)
  }, [postData]);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      flex: 1,
    },
    profileBackground: {
      width: '100%',
      height: 200
    },
    profileImage: {
      marginTop: -38,
      marginLeft: 30,
      marginRight: 15
    },
    userInfoContainer: {
      backgroundColor: 'transparent',
      flexDirection: 'row'
    },
    primaryText: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.primary
    },
    secondaryText: {
      fontSize: 12,
      color: colors.primary
    },
    whiteText: {
      fontSize: 12,
      color: colors.background
    },
    objectivesContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 150,
      marginTop: 16,
      paddingTop: 30,
      borderRadius: 8
    },
    objective: {
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: 75,
    },
    detailsContainer: {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: "space-between",
      paddingLeft: 30,
      paddingRight: 30,
    },
    detail: {
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center'
    },
    sectionContainer: {
      backgroundColor: 'transparent',
      paddingTop: 30,
      paddingLeft: 30,
      paddingRight: 30,
    },
    image: {
      height: 180,
      width: 150,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    footer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      width: 150,
      height: 30,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    },
    imageTextContainer: {
      backgroundColor: 'transparent',
      marginLeft: 10,
      marginBottom: 10,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end'
    },
    logout: {
      width: Dimensions.get('window').width,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    }
  });

  const getActiveChallenge = () => {
    return <View style={{backgroundColor: 'transparent', marginRight: 20}}>
      <ImageBackground style={{height: 180, width: 150}}
                       imageStyle={{borderTopLeftRadius: 12, borderTopRightRadius: 12}}
                       source={require('../../assets/images/compost.jpg')} resizeMode={'cover'}>
        <View style={styles.imageTextContainer}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: colors.background}}>Create compost</Text>
          <Text style={styles.whiteText}>dd/mm/yyyy</Text>
        </View>
      </ImageBackground>
      <View style={styles.footer}>
        <Text style={styles.whiteText}><Text style={[{fontWeight: 'bold'}, styles.whiteText]}>400</Text> Points</Text>
      </View>
    </View>
  }

  const getPost = () => {
    return <View style={{backgroundColor: 'transparent', marginRight: 20}}>
      <ImageBackground style={{height: 180, width: 150}}
                       imageStyle={{borderTopLeftRadius: 12, borderTopRightRadius: 12}}
                       source={require('../../assets/images/post.jpg')} resizeMode={'cover'}>
        <View style={styles.imageTextContainer}>
          <Text style={styles.whiteText}>Nature beauty</Text>
        </View>
      </ImageBackground>
      <View style={{
        ...styles.footer,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
      }}>
        <View style={{backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}}>
          <Icon style={{marginRight: 4}} name={'favorite-outline'} color={colors.background}/>
          <Text style={styles.whiteText}>12k</Text>
        </View>
        <View style={{backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}}>
          <Icon style={{marginRight: 4}} type={'feather'} name={'message-circle'} color={colors.background}/>
          <Text style={styles.whiteText}>134</Text>
        </View>
      </View>
    </View>
  }

  const getFinishedChallenge = () => {
    return <View style={{backgroundColor: 'transparent', marginRight: 20}}>
      <ImageBackground style={{height: 180, width: 150}}
                       imageStyle={{borderTopLeftRadius: 12, borderTopRightRadius: 12}}
                       source={require('../../assets/images/tree.jpg')} resizeMode={'cover'}>
        <View style={styles.imageTextContainer}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: colors.background}}>Plant trees</Text>
          <Text style={styles.whiteText}>dd/mm/yyyy</Text>
        </View>
      </ImageBackground>
      <View style={{...styles.footer, flexDirection: 'row', alignItems: 'center'}}>
        <Icon style={{marginRight: 4}} type={'feather'} name={'user'} color={colors.background}/>
        <Text style={styles.whiteText}>154</Text>
      </View>
    </View>
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={require('../../assets/images/profile-background.jpg')} resizeMode={'cover'}
               style={styles.profileBackground}/>
        <View style={styles.userInfoContainer}>
          <Avatar.Image size={86} source={require('../../assets/images/profile.png')}
                        style={styles.profileImage}/>
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={styles.primaryText}>Nombre Apellido</Text>
            <Text style={styles.secondaryText}>@username</Text>
          </View>
        </View>
        <View style={{backgroundColor: 'transparent', padding: 30}}>
          <View
            style={{backgroundColor: 'transparent', flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={styles.secondaryText}>Level 4</Text>
            <Text style={styles.secondaryText}>Level 5</Text>
          </View>
          <View>
            <ProgressBar progress={0.7} color={colors.accent} style={{height: 14, borderRadius: 8}}/>
          </View>
          <View style={styles.objectivesContainer}>
            <View>
              <Avatar.Image size={50} source={require('../../assets/images/objetive1.png')}
                            style={styles.profileImage}/>
              <Text style={styles.secondaryText}>Fin de la pobreza</Text>
            </View>
            <View>
              <Avatar.Image size={50} source={require('../../assets/images/objetive2.png')}
                            style={styles.profileImage}/>
              <Text style={styles.secondaryText}>Hambre cero</Text>
            </View>
            <View>
              <Avatar.Image size={50} source={require('../../assets/images/objetive14.png')}
                            style={styles.profileImage}/>
              <Text style={styles.secondaryText}>Vida submarina</Text>
            </View>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detail}>
            <Text style={styles.primaryText}>46K</Text>
            <Text style={styles.secondaryText}>Followers</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.primaryText}>45</Text>
            <Text style={styles.secondaryText}>Posts</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.primaryText}>17</Text>
            <Text style={styles.secondaryText}>Challenges</Text>
          </View>
          <View style={{backgroundColor: 'transparent'}}>
            <Button
              mode={'contained'}
              onPress={() => {
              }}
              style={{backgroundColor: colors.primary, borderRadius: 20}}
              uppercase={false}
            >
              About
            </Button>
          </View>
        </View>
        <View style={styles.logout}>
          <Button
            uppercase={false}
            mode={'outlined'}
            style={{width: '30%'}}
            onPress={() => {auth.signOut().catch(e => console.log(e))}}
          >
            Logout
          </Button>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.primaryText}>Active Challenges</Text>
          <ScrollView horizontal={true}>
            {getActiveChallenge()}
            {getActiveChallenge()}
            {getActiveChallenge()}
            {getActiveChallenge()}
          </ScrollView>
        </View>
        {postData &&
        <View style={styles.sectionContainer}>
            <Text style={styles.primaryText}>Posts</Text>
            <ScrollView horizontal={true}>
              {getPost()}
              {getPost()}
              {getPost()}
              {getPost()}
            </ScrollView>
        </View>
        }
        <View style={{...styles.sectionContainer, marginBottom: 100}}>
          <Text style={styles.primaryText}>Finished Challenges</Text>
          <ScrollView horizontal={true}>
            {getFinishedChallenge()}
            {getFinishedChallenge()}
            {getFinishedChallenge()}
            {getFinishedChallenge()}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
