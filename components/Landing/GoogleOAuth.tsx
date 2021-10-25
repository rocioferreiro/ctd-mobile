import React, {useContext} from 'react';
import {Image, Pressable, Dimensions} from 'react-native';
import {View} from "../Themed";
import * as Google from 'expo-google-app-auth';
import {AuthContext} from "../../App";
import Toast from "react-native-toast-message";
import {useMutation} from "@apollo/client";
import {SAVE_GOOGLE_USER} from "../apollo-graph/Mutations";
import {setContext} from "@apollo/client/link/context";
import {getToken} from "../Storage";
import {jsonToGoogleLogin} from "../Models/User";
import {androidClientId, iOSClientId} from "../../ClientId";

const AuthScreen = () => {

  const auth = useContext(AuthContext);
  const [saveUser, {data: user, client}] = useMutation(SAVE_GOOGLE_USER, {
    onCompleted: response => {
      auth.signIn({idUser: response.saveGoogleUser.id, token: response.saveGoogleUser.token, refreshToken: ''}).catch(() => {
        toastOn('Error', 'Something went wrong')
      });
    },
    onError: error => {
      console.log(error);
    }
  });

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
        saveUser({variables: {googleUser: jsonToGoogleLogin(result)}}).then(res => {
          console.log(res.data)
          auth.signIn({idUser: res.data.saveGoogleUser.id, token: result.accessToken, refreshToken: result.refreshToken, tokenType: 'google'}).catch(() => {
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
      console.log('error')
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
