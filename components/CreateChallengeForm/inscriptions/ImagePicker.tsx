import React, {useEffect, useState} from "react";
import {View, Platform, Image, Dimensions, StyleSheet} from "react-native";
import * as IPicker from 'expo-image-picker';
import {Icon} from "react-native-elements";
import {useTheme, IconButton, Button} from "react-native-paper";
// import Auth from '@aws-amplify/auth';
// import Storage from '@aws-amplify/storage';
// import Amplify from '@aws-amplify/core';
// import awsconfig from './aws-exports';
// Amplify.configure(awsconfig);

// -------------- LOS COMMENTS DE ESTA CLASE SON PARA SUBIR Y BAJAR IMAGENES DE AWS S3, NO BORRAR --------------

type Props = {
  image: any,
  setImage: (any) => void
}

const ImagePicker = (props: Props) =>  {
  const {image, setImage} = props
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
      zIndex: 1
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
      mediaTypes: IPicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    })

    if (!result.cancelled) {
      // @ts-ignore
      setImage(result.base64);
    }
  }

  const pickImage = async () => {
    let result = await IPicker.launchImageLibraryAsync({
      mediaTypes: IPicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      // @ts-ignore
      setImage(result.base64);
    }
  };

  // handleImagePicked = async (pickerResult) => {
  //   try {
  //     if (pickerResult.cancelled) {
  //       alert('Upload cancelled');
  //       return;
  //     } else {
  //       setPercentage(0);
  //       const img = await fetchImageFromUri(pickerResult.uri);
  //       const uploadUrl = await uploadImage('demo.jpg', img);
  //       downloadImage(uploadUrl);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     alert('Upload failed');
  //   }
  // };
  //
  // uploadImage = (filename, img) => {
  //   Auth.currentCredentials();
  //   return Storage.put(filename, img, {
  //     level: 'public',
  //     contentType: 'image/jpeg',
  //     progressCallback(progress) {
  //       setLoading(progress);
  //     },
  //   })
  //     .then((response) => {
  //       return response.key;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       return error.response;
  //     });
  // };
  //
  // const setLoading = (progress) => {
  //   const calculated = parseInt((progress.loaded / progress.total) * 100);
  //   updatePercentage(calculated); // due to s3 put function scoped
  // };
  //
  // const updatePercentage = (number) => {
  //   setPercentage(number);
  // };
  //
  // downloadImage = (uri) => {
  //   Storage.get(uri)
  //     .then((result) => setImage(result))
  //     .catch((err) => console.log(err));
  // };
  //
  // const fetchImageFromUri = async (uri) => {
  //   const response = await fetch(uri);
  //   const blob = await response.blob();
  //   return blob;
  // };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {image ? <Image source={{uri: 'data:image/png;base64,' + image}} style={{ width: Dimensions.get('window').width*0.7, height: 200, borderRadius: 20 }} />:
      <Image source={require('../../../assets/images/no-image.png')} style={{ width: Dimensions.get('window').width*0.7, height: 200, borderRadius: 20 }} />}
      <View style={styles.buttonWrap}>
        <IconButton style={styles.iconWrap} onPress={pickImage} icon={'folder-image'} color={'#fff'}/>
        <IconButton style={styles.iconWrap} onPress={takeImage} icon={'camera'} color={'#fff'}/>
      </View>
    </View>
  );
};

export default ImagePicker;
