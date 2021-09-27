import {Avatar, Card, IconButton, Paragraph, useTheme} from "react-native-paper";
import OptionsMenu from "react-native-options-menu";
import React, {useState, useEffect} from "react";
import {Post} from "../Models/Post";
import {Icon} from "react-native-elements";
import {Text, View} from "../Themed";
import {Modal, StyleSheet, TouchableOpacity} from "react-native";
import {useTranslation} from "react-i18next";
import {getUserId} from "../Storage";
import {useMutation} from "@apollo/client";
import {LIKE_POST, UNLIKE_POST} from "../apollo-graph/Mutations";
import {useLazyQuery} from "@apollo/client";
import {NEW_FIND_USER_BY_ID} from "../apollo-graph/Queries";
import {Profile} from "../Profile/Profile";

type Props = {
  post: Post,
  open: boolean
}

const ViewPost = (props:Props) => {
  const { colors } = useTheme();
  const userId = getUserId();
  const [liked, setLiked] = React.useState(false)
  const {post} = props;
  const [likes, setLikes] = React.useState(post.upvotes)
  const [owner, setOwner] = React.useState<any>()
  const {t, i18n} = useTranslation();
  const [viewProfile, setViewProfile] = useState(false);

  const [getOwnerData, {data: ownerData}] = useLazyQuery(NEW_FIND_USER_BY_ID);

  const [like] = useMutation(LIKE_POST, {
    onCompleted: () => {
    },
    onError: err => {
    },
    refetchQueries: []
  });
  const [unlike] = useMutation(UNLIKE_POST, {
    onCompleted: () => {
    },
    onError: err => {
    },
    refetchQueries: []
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
      like({variables: {userId: userId, postId: post.id}})
    } else {
      setLikes(likes - 1)
      unlike({variables: {userId: userId, postId: post.id}})
    }
    setLiked(!liked)
  }

  const [language, setLanguage] = React.useState(i18n.language);

  useEffect(() => {
    if (ownerData) {
      setOwner(ownerData.findUserById.user);
    }
  }, [ownerData])

  useEffect(() => {
    if (post.owner) {
      getUserId().then(id => {
        getOwnerData({variables: {targetUserId: post.owner, currentUserId: id}});
      })
    }
  }, [post])

  const myIcon = <Icon type={'ionicon'} name={'ellipsis-horizontal'} style={{marginRight: 10}} {...props}/>
  const LeftContent = props => <Avatar.Text style={{width: 50, height: 50, borderRadius: 50, backgroundColor: colors.extra}} label={owner && (owner.name[0] + owner.lastname[0])} {...props}/>
  const RightContent = props => <OptionsMenu
    customButton={myIcon}
    destructiveIndex={0}
    options={[t('view-post.report'), t('view-post.copy-link'), t('view-post.disconnect'), t('view-post.cancel')]}
    actions={[()=>{console.log("TODO Report Post")}, ()=>{console.log("TODO Copy Link")}, ()=>{console.log("TODO Disconnect to user")},()=>{}]}/>

  return (
    <Card style={{backgroundColor: colors.background, borderRadius: 20, marginHorizontal: 10, marginTop: 10}}>
      <TouchableOpacity onPress={() => {
        setViewProfile(true)
      }} style={{backgroundColor: 'transparent', marginRight: 20}}>
        <Card.Title subtitleStyle={{color: colors.primary, fontFamily:'sans-serif-medium'}}
                    title={<Text style={{fontWeight: 'bold', color: colors.primary, fontSize: 20, fontFamily:'sans-serif-medium'}}>{owner && owner.mail}</Text>}
                    subtitle={post.creationDate}
                    left={LeftContent}
                    right={RightContent}/>
      </TouchableOpacity>
      <Card.Content style={{marginHorizontal: 7, marginBottom: 10}}>
        <Text style={{
          fontSize: 20, color: colors.primary,
          marginTop: 5, fontWeight:'bold'
        }}>{props.post.title}</Text>
        <Paragraph style={{color: colors.primary, fontSize: 17, marginBottom: 5}}>{ post.text }</Paragraph>
      </Card.Content>
      {(post.image && post.image !== "") && <Card.Cover style={{marginHorizontal: 15, borderRadius: 20}} source={require('../../assets/images/post.jpg')}/>}
      <Card.Actions style={{width: '100%', display:'flex', justifyContent:'space-between', marginVertical: 10}}>
        <View style={{display:'flex', flexDirection:'row', alignItems: 'center', marginLeft: 15, backgroundColor:'rgba(0,0,0,0)'}}>
          <Icon name={liked ? 'heart' : 'heart-outline'} type={'material-community'} style={{color: colors.primary}} onPress={() => likePost(!liked)}/>
          <Text style={{marginRight: 10, color: colors.primary}}> {likes} </Text>
          {/*<Icon name={'chat-outline'} type={'material-community'} style={{color: colors.primary}} onPress={() => {}}/>*/}
          {/*<Text style={{color: colors.primary}}> 1 </Text>*/}
        </View>
        <View style={{marginRight:15, backgroundColor:'rgba(0,0,0,0)'}}>
          <Icon name={'share-variant'} style={{color: colors.primary}} type={'material-community'} onPress={() => {}}/>
        </View>
      </Card.Actions>
      <Modal animationType="fade"
             presentationStyle={"fullScreen"}
             visible={viewProfile}
             onRequestClose={() => {
               setViewProfile(!viewProfile);
             }}>
        <IconButton onPress={() => setViewProfile(false)}
                    icon={'chevron-left'}
                    style={styles.button}
                    size={40}
        />
        <Profile otherUserId={typeof post.owner === "string" ? post.owner : post.owner.id}/>
      </Modal>
    </Card>

  )
};


export default ViewPost;
