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

const AuthScreen = () => {

  const auth = useContext(AuthContext);
  const [saveUser, {data: user, client}] = useMutation(SAVE_GOOGLE_USER, {
    onCompleted: response => {
      auth.signIn({idUser: response.saveGoogleUser.id, token: response.saveGoogleUser.token, refreshToken: ''}).then(() => {
        client.setLink(setContext(async (_, {headers}) => {
          const token = await getToken();
          return {
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : "",
            }
          }
        }))
      }).catch(() => {
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
        androidClientId: '746337143443-o7i5sscrcv8n70g445an6fc6orcagco9.apps.googleusercontent.com',
        iosClientId: '746337143443-uph0bsq7i5sthtddijmn217qlr20edti.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      console.log('this is the result');
      console.log(result);

      if (result.type === 'success') {
        // await saveUser({variables: {googleUser: jsonToGoogleLogin(result)}})
        // //TODO: send this info to back and create the real userId (not ready in back)
        //
        // auth.signIn({idUser: result.user.id, token: result.idToken}).catch(() => {
        //   toastOn('Error', 'Authentication Failed')
        // });
        // return result.accessToken;

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
