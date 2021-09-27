import {Avatar, Button, Card, Colors, Paragraph, Title, useTheme} from "react-native-paper";
import OptionsMenu from "react-native-options-menu";
import React, {useRef} from "react";
import {Post} from "../Models/Post";
import {Icon} from "react-native-elements";
import {Text, View} from "../Themed";
import { captureRef } from 'react-native-view-shot';
import {PixelRatio} from "react-native";
import * as MediaLibrary from 'expo-media-library';
import {useTranslation} from "react-i18next";

type Props = {
  post: Post,
  open: boolean
}

const ViewPost = (props:Props) => {
  const { colors } = useTheme();
  const [liked, setLiked] = React.useState(false)
  const {post} = props;
  const [likes, setLikes] = React.useState(post.upVotes)
  const {t} = useTranslation();

  const likePost = (isLiking: boolean)  => {
    //TODO implement like post
    setLiked(!liked)
    isLiking? setLikes(likes+1) : setLikes(likes-1)
  }

  const myIcon = <Icon type={'ionicon'} name={'ellipsis-horizontal'} style={{marginRight: 10}} {...props}/>
  const LeftContent = props => <Avatar.Text style={{width: 50, height: 50, borderRadius: 50, backgroundColor: colors.extra}} label={post.owner.name[0] + post.owner.lastname[0] } {...props}/>
  const RightContent = props => <OptionsMenu
                                    customButton={myIcon}
                                    destructiveIndex={0}
                                    options={[t('view-post.report'), t('view-post.copy-link'), t('view-post.disconnect'), t('view-post.cancel')]}
                                    actions={[()=>{console.log("TODO Report Post")}, ()=>{console.log("TODO Copy Link")}, ()=>{console.log("TODO Disconnect to user")},()=>{}]}/>

  return (
    <Card style={{backgroundColor: colors.background, borderRadius: 20, marginHorizontal: 10, marginTop: 10}}>
      <Card.Title subtitleStyle={{color: colors.primary, fontFamily:'sans-serif-medium'}}
                  title={<Text style={{fontWeight: 'bold', color: colors.primary, fontSize: 20, fontFamily:'sans-serif-medium'}}>{post.owner.mail}</Text>}
                  subtitle={post.creationDate}
                  left={LeftContent}
                  right={RightContent}/>
      <Card.Content style={{marginHorizontal: 7, marginBottom: 10}}>
        <Text style={{
          fontSize: 20, color: colors.primary,
          marginTop: 5, fontWeight:'bold'
        }}>{props.post.title}</Text>
        <Paragraph style={{color: colors.primary, fontSize: 17, marginBottom: 5}}>{ post.text }</Paragraph>
      </Card.Content>
      {(post.image && post.image !== "") && <Card.Cover style={{marginHorizontal: 15, borderRadius: 20}} source={{uri: 'https://picsum.photos/700'}}/>}
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
    </Card>

  )
};


export default ViewPost;
