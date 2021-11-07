import {Avatar, Card, Divider, IconButton, Paragraph, useTheme} from "react-native-paper";
import OptionsMenu from "react-native-options-menu";
import React, {useState, useEffect} from "react";
import {Post} from "../Models/Post";
import {Icon} from "react-native-elements";
import {Text, View} from "../Themed";
import {Dimensions, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {useTranslation} from "react-i18next";
import {useLazyQuery} from "@apollo/client";
import {FIND_POST_BY_ID, NEW_FIND_USER_BY_ID} from "../apollo-graph/Queries";
import {getToken, getUserId} from "../Storage";
import {useMutation} from "@apollo/client";
import {LIKE_POST, UNLIKE_POST} from "../apollo-graph/Mutations";
import {share} from "../Share";
import * as Linking from 'expo-linking';
import ChallengeCard from "../ChallengeCard/ChallengeCard";

type Props = {
  post?: Post,
  additionalPosts?: Post[];
  open: boolean,
  route?: any,
  navigation?: any
  key:number
}

const ViewPost = (props:Props) => {
  const { colors } = useTheme();
  const [userId, setUserId] = React.useState('');
  const [liked, setLiked] = React.useState(false);
  const [owner, setOwner] = React.useState<any>()
  const {t, i18n} = useTranslation();
  const [post, setPost] = useState<Post>();
  const [additionalPosts, setAdditionalPosts] = useState<Post[]>();
  const [likes, setLikes] = React.useState<number>()
  const [token,setToken] = React.useState('')
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [scrollToIndex,setScrollToIndex]= useState()
  const [ref, setRef] = useState(null);

  React.useEffect(() => {
    getToken().then(t => setToken(t))
    setScrollToIndex(props.route.params.key)
  }, []);

  useEffect(()=>{
    //console.log(scrollToIndex)
    //console.log(ref)
    console.log(dataSourceCords)
    if(dataSourceCords.length>0 && scrollToIndex && ref) {
      console.log("inside use effect")
      scrollHandler()
    }
    else{
      console.log("else")
    }

  }, [dataSourceCords,setDataSourceCords,scrollToIndex,ref])


  const scrollHandler = () => {
    console.log(dataSourceCords.length, scrollToIndex);
    ref.scrollTo({
      x: 0,
      y: dataSourceCords[scrollToIndex],
      animated: true,
    });

  };
  const [getPost] = useLazyQuery(FIND_POST_BY_ID, {
    context: {
      headers: {'Authorization' : 'Bearer ' + token}
    },
    onCompleted: (data) => {
      setPost(data.findPostById)
      setLikes(data.findPostById.upvotes)
    },
    onError: error => {
      console.log(error)
    }
  })

  React.useEffect(() => {
    if(token != ''){
      if(props.post) {
        setPost(props.post)
        setLikes(props.post.upvotes)
      }
      else {
        getPost({variables: {id:props.route.params?.postId}})
      }
    }
  }, [token])

  React.useEffect(() => {
    if (props.additionalPosts) setAdditionalPosts(props.additionalPosts);
    else if (props.route.params?.additionalPosts) setAdditionalPosts(props.route.params.additionalPosts);
  }, [props.route.params, props.additionalPosts])


  const [getOwnerData, {data: ownerData}] = useLazyQuery(NEW_FIND_USER_BY_ID, {
    context: {
      headers: {'Authorization' : 'Bearer ' + token}
    },
    onCompleted: (data) => {
      setOwner(data.findUserById.user);
   },
  onError: error => {
      console.log('view post error');
      console.log(error);
  }});

  const [like] = useMutation(LIKE_POST, {
    onCompleted: () => {
    },
    onError: err => {
    },
    refetchQueries: [],
    context: {
      headers: {'Authorization' : 'Bearer ' + token}
    }
  });
  const [unlike] = useMutation(UNLIKE_POST, {
    onCompleted: () => {
    },
    onError: err => {
    },
    refetchQueries: [],
    context: {
      headers: {'Authorization' : 'Bearer ' + token}
    }
  });

  const styles = StyleSheet.create({
    button: {
      position: 'absolute',
      zIndex: 2,
      top: 0,
      left: 0,
      padding: 0,
      margin: 0
    }
  })

  const likePost = (isLiking: boolean)  => {
    if (isLiking) {
      setLikes(likes + 1)
      like({variables: {userId: userId, postId: post.id}});
    } else {
      setLikes(likes - 1)
      unlike({variables: {userId: userId, postId: post.id}});
    }
    setLiked(!liked)
  }

  const [language, setLanguage] = React.useState(i18n.language);

  useEffect(() => {
    if (ownerData) {
      setOwner(ownerData.findUserById.user);
    }
  }, [ownerData]);

  useEffect(() => {
    if (post && post.owner) {
      getUserId().then(id => {
        getOwnerData({variables: {targetUserId: post.owner.id? post.owner.id : post.owner}});
        setUserId(id);
        if (post.owner.id == id) setLiked(true);
      })
      scrollHandler()
    }

  }, [post])

  const myIcon = <Icon type={'ionicon'} name={'ellipsis-horizontal'} style={{marginRight: 10}} {...props}/>
  const LeftContent = props => <Avatar.Text style={{width: 50, height: 50, borderRadius: 50, backgroundColor: colors.extra}} label={owner && (owner.name[0] + owner.lastname[0])} {...props}/>
  const RightContent = props => <OptionsMenu
    customButton={myIcon}
    destructiveIndex={0}
    options={[t('view-post.report'), t('view-post.copy-link'), t('view-post.disconnect'), t('view-post.cancel')]}
    actions={[()=>{console.log("TODO Report Post")}, ()=>{console.log("TODO Copy Link")}, ()=>{console.log("TODO Disconnect to user")},()=>{}]}/>

  const getPostCard = (post) => {
    return (
        <View >
        <Card style={{backgroundColor: colors.background, borderRadius: 20, marginHorizontal: 10, marginTop: 10}}>
          <TouchableOpacity onPress={() => {
            props.navigation.navigate('profile', {otherId: post.owner?.id ? post.owner?.id : post.owner})
          }} style={{backgroundColor: 'transparent', marginRight: 20}}>
            <Card.Title subtitleStyle={{color: colors.primary, fontFamily: 'sans-serif-medium'}}
                        title={<Text style={{
                          fontWeight: 'bold',
                          color: colors.primary,
                          fontSize: 20,
                          fontFamily: 'sans-serif-medium'
                        }}>{owner && owner.mail}</Text>}
                        subtitle={post.creationDate}
                        left={LeftContent}
                        right={RightContent}/>
          </TouchableOpacity>
          <Card.Content style={{marginHorizontal: 7, marginBottom: 10}}>
            <Text style={{
              fontSize: 20, color: colors.primary,
              marginTop: 5, fontWeight: 'bold'
            }}>{post.title}</Text>
            <Paragraph style={{color: colors.primary, fontSize: 17, marginBottom: 5}}>{post.text}</Paragraph>
          </Card.Content>
          {(post.image && post.image !== "") && <Card.Cover style={{marginHorizontal: 15, borderRadius: 20}}
                                                            source={require('../../assets/images/post.jpg')}/>}
          <Card.Actions style={{width: '100%', display: 'flex', justifyContent: 'space-between', marginVertical: 10}}>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 15,
              backgroundColor: 'rgba(0,0,0,0)'
            }}>
              <IconButton disabled={post.owner?.id == userId} icon={liked ? 'heart' : 'heart-outline'}
                          onPress={() => likePost(!liked)}/>
              <Text style={{marginRight: 10, color: colors.primary}}> {likes} </Text>
              {/*<Icon name={'chat-outline'} type={'material-community'} style={{color: colors.primary}} onPress={() => {}}/>*/}
              {/*<Text style={{color: colors.primary}}> 1 </Text>*/}
            </View>
            <View style={{marginRight: 15, backgroundColor: 'rgba(0,0,0,0)'}}>
              <Icon name={'share-variant'} style={{color: colors.primary}} type={'material-community'} onPress={() => {
                let redirectUrl = Linking.createURL('post', {
                  queryParams: { id: post.id },
                });
                share(redirectUrl);
              }}/>
            </View>
          </Card.Actions>
          {/*<Modal animationType="fade"*/}
          {/*       presentationStyle={"fullScreen"}*/}
          {/*       visible={viewProfile}*/}
          {/*       onRequestClose={() => {*/}
          {/*         setViewProfile(!viewProfile);*/}
          {/*       }}>*/}
          {/*  <IconButton onPress={() => setViewProfile(false)}*/}
          {/*              icon={'chevron-left'}*/}
          {/*              style={[styles.button, Platform.OS === 'ios' ? {marginTop: 15}: {}]}*/}
          {/*              size={40}*/}
          {/*  />*/}
          {/*  <Profile navigation={props.navigation} otherUserId={typeof post.owner === "string" ? post.owner : post.owner.id}/>*/}
          {/*</Modal>*/}
        </Card>
        </View>
    )
  }

  return (<View style={{ backgroundColor: colors.surface}}>
    <ScrollView ref={(ref) => {
      setRef(ref);
    }} style={{
      marginBottom: Dimensions.get('screen').height * 0.15,
      marginTop: Dimensions.get('screen').height * 0.04,
      backgroundColor: 'rgba(0,0,0,0)',
      overflow: "visible"
    }}>
      {props.route.params.additionalPosts.map((post, i) =>
        <View   onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        let aux= [...dataSourceCords]
        aux[i]=layout.y
        // dataSourceCords[i] = layout.y;
        setDataSourceCords(aux);
        /*  console.log(dataSourceCords);
          console.log('height:', layout.height);
          console.log('width:', layout.width);
          console.log('x:', layout.x);*/
        console.log('y:', layout.y);

      }} key={i} style={{marginBottom: 5,backgroundColor: colors.surface}}>
          <View style={{ backgroundColor: colors.surface}}>
            <Card style={{backgroundColor: colors.background, borderRadius: 20, marginHorizontal: 10, marginTop: 10}}>
              <TouchableOpacity onPress={() => {
                props.navigation.navigate('profile', {otherId: post.owner?.id ? post.owner?.id : post.owner})
              }} style={{backgroundColor: 'transparent', marginRight: 20}}>
                <Card.Title subtitleStyle={{color: colors.primary, fontFamily: 'sans-serif-medium'}}
                            title={<Text style={{
                              fontWeight: 'bold',
                              color: colors.primary,
                              fontSize: 20,
                              fontFamily: 'sans-serif-medium'
                            }}>{owner && owner.mail}</Text>}
                            subtitle={post.creationDate}
                            left={LeftContent}
                            right={RightContent}/>
              </TouchableOpacity>
              <Card.Content style={{marginHorizontal: 7, marginBottom: 10}}>
                <Text style={{
                  fontSize: 20, color: colors.primary,
                  marginTop: 5, fontWeight: 'bold'
                }}>{post.title}</Text>
                <Paragraph style={{color: colors.primary, fontSize: 17, marginBottom: 5}}>{post.text}</Paragraph>
              </Card.Content>
              {(post.image && post.image !== "") && <Card.Cover style={{marginHorizontal: 15, borderRadius: 20}}
                                                                source={require('../../assets/images/post.jpg')}/>}
              <Card.Actions style={{width: '100%', display: 'flex', justifyContent: 'space-between', marginVertical: 10}}>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 15,
                  backgroundColor: 'rgba(0,0,0,0)'
                }}>
                  <IconButton disabled={post.owner?.id == userId} icon={liked ? 'heart' : 'heart-outline'}
                              onPress={() => likePost(!liked)}/>
                  <Text style={{marginRight: 10, color: colors.primary}}> {likes} </Text>
                  {/*<Icon name={'chat-outline'} type={'material-community'} style={{color: colors.primary}} onPress={() => {}}/>*/}
                  {/*<Text style={{color: colors.primary}}> 1 </Text>*/}
                </View>
                <View style={{marginRight: 15, backgroundColor: 'rgba(0,0,0,0)'}}>
                  <Icon name={'share-variant'} style={{color: colors.primary}} type={'material-community'} onPress={() => {
                    let redirectUrl = Linking.createURL('post', {
                      queryParams: { id: post.id },
                    });
                    share(redirectUrl);
                  }}/>
                </View>
              </Card.Actions>
              {/*<Modal animationType="fade"*/}
              {/*       presentationStyle={"fullScreen"}*/}
              {/*       visible={viewProfile}*/}
              {/*       onRequestClose={() => {*/}
              {/*         setViewProfile(!viewProfile);*/}
              {/*       }}>*/}
              {/*  <IconButton onPress={() => setViewProfile(false)}*/}
              {/*              icon={'chevron-left'}*/}
              {/*              style={[styles.button, Platform.OS === 'ios' ? {marginTop: 15}: {}]}*/}
              {/*              size={40}*/}
              {/*  />*/}
              {/*  <Profile navigation={props.navigation} otherUserId={typeof post.owner === "string" ? post.owner : post.owner.id}/>*/}
              {/*</Modal>*/}
            </Card>
          </View>
        </View>
      )}

  </ScrollView>

  </View>)

};


export default ViewPost;
