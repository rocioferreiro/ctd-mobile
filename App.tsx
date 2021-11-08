import {StatusBar} from 'expo-status-bar';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import useCachedResources from './hooks/useCachedResources';
import {ApolloProvider} from '@apollo/client';
import {getApolloClientInstance} from './components/apollo-graph/Client';
import {configureFonts, DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {useFonts} from 'expo-font';
import {LogBox} from 'react-native';
import * as Linking from "expo-linking";
import Landing from "./components/Landing/Landing";
import {
  deleteRefreshToken,
  deleteToken, deleteTokenType,
  deleteUserId,
  getTokenAndUserId, saveRefreshToken,
  saveToken, saveTokenType,
  saveUserId
} from "./components/Storage";
import {View} from "./components/Themed";
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import './i18n';
import NewTabBar from "./navigation/NewTabBar";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import firebase from "firebase";
import {firebaseConfig} from "./ClientId";

i18next.init({
  interpolation: {escapeValue: false},  // React already does escaping
});
LogBox.ignoreAllLogs();

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      extra: string,
      light: string
    }
  }
}

const _fontConfig = {
  regular: {
    fontFamily: 'ApfelGrotezk',
    fontWeight: 'normal' as 'normal',
  },
  medium: {
    fontFamily: 'ApfelGrotezk',
    fontWeight: 'normal' as 'normal',
  },
  light: {
    fontFamily: 'ApfelGrotezk',
    fontWeight: 'normal' as 'normal',
  },
  thin: {
    fontFamily: 'ApfelGrotezk',
    fontWeight: 'normal' as 'normal',
  },
};

const fontConfig = {
  ios: _fontConfig,
  android: _fontConfig,
  web: _fontConfig
}

type Auth = {
  signIn: (any) => Promise<void>,
  signOut: () => Promise<void>,
  signUp: () => void
}

// @ts-ignore
export const AuthContext = React.createContext<Auth>();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [loaded] = useFonts({
    ApfelGrotezk: require('./assets/fonts/ApfelGrotezk-Regular.ttf'),
  });
  // React Native Paper Theme.
  // To check all options see:
  // (https://github.com/callstack/react-native-paper/blob/main/src/styles/DefaultTheme.tsx)
  const reactNativePaperTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15006D',
      accent: '#FFC300',
      background: '#ffffff',
      surface: '#FFF3E9',
      text: '#383c53',
      notification: '#F24726',
      extra: '#8FD14F',
      light: '#8FA1ff'
    },
    fonts: configureFonts(fontConfig),
  };

  const initialLoginState = {
    isLoading: true,
    userToken: null,
    userId: null
  };
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userId: action.userId,
          userToken: action.userToken,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userId: action.userId,
          userToken: action.userToken,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userId: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userId: action.userId,
          userToken: action.userToken,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  const authContext: Auth = React.useMemo(() => ({
    signIn: async (userInfo) => {
      saveToken(userInfo.token).catch(e => {
        console.log(e);
      });
      saveUserId(userInfo.idUser).catch(e => {
        console.log(e);
      });
      saveRefreshToken(userInfo.refreshToken).catch(e => {
        console.log(e);
      });
      saveTokenType(userInfo.tokenType).catch(e => {
        console.log(e);
      })
      dispatch({type: 'LOGIN', userToken: userInfo.token, userId: userInfo.idUser});
    },
    signOut: async () => {
      deleteToken().catch(e => {
        console.log(e);
      });
      deleteUserId().catch(e => {
        console.log(e);
      });
      deleteRefreshToken().catch(e => {
        console.log(e);
      });
      deleteTokenType().catch(e => {
        console.log(e);
      })
      dispatch({type: 'LOGOUT'});
    },
    signUp: () => {
      // Sign Up
    }
  }), []);
  // This useEffect fetches the token from the storage so that the user doesn't have to log in every time
  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    setTimeout(async () => {
      getTokenAndUserId().then(r => {
        dispatch({type: 'RETRIEVE_TOKEN', userToken: r.token, userId: r.id});
      }).catch(e => {
        console.log(e);
        dispatch({type: 'RETRIEVE_TOKEN', userToken: null, userId: null});
      })
    }, 1000);
  }, []);

  const prefix = Linking.createURL("/");

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Landing: "landing",
        NewTabBar: {
          screens: {
            VerifyChallenge: "verify-challenge/:challengeId"
          }
        }
      },
    },
  };

  const Stack = createNativeStackNavigator();

  if (!isLoadingComplete || !loaded || loginState.isLoading) {
    return (
      <SafeAreaProvider>
        <I18nextProvider i18n={i18next}>
          <View/>
        </I18nextProvider>
      </SafeAreaProvider>
    );
  } else {
    return (
      <SafeAreaProvider>
        <I18nextProvider i18n={i18next}>
          <ApolloProvider client={getApolloClientInstance()}>
            <PaperProvider theme={reactNativePaperTheme}>
              <AuthContext.Provider value={authContext}>
                <NavigationContainer linking={linking}>
                  <Stack.Navigator screenOptions={{
                    headerShown: false
                  }}>
                    {(loginState.userToken && loginState.userId) ?
                      <Stack.Screen name={'NewTabBar'} component={NewTabBar}/>
                      :
                      <Stack.Screen name={'Landing'} component={Landing}/>
                    }
                  </Stack.Navigator>
                </NavigationContainer>
                <Toast ref={(ref) => Toast.setRef(ref)}/>
              </AuthContext.Provider>
            </PaperProvider>
            <StatusBar/>
          </ApolloProvider>
        </I18nextProvider>
      </SafeAreaProvider>
    );
  }
}
