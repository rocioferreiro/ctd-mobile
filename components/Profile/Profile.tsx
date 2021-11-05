import "react-apollo"
import {View, Text} from "../Themed";
import React, {useContext, useEffect, useState} from "react";
import {
  Dimensions,
  ImageBackground,
  Modal, Platform,
  ScrollView,
  StyleSheet, TouchableOpacity,
  TouchableWithoutFeedback, View as ViewR
} from "react-native";
import {Icon, Button, Image} from "react-native-elements";
import {ActivityIndicator, Badge, IconButton, useTheme} from "react-native-paper";
import {Avatar, ProgressBar} from 'react-native-paper';
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {
  FIND_POSTS_OF_USER,
  GET_CONNECTIONS, GET_VERIFIED_CHALLENGES,
  NEW_FIND_USER_BY_ID, NEW_GET_PENDING_CONNECTIONS, PENDING_CONNECTION_REQUESTS_NUMBER
} from "../apollo-graph/Queries";
import {AuthContext} from "../../App";
import {useTranslation} from "react-i18next";
import OptionsMenu from "react-native-options-menu";
import { Row, Grid } from "react-native-easy-grid";
import {Image as ImageElement} from 'react-native-elements';
import PostThumbnail from "./PostThumbnail";
import Toast from "react-native-toast-message";
import {onuLogos} from "../ONUObjectives";
import {FIND_CHALLENGES_OF_USER} from "../apollo-graph/Queries";
import {getToken, getUserId} from "../Storage";
import {CONNECT, DISCONNECT} from "../apollo-graph/Mutations";
import {Button as Button2} from "react-native-paper"
import ConnectionsFeed from "../ConnectionsFeed/ConnectionsFeed";
import NoResults from "./NoResults";
import {getXpRange, Role} from "../Models/User";
import ConfirmationModal from "../Challenge/ConfirmationModal";
import Timeline from 'react-native-timeline-flatlist';
import {colorShade} from "../Models/shadingColor";
import {createPDF, PROFILE_HTML} from "./PDF/CreatePDF";
import MenuDrawer from 'react-native-side-drawer'

enum ConnectionStatus {
  connect = "Connect",
  pending = "Pending",
  connected = "Connected"
}

interface Props {
  navigation: any,
  route?: any
}

function prettifyDate(date) {
  return date.toLocaleString('default', {month: 'short'}) + ' ' + date.toLocaleString('default', {day: '2-digit'})
}

export function Profile(props: Props) {
  const [open, setOpen] = React.useState(false)
  const {colors} = useTheme();
  const auth = useContext(AuthContext);
  const [isCreator, setCreator] = useState<boolean>(false)
  const [userId, setUserId] = useState('');
  const [loggedInUserId, setLoggedInUserId] = useState('');
  const [viewPost, setViewPost] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>();
  const [viewConnectionsFeed, setViewConnectionsFeed] = useState(false);
  const [viewBiography, setViewBiography] = useState(false);
  const [token, setToken] = React.useState('')
  const [timeLineData, setTimeLineData] = React.useState([])
  const [getVerifiedChallenges, {
    data: verifiedChallengesData,
    loading: verifiedLoading
  }] = useLazyQuery(GET_VERIFIED_CHALLENGES, {
    fetchPolicy: 'cache-and-network',
    context: {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
  })
  const [findPostsOfUser, {data: postsOfUser}] = useLazyQuery(FIND_POSTS_OF_USER, {
    fetchPolicy: 'cache-and-network',
    context: {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
  });
  const [getUser, {data: userData}] = useLazyQuery(NEW_FIND_USER_BY_ID, {
    context: {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    },
    fetchPolicy:"cache-and-network",
    onError: error => {
      console.log('profile error');
      console.log(error);
    },
    onCompleted: data => {
      console.log(data)
      console.log(data.findUserById.user.favouriteODS.length)
      if (data.findUserById.state === "ACCEPTED") setConnectionStatus(ConnectionStatus.connected)
      if (data.findUserById.state === "PENDING") setConnectionStatus(ConnectionStatus.pending)
      else setConnectionStatus(ConnectionStatus.connect)
    }
  });
  const [getLoggedInUser, {data: loggedInUserData}] = useLazyQuery(NEW_FIND_USER_BY_ID, {
    context: {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    },
    onError: error => {
      console.log('profile error');
      console.log(error);
    },
    onCompleted: result => {
      if (result.findUserById.user.role === Role.ENTERPRISE || result.level > 10) setCreator(true)
      else setCreator(false) // Change to true to see new challenge button
    }
  });
  const [getChallenges, {data: challengesData}] = useLazyQuery(FIND_CHALLENGES_OF_USER, {
    context: {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
  });
  const {data: connectionsData} = useQuery(GET_CONNECTIONS, {
    context: {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
  });
  const [getPendingConnections, {data: pendingConnectionsData}] = useLazyQuery(NEW_GET_PENDING_CONNECTIONS, {
    fetchPolicy: 'cache-and-network',
    context: {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
  });
  const [getConnectionRequestsNumber, {data: pendingConnectionsNumberData}] = useLazyQuery(PENDING_CONNECTION_REQUESTS_NUMBER, {
    variables: {userId: userId},
    fetchPolicy: 'cache-and-network',
    context: {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
  });
  const [connect] = useMutation(CONNECT, {
    onCompleted: () => {
      setConnectionStatus(ConnectionStatus.pending);
    },
    context: {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
  });
  const [disconnect] = useMutation(DISCONNECT, {
    onCompleted: () => {
      setConnectionStatus(ConnectionStatus.connect);
    },
    context: {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
  });

  useEffect(() => {
    getToken().then(t => {
      setToken(t);
      if (!props.route.params?.otherId) {
        getUserId().then(id => {
          setUserId(id);
          getLoggedInUser({variables: {targetUserId: id}});
          getConnectionRequestsNumber({variables: {userId: id}});
        });
        getVerifiedChallenges();
      }
    });
  }, []);
  useEffect(() => {
    if (props.route.params?.otherId) {
      setUserId(props.route.params?.otherId);
      getUserId().then(id => {
        setLoggedInUserId(id);
        getLoggedInUser({variables: {targetUserId: id}});
        getPendingConnections();
      });
    } else {
      getUserId().then(id => {
        setUserId(id);
        setLoggedInUserId(id);
      });
    }
  }, [props.route.params?.otherId]);
  useEffect(() => {
    if (userId && loggedInUserId) {
      findPostsOfUser({variables: {ownerId: userId}});
      getUser({variables: {targetUserId: userId}});
      getChallenges({variables: {userId: userId}});
    }
  }, [userId, loggedInUserId]);
  useEffect(() => {
    if (connectionsData && pendingConnectionsData && props.route.params?.otherId) {
      // if (connectionsData.getAllMyConnections.some(connection => connection === props.route.params?.otherId))
      //   setConnectionStatus(ConnectionStatus.connected);
      // else if (pendingConnectionsData.getMyPendingConnection.some(connection => connection.followUser.id === props.route.params?.otherId))
      //   setConnectionStatus(ConnectionStatus.pending);
      // else setConnectionStatus(ConnectionStatus.connect);
    }
  }, [connectionsData, pendingConnectionsData, props.route.params?.otherId]);
  useEffect(() => {
    if (verifiedChallengesData) {
      setTimeLineData(verifiedChallengesData.getVerifiedChallenges.map(c => {
        return {
          time: prettifyDate(new Date(c.endEvent)),
          year: new Date(c.endEvent).getFullYear(),
          id: c.id,
          title: c.title,
          description: c.description,
          imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
        };
      }))
    }
  }, [verifiedLoading])

  function toastError() {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Try again later',
      topOffset: Dimensions.get("window").height * 0.05,
    });
  }

  const onError = () => {
    toastError();
  }
  const toggleOpen = () => {
    setIsMenuOpen(!isMenuOpen)
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5
    },
    primaryText: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.primary,
      marginRight: 15,
      paddingBottom: 5
    },
    secondaryText: {
      fontSize: 12,
      color: colors.primary,
    },
    forODS: {
      marginTop: 10,
      width: 62,
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
      paddingHorizontal: 30,
      paddingVertical: 15
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
    imageCoverContainer: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'space-between'
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
    buttonAddChallenge: {
      backgroundColor: colors.extra,
      color: '#fff',
      borderRadius: 20,
      margin: 0,
      paddingVertical: 5,
      paddingHorizontal: 0,
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
      backgroundColor: colors.accent,
      borderRadius: 20,
      marginTop: 50,
      width: "40%",
      height: 30
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 5
    },
    descriptionContainer: {
      flexDirection: 'row',
      paddingRight: 50,
      backgroundColor: 'transparent',
      opacity: 1
    },
    imageInRow: {
      width: 60,
      minHeight: 60,
      height: 100,
      borderRadius: 5,
      marginTop: 3
    },
    textDescription: {
      marginLeft: 10,
      width: '90%',
      color: 'gray'
    },
    menuContainer: {
      backgroundColor: "transparent",
      alignItems: "flex-start",
      justifyContent: "center",
      zIndex: 3
    },
    animatedBox: {
      backgroundColor: colorShade(colors.surface, -5),
      height: Dimensions.get('window').height,
      padding: 20,
      zIndex: 3,
      paddingTop: Platform.OS === 'ios' ? 40 : 0,
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.5,
      shadowColor: '#DAB99D',
      elevation: 4,
    },
    menuBody: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      paddingRight: 10,
    },
    element:{
      width: 35,
      paddingRight: 2
    },
    menuBox: {
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'row',
      alignItems: "center",
      height: 60,
      paddingHorizontal: 5,
      borderTopColor: colorShade(colors.surface, -15),
      borderBottomColor: colorShade(colors.surface, -15),
      borderTopWidth: 1,
      borderBottomWidth: 1,
    }
  });
  const {t, i18n} = useTranslation();

  function renderTime(rowData, sectionID, rowID) {
    return <ViewR style={{
      backgroundColor: colors.primary,
      padding: 5,
      borderRadius: 13,
      width: 50,
      height: 70,
      justifyContent: "center",
      marginTop: 5
    }}>
      <Text style={{textAlign: 'center', color: 'white', fontSize: 17}}>{rowData.time}</Text>
      <Text style={{textAlign: 'center', color: 'white', fontSize: 13}}>{rowData.year}</Text>
    </ViewR>
  }

  function renderDetail(rowData, sectionID, rowID) {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>

    return (
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        {title}
        <View style={styles.descriptionContainer}>
          <Image source={{uri: rowData.imageUrl}} style={styles.imageInRow}/>
          <Text style={[styles.textDescription]}>{rowData.description}</Text>
        </View>
      </View>
    )
  }

  function onTimeLinePress(data) {
    props.navigation.navigate('challenge', {challengeId: data.id})
  }

  function handleDisconnect() {
    setOpen(true)
  }
  function doDisconnect() {
    disconnect({variables: {targetUserId: userId, followingUserId: loggedInUserId}}).catch(e => console.log(e));
    setOpen(false)
  }

  const onConnect = () => {
    switch (connectionStatus) {
      case ConnectionStatus.connect:
        // const target = userData.findUserById.user;
        // const following = loggedInUserData.findUserById.user;
        // const targetUser = {
        //   id: target.id, mail: target.mail, address: {
        //     coordinates: {
        //       latitude: target.address.coordinates.latitude,
        //       longitude: target.address.coordinates.latitude
        //     }
        //   }, favouriteODS: target.favouriteODS
        // };
        // const followingUser = {
        //   id: following.id, mail: following.mail, address: {
        //     coordinates: {
        //       latitude: target.address.coordinates.latitude,
        //       longitude: target.address.coordinates.latitude
        //     }
        //   }, favouriteODS: following.favouriteODS
        // };

        const variables = {variables: {followingUserId: userId}}
        connect(variables).catch(e => console.log(e));
        break;
      case ConnectionStatus.pending:
      case ConnectionStatus.connected:
        handleDisconnect()
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

  const getActiveChallenge = (challenge, key) => {
    if (!challenge) return null;
    return <TouchableOpacity onPress={() => props.navigation.navigate('tabbar', {
      screen: 'challenges-scrollview',
      params: {challengeId: challenge.id, challenges: challengesData.getCreatedChallengesByUser}
    })} style={{backgroundColor: 'transparent', marginRight: 20}} key={key}>
      <ImageBackground style={{height: 180, width: 150}}
                       imageStyle={{borderTopLeftRadius: 12, borderTopRightRadius: 12}}
                       source={require('../../assets/images/compost.jpg')} resizeMode={'cover'}>

        <View style={styles.imageTextContainer}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: colors.background}}>{challenge.title}</Text>
          <Text style={styles.whiteText}>{challenge.endEvent}</Text>
        </View>
      </ImageBackground>
      <View style={styles.footer}>
        <Text style={styles.whiteText}><Text
          style={[{fontWeight: 'bold'}, styles.whiteText]}>{challenge.score}</Text> Points</Text>
      </View>
    </TouchableOpacity>
  }
  const getFinishedChallenge = (challenge, key) => {
    if (!challenge) return null;
    return <TouchableOpacity onPress={() => props.navigation.navigate('tabbar', {
      screen: 'challenges-scrollview',
      params: {challengeId: challenge.id, challenges: challengesData.getCreatedChallengesByUser}
    })} style={{backgroundColor: 'transparent', marginRight: 20}} key={key}>
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
    </TouchableOpacity>
  }

  const myIcon = <View style={styles.menuBox}>
      <ImageElement style={{height: 35, width: 35}}
                    source={require('../../assets/images/logos/favpng_translation-language-google-translate-clip-art.png')}/>

      <Text> {t('profile.menuLanguage')} </Text>
  </View>

  function handleChange(itemValue) {
    i18n.changeLanguage(itemValue)
    console.log(i18n.language)
  }

  const getLocationString = () => {
    const address = userData?.findUserById?.user?.address;

    let location = null;

    if (address?.province) location = address.province;
    if (address?.country) location += ", " + address.country;
    if (!location) location = "Not completed";

    return location;
  }

  const drawerContent = () => {
    return (
      <View style={styles.animatedBox}>
        <Grid>
          <Row style={{padding: 0, margin: 0, maxHeight: 40}}>
            <TouchableOpacity onPress={toggleOpen}>
              <Icon type={'feather'} name={'x'}/>
            </TouchableOpacity>
          </Row>

          <OptionsMenu
            customButton={myIcon}
            options={["English", "Español", "Cancel"]}
            actions={[() => handleChange("en"), () => handleChange("es"), () => {
            }]}
          />
        <TouchableWithoutFeedback onPress={() => setViewConnectionsFeed(true)}>
          <View style={styles.menuBox}>
            {pendingConnectionsNumberData?.getMyPendingConnectionsNumber > 0 &&
            <Badge size={20} style={{
              backgroundColor: colors.accent,
              position: 'absolute',
              bottom: 10,
              left: -15,
              zIndex: 2
            }}>
              {pendingConnectionsNumberData?.getMyPendingConnectionsNumber}
            </Badge>}
            <Icon style={styles.element} type={'feather'} name={'user-plus'}/>
            <Text> {t('profile.menuReq')} </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('edit-profile')}>
          <View style={styles.menuBox}>
            <Icon style={styles.element} type={'feather'} name={'edit-2'}/>
            <Text> {t('profile.menuEdit')} </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {
          createPDF(PROFILE_HTML({
            username: userData?.findUserById?.user?.name + ' ' + userData?.findUserById?.user?.lastname,
            email: userData?.findUserById?.user?.mail,
            connected: userData?.findUserById?.connectionQuantity || 0,
            level: 2,
            verifiedChallenges: verifiedChallengesData ? verifiedChallengesData.getVerifiedChallenges.length : 0,
            sdg: [1,2,3], //userData?.findUserById?.user?.favouriteODS,
            challenges: verifiedChallengesData ?
              verifiedChallengesData.getVerifiedChallenges.map(c => {
                return {title: c.title, completionDate: c.endEvent, sdg: c.categories}
              })
              :
              []
          }));
        }}>
          <View style={styles.menuBox}>
            <Icon style={styles.element} type={'feather'} name={'download'}/>
            <Text> {t('profile.menuCv')} </Text>
          </View>
        </TouchableWithoutFeedback>
        </Grid>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MenuDrawer
        open={isMenuOpen}
        drawerContent={drawerContent()}
        drawerPercentage={70}
        animationTime={250}
        overlay={true}
        position={'right'}
        opacity={0.4}
      >
      <ConfirmationModal open={open} onClose={() => setOpen(false)} onAccept={() => doDisconnect()}
                         text={t('profile.modal-text')}
                         cancelText={t('profile.modal-cancel')} acceptText={t('profile.modal-accept')}/>
      {!viewPost &&
      <ScrollView>

          <ImageBackground style={styles.profileBackground}
            //imageStyle={{borderTopLeftRadius: 12, borderTopRightRadius: 12}}
                           source={require('../../assets/images/profile-background.jpg')} resizeMode={'cover'}>
            {props.route.params?.otherId && <View style={styles.imageCoverContainer}>
                <IconButton onPress={() => props.navigation.goBack()} style={{marginTop: 50}} icon={'chevron-left'}/>
                <Button2 icon="plus"
                         style={styles.connectButton}
                         onPress={() => onConnect()} color={colors.background}
                         labelStyle={{fontWeight: 'bold', fontSize: 11}}
                > {getConnectButtonLabel()}
                </Button2>
            </View>}
          </ImageBackground>

          <View style={styles.userInfoContainer}>
              <View style={{backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}}>
                  <Avatar.Image size={86} source={require('../../assets/images/profile.png')}
                                style={styles.profileImage}/>
                  <View style={{backgroundColor: 'transparent', marginRight: 25}}>
                      <Text
                          style={styles.primaryText}>{userData?.findUserById?.user?.name} {userData?.findUserById?.user?.lastname}</Text>
                      <Text style={styles.secondaryText}>{userData?.findUserById?.user?.mail}</Text>
                      <View style={{backgroundColor: 'transparent', alignItems: "flex-end", flex: 1, marginTop: -20}}>
                      </View>
                  </View>
              </View>
            {(!props.route.params?.otherId) &&
            <View style={styles.menuContainer}>

                    <TouchableOpacity onPress={toggleOpen} style={styles.menuBody}>
                        <Icon type={'feather'} name={'menu'} style={{color: colors.primary}}/>
                    </TouchableOpacity>

            </View>
            }
          </View>
          <View style={{backgroundColor: 'transparent', padding: 30}}>
              <View
                  style={{backgroundColor: 'transparent', flexDirection: "row", justifyContent: "space-between"}}>
                  <Text style={styles.secondaryText}>{t('profile.level')} {userData?.findUserById?.user?.level}</Text>
                  <Text style={styles.secondaryText}>{t('profile.level')} {userData?.findUserById?.user?.level+1}</Text>
              </View>
            {userData &&
              <View style={{backgroundColor: 'transparent'}}>
                <ProgressBar progress={userData?.findUserById?.user?.level === 0 ?
                  userData?.findUserById?.user?.xp / getXpRange(1)[1] :
                  userData?.findUserById?.user?.xp / getXpRange(userData?.findUserById?.user?.level)[1]}
                             color={colors.accent}
                             style={{height: 14, borderRadius: 8}}/>
              </View>
            }
              <View style={styles.objectivesContainer}>
                  <View>
                      <Avatar.Image size={50} source={onuLogos[0].image}
                                    style={styles.profileImage}/>
                      <Text style={[styles.secondaryText, styles.forODS]}>{t('onu-objective-info.no-poverty')}</Text>
                  </View>
                  <View>
                      <Avatar.Image size={50} source={onuLogos[1].image}
                                    style={styles.profileImage}/>
                      <Text style={[styles.secondaryText, styles.forODS]}>{t('onu-objective-info.zero-hunger')}</Text>
                  </View>
                  <View>
                      <Avatar.Image size={50} source={onuLogos[13].image}
                                    style={styles.profileImage}/>
                      <Text style={[styles.secondaryText, styles.forODS]}>{t('onu-objective-info.life-water')}</Text>
                  </View>
              </View>
          </View>
          <View style={styles.detailsContainer}>
              <View style={styles.detail}>
                  <Text style={styles.primaryText}>{userData?.findUserById?.connectionQuantity || 0}</Text>
                  <Text style={styles.secondaryText}>{t('profile.followers')} </Text>
              </View>
              <View style={styles.detail}>
                  <Text style={styles.primaryText}>{postsOfUser ? postsOfUser.findPostByOwner.length : 0}</Text>
                  <Text style={styles.secondaryText}>{t('profile.posts')}</Text>
              </View>
              <View style={styles.detail}>
                  <Text style={styles.primaryText}>{challengesData?.getCreatedChallengesByUser?.length || 0}</Text>
                  <Text style={styles.secondaryText}>{t('profile.challenges')}</Text>
              </View>
              <View style={{backgroundColor: 'transparent'}}>
                {!viewBiography ? <Button2
                    style={{backgroundColor: colors.accent, borderRadius: 20}}
                    onPress={() => setViewBiography(true)} color={colors.background} labelStyle={{fontWeight: 'bold'}}
                  > {t('profile.about')}
                  </Button2> :
                  <Icon onPress={() => setViewBiography(false)} style={{marginRight: 4}} type={'feather'} name={'x'}
                        color={colors.accent} size={32}/>}
              </View>
          </View>
        {!viewBiography ? <View style={{backgroundColor: 'transparent'}}>
          <View style={{...styles.sectionContainer, paddingTop: 30}}>
            {/*TODO change to challenges im subscribed to*/}
            <Text style={styles.primaryText}>{t('profile.active-challenges')}</Text>
            <ScrollView horizontal={true}>
              {challengesData?.getCreatedChallengesByUser?.map((challenge, key) => {
                return getActiveChallenge(challenge, key);
              })}
            </ScrollView>
            {(!challengesData?.getCreatedChallengesByUser || challengesData?.getCreatedChallengesByUser?.length == 0) &&
            <NoResults text={t('profile.no-results')}
                       subtext={props.route.params?.otherId ? '' : t('profile.no-challenges')}/>
            }
          </View>
          {postsOfUser &&
          <View style={styles.sectionContainer}>
              <Text style={styles.primaryText}>{t('profile.posts')}</Text>
              <ScrollView horizontal={true}>
                {postsOfUser?.findPostByOwner?.map((post, i) => {
                  return <PostThumbnail onPressed={(postId) => {
                    // setViewPostId(postId);
                    // setViewPost(true);
                    props.navigation.navigate('tabbar', {
                      screen: 'post',
                      params: {postId: postId, additionalPosts: postsOfUser.findPostByOwner}
                    })
                  }} postId={post.id} onError={onError} upvotes={post.upvotes} title={post.title} key={i}/>
                })}
              </ScrollView>
            {(postsOfUser?.findPostByOwner?.length == 0 || !postsOfUser?.findPostByOwner) && (!props.route.params?.otherId) &&
            <NoResults text={t('profile.no-results')}
                       subtext={props.route.params?.otherId ? '' : t('profile.no-posts')}/>
            }
          </View>
          }

          {(!props.route.params?.otherId && isCreator) &&
          <View style={{...styles.sectionContainer, paddingTop: 30}}>
              <View style={{
                backgroundColor: 'transparent',
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                height: 40,
                alignItems: "center"
              }}>
                  <Text style={styles.primaryText}>{t('profile.my-challenges')}</Text>
                  <Button onPress={() => props.navigation.navigate('challengeCreation')}
                          icon={{name: 'add', type: 'ionicon'}}
                          buttonStyle={styles.buttonAddChallenge}
                  />
              </View>

              <ScrollView horizontal={true}>
                {challengesData?.getCreatedChallengesByUser?.map((challenge, key) => {
                  if (new Date(challenge.endEvent) > new Date()) return getActiveChallenge(challenge, key);
                })}
              </ScrollView>
            {(!challengesData?.getCreatedChallengesByUser || challengesData?.getCreatedChallengesByUser?.filter(c => new Date(c.endEvent) > new Date()).length == 0) &&
            <NoResults text={t('profile.no-results')}
                       subtext={props.route.params?.otherId ? '' : t('profile.no-challenges')}/>
            }
          </View>
          }
          {(!props.route.params?.otherId) &&
          <View style={{...styles.sectionContainer}}>
              <Text style={styles.primaryText}>{t('profile.finished-challenges')}</Text>
              <Timeline
                  circleSize={20}
                  circleColor={colors.accent}
                  lineColor={colors.accent}
                  descriptionStyle={{color: '#c2c2c2'}}
                  renderDetail={renderDetail}
                  renderTime={renderTime}
                  detailContainerStyle={{
                    marginBottom: 30,
                    paddingLeft: 5,
                    paddingRight: 5,
                    backgroundColor: colorShade(colors.surface, -15),
                    borderRadius: 10
                  }}
                  options={{
                    style: {paddingTop: 1, paddingHorizontal: 10}
                  }}
                  data={timeLineData}
                  onEventPress={onTimeLinePress}
              />
            {(verifiedLoading) ? <ActivityIndicator size="large"/> : (timeLineData.length == 0) &&
                <NoResults text={t('profile.no-results')}
                           subtext={props.route.params?.otherId ? '' : t('profile.no-challenges')}/>
            }
          </View>
          }

          {!props.route.params?.otherId &&
          <View style={[styles.sectionContainer, styles.logout, {marginBottom: 100, marginTop: 30}]}>
              <Button2
                  uppercase={false}
                  mode={'outlined'}
                  style={{width: '40%'}}
                  onPress={() => {
                    auth.signOut().catch(e => console.log(e))
                    //props.navigation.navigate('landing')
                  }}
              >
                {t('profile.logout')}
              </Button2>
          </View>}

          <Modal animationType="fade"
                 presentationStyle={"fullScreen"}
                 visible={viewConnectionsFeed}
                 onRequestClose={() => {
                   setViewConnectionsFeed(!viewConnectionsFeed);
                   getConnectionRequestsNumber();
                 }}>
            <View style={{backgroundColor: colors.surface}}>
              <IconButton style={Platform.OS === 'ios' ? {marginTop: Dimensions.get("window").height * 0.05} : {}}
                          onPress={() => {
                            setViewConnectionsFeed(false)
                            getConnectionRequestsNumber()
                          }}
                          icon={'chevron-left'}
              />
            </View>
            <ConnectionsFeed navigation={props.navigation}/>
          </Modal>
        </View> : <View/>}
      </ScrollView>}
      </MenuDrawer>
    </View>
  );
}


