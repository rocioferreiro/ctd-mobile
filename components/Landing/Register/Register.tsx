import React, {useEffect, useState} from 'react';
import {Text, View} from "../../Themed";
import {Dimensions, Image, StyleSheet} from "react-native";
import {Input} from "react-native-elements";
import {Button, useTheme} from "react-native-paper";
import LottieView from "lottie-react-native";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {validateEmail, validatePassword} from "../validations";
import {useMutation} from "@apollo/client";
import {REGISTER} from "../../apollo-graph/Mutations";
import Toast from "react-native-toast-message";
import {useTranslation} from "react-i18next";

type Props = {
    onCancel: () => void
}

const Register = (props: Props) => {
    const {colors} = useTheme();
    const {t, i18n} = useTranslation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [animationFinished, setAnimationFinished] = useState(false);
    const [errorMarker, setErrorMarker] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false
    });
    const visible = useSharedValue(3);

    const toastOn = (message: string, description: string = '') => {
        Toast.show({
            type: 'error',
            text1: message,
            text2: description,
            topOffset: Dimensions.get("window").height * 0.05,
        });
    }

    const successToast = (message: string, description: string = '') => {
        Toast.show({
            type: 'success',
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
    }, [])

    const [register, {loading}] = useMutation(REGISTER, {
        onCompleted: token => {
            props.onCancel();
            successToast(t('register.success'), t('register.successDescription'));
        },
        onError: (e) => {
            console.log(e);
            toastOn(t('register.error'), t('register.errorDescription'));
        }
    });

    const styles = StyleSheet.create({
        root: {
            display: 'flex',
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
            textAlignVertical: 'center',
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
            height: 60,
        },
        button: {
            backgroundColor: colors.primary,
            borderRadius: 20,
            borderWidth: 2,
            zIndex: 1,
            borderColor: colors.light,
            fontWeight: 'bold',
            padding: 2,
            minWidth: '40%'
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
            position: 'absolute',
        },
        fullNameContainer: {
            flexDirection: 'row',
            backgroundColor: 'rgba(0,0,0,0)',
        },
        nameInputContainer: {
            flex: 1,
            width: '40%',
            backgroundColor: 'rgba(0,0,0,0)',
        },
        error: {
            display: 'flex',
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

    const onRegister = () => {
        register({
            variables: {
                newUser: {
                    name: firstName,
                    lastname: lastName,
                    mail: email,
                    biography: '',
                    password: password,
                    role: 'NORMAL',
                    address: {
                        country: "",
                        locality: "",
                        province: "",
                        street: "",
                        number: "",
                        coordinates: {
                            latitude: 0,
                            longitude: 0
                        },
                    }
                }
            }
        }).catch(e => console.log(e));
    }

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
                <View style={styles.fullNameContainer}>
                    <View style={styles.nameInputContainer}>
                        {errorMarker.firstName && <Text style={styles.error}> min. 2 characters </Text>}
                        <Input
                            placeholder={t('register.name')}
                            style={errorMarker.firstName ? [styles.input, {
                                borderWidth: 3,
                                borderColor: colors.error,
                                borderStyle: 'solid'
                            }] : styles.input}
                            value={firstName}
                            maxLength={20}
                            onChangeText={t => {
                                setFirstName(t);
                                setErrorMarker({...errorMarker, firstName: !(firstName.length >= 1)});
                            }}
                            inputContainerStyle={{borderBottomWidth: 0}}
                        />
                    </View>
                    <View style={styles.nameInputContainer}>
                        {errorMarker.lastName && <Text style={styles.error}> min. 2 characters </Text>}
                        <Input
                            placeholder={t('register.lastname')}
                            style={errorMarker.lastName ? [styles.input, {
                                borderWidth: 3,
                                borderColor: colors.error,
                                borderStyle: 'solid'
                            }] : styles.input}
                            value={lastName}
                            maxLength={20}
                            onChangeText={t => {
                                setLastName(t);
                                setErrorMarker({...errorMarker, lastName: !(lastName.length >= 1)});
                            }}
                            inputContainerStyle={{borderBottomWidth: 0}}
                        />
                    </View>
                </View>
                {errorMarker.email && <Text style={styles.error}> {t('register.emailError')} </Text>}
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
                        setErrorMarker({...errorMarker, email: !validateEmail(t)});
                    }}
                    inputContainerStyle={{borderBottomWidth: 0}}
                />
                {errorMarker.password &&
                <Text style={styles.error} numberOfLines={1} ellipsizeMode={'tail'}> {t('register.passwordError')} </Text>}
                <Input
                    placeholder={t('login.password')}
                    style={errorMarker.password ? [styles.input, {
                        borderWidth: 3,
                        borderColor: colors.error,
                        borderStyle: 'solid'
                    }] : styles.input}
                    value={password}
                    maxLength={35}
                    onChangeText={t => {
                        setPassword(t);
                        setErrorMarker({...errorMarker, password: !validatePassword(t)});
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
                    <Button style={styles.button} mode={'contained'} loading={loading} onPress={() => {
                        if (!((email.length <= 0) || (password.length <= 0) || (errorMarker.email) || (errorMarker.firstName) || (errorMarker.lastName) || (errorMarker.password) || (errorMarker.password))) onRegister();
                    }}>{t('register.done')}</Button>
                    <Button style={styles.cancelButton} mode={'contained'} onPress={() => {
                        props.onCancel();
                    }}>{t('register.cancel')}</Button>
                </View>
            </View>
            }
        </View>
    );
}

export default Register;
