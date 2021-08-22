import React, {useEffect, useState} from "react";
import {View, Platform, Image, Dimensions, StyleSheet} from "react-native";
import * as IPicker from 'expo-image-picker';
import {Icon} from "react-native-elements";
import {Button, useTheme} from "react-native-paper";

const ImagePicker = () =>  {
  const [image, setImage] = useState(null);
  const {colors} = useTheme()

  const styles = StyleSheet.create({
    container: {
      margin: 50,
    },
    card: {
      width: '100%',
      minHeight: Dimensions.get('window').height * 0.74,
      padding: '3%',
      borderWidth: 0,
      backgroundColor: 'rgba(0,0,0,0)'
    },
    iconWrap: {
      display: "flex",
      justifyContent:"center",
      width: 40,
      height: 40,
      borderRadius: 50,
      backgroundColor: colors.accent,
    },
    icon: {
      textAlign: 'center',
    },
    buttonWrap:{
      display: "flex",
      flexDirection: "row",
      justifyContent: 'space-evenly',
      width: Dimensions.get('window').width*0.7,
      marginTop: 5
    }
  })

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await IPicker.requestMediaLibraryPermissionsAsync();
        const { status: camaraStat } = await IPicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const takeImage = async () => {
    let result = await IPicker.launchCameraAsync({
      mediaTypes: IPicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result);

    if (!result.cancelled) {
      // @ts-ignore
      setImage(result.uri);
    }
  }

  const pickImage = async () => {
    let result = await IPicker.launchImageLibraryAsync({
      mediaTypes: IPicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      // @ts-ignore
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {image ? <Image source={{ uri: image }} style={{ width: Dimensions.get('window').width*0.7, height: 200, borderRadius: 20 }} />:
      <Image source={require('../../../assets/images/no-image.png')} style={{ width: Dimensions.get('window').width*0.7, height: 200, borderRadius: 20 }} />}
      <View style={styles.buttonWrap}>
        <Button style={styles.iconWrap} onPress={pickImage}><Icon style={styles.icon} name={'image-outline'} type={'ionicon'}/></Button>
        <Button style={styles.iconWrap} onPress={takeImage}><Icon style={styles.icon} name={'camera-outline'} type={'ionicon'}/></Button>
      </View>
    </View>
  );
};

export default ImagePicker;
