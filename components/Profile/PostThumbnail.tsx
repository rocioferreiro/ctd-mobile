import React from 'react';
import {Text, View} from "../Themed";
import {ImageBackground, StyleSheet} from "react-native";
import {IconButton, useTheme} from "react-native-paper";
import {useMutation} from "@apollo/client";
import {CREATE_POST, LIKE_POST, UNLIKE_POST} from "../apollo-graph/Mutations";
import {getUserId} from "../Storage";

type Props = {
  title: string,
  upvotes: string,
  onError: (error) => void,
  postId: string
}

const PostThumbnail = (props: Props) => {
  const {colors} = useTheme();
  const userId = getUserId();
  const [liked, setLiked] = React.useState(false);
  const [likePost] = useMutation(LIKE_POST, {
    onCompleted: () => {
      setLiked(true);
    },
    onError: err => {
      props.onError(err);
    },
    refetchQueries: []
  });
  const [unlikePost] = useMutation(UNLIKE_POST, {
    onCompleted: () => {
      setLiked(false);
    },
    onError: err => {
      props.onError(err);
    },
    refetchQueries: []
  });

  const styles = StyleSheet.create({
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
    footer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      width: 150,
      height: 30,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    },
    whiteText: {
      fontSize: 12,
      color: colors.background
    },
  });

  return (
    <View style={{backgroundColor: 'transparent', marginRight: 20}}>
    <ImageBackground style={{height: 180, width: 150}}
                     imageStyle={{borderTopLeftRadius: 12, borderTopRightRadius: 12}}
                     source={require('../../assets/images/post.jpg')} resizeMode={'cover'}>
      <View style={styles.imageTextContainer}>
        <Text style={styles.whiteText}>{props.title}</Text>
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
        <IconButton
          onPress={() => {
            if (liked) unlikePost({variables: {userId: userId, postId: props.postId}}).then((r) => console.log(r))
            else likePost({variables: {userId: userId, postId: props.postId}}).then((r) => console.log(r))
          }}
          icon={liked ? 'heart' : 'heart-outline'}
          color={colors.background}
        />
        <Text style={styles.whiteText}>{props.upvotes + liked}</Text>
      </View>
      <View style={{backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}}>
        <IconButton icon={'chat-outline'} color={colors.background}/>
        <Text style={styles.whiteText}>0</Text>
      </View>
    </View>
  </View>);
}

export default PostThumbnail;
