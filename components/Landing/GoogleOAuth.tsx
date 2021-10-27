import React, {useContext} from 'react';
import {Image, Pressable, Dimensions} from 'react-native';
import {View} from "../Themed";
import * as Google from 'expo-google-app-auth';
import {AuthContext} from "../../App";
import Toast from "react-native-toast-message";
import {useMutation} from "@apollo/client";
import {SAVE_GOOGLE_USER} from "../apollo-graph/Mutations";
import {jsonToGoogleLogin} from "../Models/User";
import {androidClientId, iOSClientId} from "../../ClientId";
import firebase from "firebase";

const AuthScreen = () => {

  const auth = useContext(AuthContext);
  const [saveUser] = useMutation(SAVE_GOOGLE_USER, {});

  function toastOn(message: string, description: string = '') {
    Toast.show({
      type: 'error',
      text1: message,
      text2: description,
      topOffset: Dimensions.get("window").height * 0.05,
    });
  }

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: androidClientId,
        iosClientId: iOSClientId,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {

        saveUser({variables: {googleUser: jsonToGoogleLogin(result)}}).then(async res => {
          console.log(res);
          console.log('hey?');
          const cred = firebase.auth.GoogleAuthProvider.credential(null, result.accessToken);
          await firebase.auth().signInWithCredential(cred).catch(console.error);
          auth.signIn({
            idUser: res.data.saveGoogleUser.id,
            token: result.idToken,
            refreshToken: result.refreshToken,
            tokenType: 'google'
          }).catch(() => {
            toastOn('Error', 'Authentication Failed')
          });
        }).catch(e => {
          console.log('error in google login mutation');
          console.log(e);
        });

        return result.accessToken;

      } else {
        console.log('cancelled')
      }
    } catch (e) {
      console.log('error');
      console.log(e);
    }
  }

  return (
    <View style={{backgroundColor: 'rgba(0,0,0,0)'}}>
      <Pressable onPress={signInWithGoogleAsync}>
        <Image source={require('../../assets/images/google-icon.png')} style={{width: 40, height: 40}}/>
      </Pressable>
    </View>
  )

}

export default AuthScreen;
