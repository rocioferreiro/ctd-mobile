import {StatusBar} from 'expo-status-bar';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import {ApolloProvider} from '@apollo/client';
import {getApolloClientInstance} from './components/apollo-graph/Client';
import {StyleSheet, Dimensions} from 'react-native';
import {configureFonts, DefaultTheme, Provider as PaperProvider, Text} from 'react-native-paper';
import {useFonts} from 'expo-font';
import Tabbar from "./navigation/BottomTabBar";
import {LogBox} from 'react-native';
import Landing from "./components/Landing/Landing";
import {deleteToken, getToken, saveToken} from "./components/Storage";
import {View} from "./components/Themed";

LogBox.ignoreAllLogs();

declare global {
    namespace ReactNativePaper {
        interface ThemeColors {
            extra: string,
            light: string
        }
    }
}

// I think this can be deleted... but I didn't because I am scared
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    icon: {
        color: '#4625FF'
    }
});

type Auth = {
    signIn: (any) => Promise<void>,
    signOut: () => Promise<void>,
    signUp: () => void
}

// @ts-ignore
export const AuthContext = React.createContext<Auth>();

export default function App() {
    const isLoadingComplete = useCachedResources();
    // I think this colorScheme thing can be deleted too, it is used to tell the navigation component
    // if we are using dark or light mode, but as we are using material ui paper instead I think it doesn't matter.
    // I didn't delete it tho...
    const colorScheme = useColorScheme();

    const [loaded] = useFonts({
        ApfelGrotezk: require('./assets/fonts/ApfelGrotezk-Regular.ttf'),
    });

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
    };

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
        }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext: Auth = React.useMemo(() => ({
        signIn: async (userToken) => {
            saveToken(userToken).catch(e => {
                console.log(e);
            });
            dispatch({type: 'LOGIN', token: userToken});
        },
        signOut: async () => {
            deleteToken().catch(e => {
                console.log(e);
            });
            dispatch({type: 'LOGOUT'});
        },
        signUp: () => {
            // Sign Up
        }
    }), []);

    // This useEffect fetches the token from the storage so that the user doesn't have to log in every time
    useEffect(() => {
        setTimeout(async () => {
            getToken().then(t => {
                dispatch({type: 'RETRIEVE_TOKEN', token: t});
            }).catch(e => {
                console.log(e);
                dispatch({type: 'RETRIEVE_TOKEN', token: null});
            })
        }, 1000);
    }, []);

    if (!isLoadingComplete || !loaded || loginState.isLoading) {
        return (
            <SafeAreaProvider>
                <View>
                    <Text>Loading...</Text>
                </View>
            </SafeAreaProvider>
        );
    } else {
        return (

            <SafeAreaProvider>
                <ApolloProvider client={getApolloClientInstance()}>
                    <PaperProvider theme={reactNativePaperTheme}>
                        <AuthContext.Provider value={authContext}>
                            {loginState.userToken ?
                                <>
                                    <Tabbar colorScheme={reactNativePaperTheme}/>
                                    <Toast ref={(ref) => Toast.setRef(ref)}/>
                                </>
                                :
                                <Landing/>
                            }
                        </AuthContext.Provider>
                    </PaperProvider>
                    <StatusBar/>
                </ApolloProvider>
            </SafeAreaProvider>
        );
    }
}
