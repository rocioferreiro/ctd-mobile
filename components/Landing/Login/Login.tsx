import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from "../../Themed";
import {Dimensions, Image, StyleSheet} from "react-native";
import {Input} from "react-native-elements";
import {Button, useTheme} from "react-native-paper";
import LottieView from "lottie-react-native";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {validateEmail} from "../validations";
import {useMutation} from "@apollo/client";
import {LOGIN} from "../../apollo-graph/Mutations";
import {AuthContext} from "../../../App";
import Toast from "react-native-toast-message";
import {useTranslation} from "react-i18next";


type Props = {
    onCancel: () => void
}

const Login = (props: Props) => {
    const {colors} = useTheme();
    const auth = useContext(AuthContext);
    const [loginMutation, {loading}] = useMutation(LOGIN, {
        onCompleted: token => {
            // La query devuelve el token adentro de un field que se llama 'login', don't ask me why no lo devuelve asi nomas
            console.log(token.login)
            auth.signIn(token.login).catch(() => {
                toastOn('Error', 'Mail or Password is incorrect')
            });

        },
        onError: () => {
            toastOn('Error', 'Mail or Password is incorrect')
        }
    });
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [animationFinished, setAnimationFinished] = useState<boolean>(false);
    const [errorMarker, setErrorMarker] = useState({email: false});
    const visible = useSharedValue(3);
    const {t, i18n} = useTranslation('login');
    const [language, setLanguage] = React.useState(i18n.language);

    function toastOn(message: string, description: string = '') {
        Toast.show({
            type: 'error',
            text1: message,
            text2: description,
            topOffset: Dimensions.get("window").height * 0.05,
        });
    }

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: visible.value,
            zIndex: visible.value
        }
    }, []);

    const login = () => {
        loginMutation({variables: {loginUser: {mail: email, password: password}}}).catch(e => console.log(e));
    }

    const styles = StyleSheet.create({
        root: {
            display: "flex",
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0)'
        },
        title: {
            backgroundColor: 'rgba(0,0,0,0)',
            fontSize: 30,
            color: '#ffffff',
            fontWeight: 'bold',
            textAlignVertical: "center",
            height: 80
        },
        input: {
            marginTop: 5,
            width: '100%',
            backgroundColor: colors.surface,
            fontSize: 20,
            borderRadius: 30,
            padding: 15,
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.5,
            shadowColor: '#DAB99D',
            elevation: 4,
            height: 60
        },
        button: {
            backgroundColor: colors.primary,
            borderRadius: 20,
            borderWidth: 2,
            zIndex: 1,
            borderColor: colors.light,
            fontWeight: 'bold',
            padding: 2,
            minWidth: '40%',
        },
        cancelButton: {
            borderRadius: 20,
            backgroundColor: '#909090',
            fontWeight: 'bold',
            padding: 2,
            opacity: 0.8,
            minWidth: '40%'
        },
        logo: {
            height: 110,
            width: 110,
            margin: 30
        },
        animatedContainer: {
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0)',
            position: "absolute",
        },
        error: {
            color: colors.error,
            fontSize: 14,
            marginLeft: 13,
            marginRight: 13,
            textAlign: 'center',
            marginBottom: -25,
            zIndex: 5,
        }
    });

    useEffect(() => {
        visible.value = withTiming(0, {duration: 1000});
    }, [])

    return (
        <View style={styles.root}>
            <Animated.View style={[styles.animatedContainer, reanimatedStyle]}>
                <LottieView
                    source={require('../../../assets/lottie/liquid-transition.json')}
                    autoPlay
                    loop={false}
                    speed={3}
                    resizeMode={'cover'}
                    onAnimationFinish={() => {
                        setAnimationFinished(true)
                    }}
                />
            </Animated.View>
            {animationFinished &&
            <View style={styles.root}>
                <Image resizeMode={"contain"} source={require('../../../assets/images/ctd-logo.png')}
                       style={styles.logo}/>
                {errorMarker.email && <Text style={styles.error}> {t('login.email-error')} </Text>}
                <Input
                    placeholder={t('login.email')}
                    style={errorMarker.email ? [styles.input, {
                        borderWidth: 3,
                        borderColor: colors.error,
                        borderStyle: 'solid'
                    }] : styles.input}
                    value={email}
                    onChangeText={t => {
                        setEmail(t);
                        setErrorMarker({email: !validateEmail(t)});
                    }}
                    inputContainerStyle={{borderBottomWidth: 0}}
                />
                <Input
                    placeholder={t('login.password')}
                    style={styles.input}
                    value={password}
                    onChangeText={t => {
                        setPassword(t);
                    }}
                    secureTextEntry={true}
                    inputContainerStyle={{borderBottomWidth: 0}}
                />
                <View style={{
                    height: 150,
                    backgroundColor: 'rgba(0,0,0,0)',
                    display: "flex",
                    justifyContent: 'space-around'
                }}>
                    <Button style={styles.button}
                            mode={'contained'}
                            loading={loading}
                            onPress={() => {
                                if (!((email.length <= 0) || (password.length <= 0) || (errorMarker.email))) {
                                    login();
                                }
                            }}>Login</Button>
                    <Button style={styles.cancelButton} mode={'contained'} onPress={() => {
                        props.onCancel();
                    }}>{t('login.cancel')}</Button>
                </View>
            </View>
            }
        </View>
    );
}

export default Login;
