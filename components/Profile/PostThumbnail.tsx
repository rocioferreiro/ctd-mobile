import React from 'react';
import {Text, View} from "../Themed";
import {ImageBackground, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";
import {useTheme} from "react-native-paper";

const PostThumbnail = () => {
  const {colors} = useTheme();

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
  </View>);
}

export default PostThumbnail;
