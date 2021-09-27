import "react-apollo"
import {View, Text} from "../Themed";
import React, {useContext, useEffect, useState} from "react";
import {Dimensions, Image, ImageBackground, ScrollView, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";
import {Button, Card, IconButton, useTheme} from "react-native-paper";
import {Avatar, ProgressBar} from 'react-native-paper';
import {useLazyQuery, useMutation} from "@apollo/client";
import {
  FIND_POST_BY_ID,
  FIND_POSTS_OF_USER,
  GET_CONNECTIONS,
  GET_PENDING_CONNECTIONS,
  NEW_FIND_USER_BY_ID
} from "../apollo-graph/Queries";
import {AuthContext} from "../../App";
import {useTranslation} from "react-i18next";
import OptionsMenu from "react-native-options-menu";
import { Image as ImageElement } from 'react-native-elements';
import PostThumbnail from "./PostThumbnail";
import Toast from "react-native-toast-message";
import ViewPost from "../viewPost/ViewPost";
import {onuLogos} from "../ONUObjectives";
import {FIND_CHALLENGES_OF_USER} from "../apollo-graph/Queries";
import {getUserId} from "../Storage";
import {CONNECT, DISCONNECT} from "../apollo-graph/Mutations";

enum ConnectionStatus {
  connect = "Connect",
  pending = "Pending",
  connected = "Connected"
}

interface Props {
  otherUserId?: string; // if != to null means it's a profile from another user, not the logged in
}

export function Profile(props: Props) {
  const {colors} = useTheme();
  const auth = useContext(AuthContext);
  const [userId, setUserId] = useState('');
  const [loggedInUserId, setLoggedInUserId] = useState('');
  const [viewPost, setViewPost] = useState(false);
  const [viewPostId, setViewPostId] = useState();
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>();

  const [findPostsOfUser, {data: postsOfUser}] = useLazyQuery(FIND_POSTS_OF_USER);
  const [findPostById, {data: postData}] = useLazyQuery(FIND_POST_BY_ID, {variables: {id: viewPostId}});
  const [getUser, {data: userData}] = useLazyQuery(NEW_FIND_USER_BY_ID);
  const [getLoggedInUser, {data: loggedInUserData}] = useLazyQuery(NEW_FIND_USER_BY_ID);
  const [getChallenges, {data: challengesData}] = useLazyQuery(FIND_CHALLENGES_OF_USER);
  const [getConnections, {data: connectionsData}] = useLazyQuery(GET_CONNECTIONS);
  const [getPendingConnections, {data: pendingConnectionsData}] = useLazyQuery(GET_PENDING_CONNECTIONS);

  const [connect] = useMutation(CONNECT, {
    onCompleted: () => {
      setConnectionStatus(ConnectionStatus.pending);
    }
  });
  const [disconnect] = useMutation(DISCONNECT, {
    onCompleted: () => {
      setConnectionStatus(ConnectionStatus.connect);
    }
  });

  useEffect(() => {
    if (props.otherUserId) {
      setUserId(props.otherUserId);
      getUserId().then(id => {
        setLoggedInUserId(id);
        getLoggedInUser({variables: {targetUserId: id, currentUserId: id}});
        getConnections({variables: {userId: id}});
        getPendingConnections({variables: {userId: id}});
      });
    }
    else {
      getUserId().then(id => {
        setUserId(id);
        setLoggedInUserId(id);
      });
    }
  }, [props.otherUserId]);

  useEffect(() => {
    if (userId && loggedInUserId) {
      findPostsOfUser({variables: {ownerId: userId}});
      getUser({variables: {targetUserId: userId, currentUserId: loggedInUserId}});
      getChallenges({variables: {userId: userId}});
    }
  }, [userId, loggedInUserId])

  useEffect(() => {
    if (!viewPost) return;
    findPostById();
  }, [viewPost])

  useEffect(() => {
    if (connectionsData && pendingConnectionsData && props.otherUserId) {
      if (connectionsData.getAllMyConnections.some(connection => connection === props.otherUserId))
        setConnectionStatus(ConnectionStatus.connected);
      else if (pendingConnectionsData.getMyPendingConnection.some(connection => connection === props.otherUserId))
        setConnectionStatus(ConnectionStatus.pending);
      else setConnectionStatus(ConnectionStatus.connect);
    }
  }, [connectionsData, pendingConnectionsData, props.otherUserId]);

  function toastError() {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Try again later',
      topOffset: Dimensions.get("window").height * 0.05,
    });
  }

  const onError = (error) => {
    console.log(error);
    toastError();
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      position: 'relative'
    },
    profileBackground: {
      width: '100%',
      height: 200
    },
    profileImage: {
      marginTop: -38,
      alignSelf: "center",
      marginHorizontal: 20
    },
    userInfoContainer: {
      backgroundColor: 'transparent',
      flexDirection: 'row'
    },
    primaryText: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.primary,
      marginRight: 15
    },
    secondaryText: {
      fontSize: 12,
      color: colors.primary,
    },
    forODS: {
      marginTop: 10,
      width: 60,
      textAlign: 'center',
      alignSelf: "center",
    },
    whiteText: {
      fontSize: 12,
      color: colors.background
    },
    objectivesContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      height: 150,
      marginTop: 16,
      paddingTop: 30,
      borderRadius: 15
    },
    objective: {
      alignItems: 'center',
      justifyContent: 'center',
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
    },
    button: {
      backgroundColor: 'rgba(0,0,0,0)',
      marginBottom: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      marginTop: 25
    },
    creationCard: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height * 0.95,
      marginTop: Dimensions.get('window').height * 0.03,
      backgroundColor: colors.surface
    },
    background: {
      flex: 1,
      justifyContent: "center",
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      position: "absolute",
      zIndex: 0
    },
    connectButton: {
      position: "absolute",
      top: 10,
      right: 10,
      zIndex: 2,
      backgroundColor: colors.accent,
      borderRadius: 20,
    }
  });

  const {t, i18n} = useTranslation();
  const [language, setLanguage] = React.useState(i18n.language);

  const onConnect = () => {
    switch (connectionStatus) {
      case ConnectionStatus.connect:
        const target = userData.findUserById.user;
        const following = loggedInUserData.findUserById.user;
        const targetUser = {id: target.id, mail: target.mail, address: {coordinates: {latitude: target.address.coordinates.latitude,
              longitude: target.address.coordinates.latitude}}, favouriteODS: target.favouriteODS};
        const followingUser = {id: following.id, mail: following.mail, address: {coordinates: {latitude: target.address.coordinates.latitude,
              longitude: target.address.coordinates.latitude}}, favouriteODS: following.favouriteODS};

        const variables = {variables: {targetUser: targetUser, followingUser: followingUser}}
        connect(variables).catch(e => console.log(e));
        break;
      case ConnectionStatus.pending:
      case ConnectionStatus.connected:
        disconnect({variables: {targetUserId: userId, followingUserId: loggedInUserId}}).catch(e => console.log(e));
        break;
    }

  }

  const getConnectButtonLabel = () => {
    switch (connectionStatus) {
      case ConnectionStatus.connect:
        return t('profile.connect');
      case ConnectionStatus.pending:
        return t('profile.pending');
      case ConnectionStatus.connected:
        return t('profile.connected');
    }
  }

  const getActiveChallenge = (challenge) => {
      if (!challenge) return null;
      return <View style={{backgroundColor: 'transparent', marginRight: 20}}>
      <ImageBackground style={{height: 180, width: 150}}
                       imageStyle={{borderTopLeftRadius: 12, borderTopRightRadius: 12}}
                       source={require('../../assets/images/compost.jpg')} resizeMode={'cover'}>

        <View style={styles.imageTextContainer}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: colors.background}}>{challenge.title}</Text>
          <Text style={styles.whiteText}>{challenge.endEvent}</Text>
        </View>
      </ImageBackground>
      <View style={styles.footer}>
        <Text style={styles.whiteText}><Text style={[{fontWeight: 'bold'}, styles.whiteText]}>{challenge.score}</Text> Points</Text>
      </View>
    </View>
  }

  const getFinishedChallenge = (challenge) => {
    if(!challenge) return null;
    return <View style={{backgroundColor: 'transparent', marginRight: 20}}>
      <ImageBackground style={{height: 180, width: 150}}
                       imageStyle={{borderTopLeftRadius: 12, borderTopRightRadius: 12}}
                       source={require('../../assets/images/tree.jpg')} resizeMode={'cover'}>
        <View style={styles.imageTextContainer}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: colors.background}}>{challenge.title}</Text>
          <Text style={styles.whiteText}>{challenge.endEvent}</Text>
        </View>
      </ImageBackground>
      <View style={{...styles.footer, flexDirection: 'row', alignItems: 'center'}}>
        <Icon style={{marginRight: 4}} type={'feather'} name={'user'} color={colors.background}/>
        <Text style={styles.whiteText}>154</Text>
      </View>
    </View>
  }

  const myIcon =<ImageElement style={{height:50, width:50}} source = {require('../../assets/images/logos/favpng_translation-language-google-translate-clip-art.png')}
  />
  function handleChange(itemValue) {
    i18n.changeLanguage(itemValue)
    setLanguage(itemValue)
    console.log(i18n.language)
  }

  return (
    <View style={styles.container}>
      {!viewPost &&
      <ScrollView>
        {props.otherUserId && <Button
            style={styles.connectButton}
            onPress={() => onConnect()} color={colors.background} labelStyle={{fontWeight: 'bold', fontFamily: 'sans'}}
        > {getConnectButtonLabel()}
        </Button>}
          <Image
              source={require('../../assets/images/profile-background.jpg')}
              resizeMode={'cover'}
              style={styles.profileBackground}
          /><View style={styles.userInfoContainer}>
        <Avatar.Image size={86} source={require('../../assets/images/profile.png')} style={styles.profileImage}/>
        <View style={{backgroundColor: 'transparent', marginRight: 25}}>
          <Text style={styles.primaryText}>{userData?.findUserById?.user?.name} {userData?.findUserById?.user?.lastname}</Text>
          <Text style={styles.secondaryText}>@{userData?.findUserById?.user?.username}</Text>
          <View style={{backgroundColor: 'transparent',alignItems:"flex-end",flex:1,marginTop:-20}}>
        </View>
        </View>
        <OptionsMenu
          customButton={myIcon}
          options={["English", "Español", "Cancel"]}
          actions={[()=>handleChange("en"), ()=>handleChange("es"),()=>{}]}/>
          </View>
          <View style={{backgroundColor: 'transparent', padding: 30}}>
              <View
                  style={{backgroundColor: 'transparent', flexDirection: "row", justifyContent: "space-between"}}>
                  <Text style={styles.secondaryText}>{t('profile.level')}  4</Text>
          <Text style={styles.secondaryText}>{t('profile.level')} 5</Text>
              </View>
              <View style={{backgroundColor: 'transparent'}}>
                  <ProgressBar progress={0.7} color={colors.accent} style={{height: 14, borderRadius: 8}}/>
              </View>
              <View style={styles.objectivesContainer}>
                  <View>
                      <Avatar.Image size={50} source={onuLogos[0].image}
                                    style={styles.profileImage}/>
                      <Text style={[styles.secondaryText, styles.forODS]}>Fin de la pobreza</Text>
                  </View>
                  <View>
                      <Avatar.Image size={50} source={onuLogos[1].image}
                                    style={styles.profileImage}/>
                      <Text style={[styles.secondaryText, styles.forODS]}>Hambre cero</Text>
                  </View>
                  <View>
                      <Avatar.Image size={50} source={onuLogos[13].image}
                                    style={styles.profileImage}/>
                      <Text style={[styles.secondaryText, styles.forODS]}>Vida submarina</Text>
                  </View>
              </View>
          </View>
          <View style={styles.detailsContainer}>
              <View style={styles.detail}>
                  <Text style={styles.primaryText}>46K</Text>
                  <Text style={styles.secondaryText}>{t('profile.followers')} </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.primaryText}>{postsOfUser? postsOfUser.findPostByOwner.length : 0}</Text>
          <Text style={styles.secondaryText}>{t('profile.posts')}</Text>
              </View>
              <View style={styles.detail}>
                  <Text style={styles.primaryText}>17</Text>
                  <Text style={styles.secondaryText}>{t('profile.challenges')}</Text>
              </View>
              <View style={{backgroundColor: 'transparent'}}>
                <Button
                    style={{backgroundColor: colors.accent, borderRadius: 20}}
                    onPress={() => {
                    }} color={colors.background} labelStyle={{fontWeight: 'bold', fontFamily: 'sans'}}
                > {t('profile.about')}
                </Button>
              </View>
          </View>
          <View style={styles.sectionContainer}>
              <Text style={styles.primaryText}>{t('profile.active-challenges')}</Text>
              <ScrollView horizontal={true}>
                {challengesData?.getCreatedChallengesByUser?.map(challenge => {
            if (new Date(challenge.endEvent) < new Date()) return getActiveChallenge(challenge);
                })}
              </ScrollView>
          </View>
        {postsOfUser &&
        <View style={styles.sectionContainer}>
            <Text style={styles.primaryText}>{t('profile.posts')}</Text>
            <ScrollView horizontal={true}>
              {postsOfUser.findPostByOwner.map((post, i) => {
                return <PostThumbnail onPressed={(postId) => {
                  setViewPostId(postId);
                  setViewPost(true);
                }} postId={post.id} onError={onError} upvotes={post.upvotes} title={post.title} key={i}/>
              })}
            </ScrollView>
        </View>
        }
          <View style={{...styles.sectionContainer}}>
              <Text style={styles.primaryText}>{t('profile.finished-challenges')}</Text>
              <ScrollView horizontal={true}>
                {challengesData?.getCreatedChallengesByUser?.map(challenge => {
              if (new Date(challenge.endEvent) >= new Date()) return getFinishedChallenge(challenge);
                })}
              </ScrollView>
          </View>
        { !props.otherUserId && <View style={[styles.sectionContainer, styles.logout, {marginBottom: 100}]}>
          <Button
              uppercase={false}
              mode={'outlined'}
              style={{width: '40%'}}
              onPress={() => {
                auth.signOut().catch(e => console.log(e))
              }}
          >
            {t('profile.logout')}
          </Button>
        </View>}
      </ScrollView>
      }
      {viewPost && postData &&
      <Card style={styles.creationCard}>
          <Image source={require('../../assets/images/dots.png')} resizeMode={'cover'} style={styles.background}/>
          <View style={{width: '25%', backgroundColor: 'rgba(0,0,0,0)',}}>
              <IconButton onPress={() => setViewPost(false)}
                          icon={'chevron-left'}
                          style={styles.button}
              />
          </View>
          <ViewPost open post={{...postData.findPostById, upVotes: postData.findPostById.upvotes}}/>
      </Card>
      }
    </View>
  );
}

