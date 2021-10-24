import React from 'react';
import {Text, View} from "../Themed";
import {ImageBackground, StyleSheet, TouchableOpacity} from "react-native";
import {IconButton, useTheme} from "react-native-paper";

type Props = {
    title: string,
    upvotes: string,
    onError: (error) => void,
    onPressed: (postId) => void,
    challengeId: string
}

const ChallengeThumbnail = (props: Props) => {
    const {colors} = useTheme();
    // const [likePost] = useMutation(LIKE_POST, {
    //   onCompleted: () => {
    //     setLiked(true);
    //   },
    //   onError: err => {
    //     props.onError(err);
    //   },
    //   refetchQueries: [],
    //   context: {
    //     headers: {
    //       'Authorization': 'Bearer ' + token
    //     }
    //   }
    // });
    // const [unlikePost] = useMutation(UNLIKE_POST, {
    //   onCompleted: () => {
    //     setLiked(false);
    //   },
    //   onError: err => {
    //     props.onError(err);
    //   },
    //   refetchQueries: [],
    //   context: {
    //     headers: {
    //       'Authorization': 'Bearer ' + token
    //     }
    //   }
    // });

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
        <TouchableOpacity onPress={() => {
            props.onPressed(props.challengeId);
        }} style={{backgroundColor: 'transparent', marginRight: 20}}>
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
            }}>
                <View style={{backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <IconButton
                        // onPress={() => {
                        //   if (liked) unlikePost({variables: {userId: userId, postId: props.postId}})//.then((r) => console.log(r))
                        //   else likePost({variables: {userId: userId, postId: props.postId}})//.then((r) => console.log(r))
                        // }}
                        icon={'heart'}
                        color={colors.background}
                    />
                    <Text style={styles.whiteText}>{props.upvotes}</Text>
                </View>
                {/*<View style={{backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}}>*/}
                {/*  <IconButton icon={'chat-outline'} color={colors.background}/>*/}
                {/*  <Text style={styles.whiteText}>0</Text>*/}
                {/*</View>*/}
            </View>
        </TouchableOpacity>);
}

export default ChallengeThumbnail;