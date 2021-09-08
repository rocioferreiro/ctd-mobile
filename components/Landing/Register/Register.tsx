import React, {useEffect, useState} from 'react';
import {Text, View} from "../../Themed";
import {Dimensions, Image, StyleSheet} from "react-native";
import {Input} from "react-native-elements";
import {Button, useTheme} from "react-native-paper";
import LottieView from "lottie-react-native";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {validateEmail, validatePassword} from "../validations";

type Props = {
    onCancel: () => void
}

const Register = (props: Props) => {
    const {colors} = useTheme();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [animationFinished, setAnimationFinished] = useState(false);
    const [errorMarker, setErrorMarker] = useState({firstName: false, lastName: false, username: false, email: false, password: false});
    const visible = useSharedValue(3);

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: visible.value,
            zIndex: visible.value
        }
    }, [])

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
            position: "absolute",
        },
        fullNameContainer: {
            flexDirection: "row",
            backgroundColor: 'rgba(0,0,0,0)',
        },
        nameInputContainer: {
            flex: 1,
            width: '40%',
            backgroundColor: 'rgba(0,0,0,0)',
        },
        error: {
            color: colors.error,
            fontSize: 15
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
                    <Image resizeMode={"contain"} source={require('../../../assets/images/ctd-logo.png')} style={styles.logo}/>
                    {errorMarker.firstName && <Text style={styles.error}> first name must be min. 2 characters </Text>}
                    {errorMarker.lastName && <Text style={styles.error}> last name must be min. 2 characters </Text>}
                    <View style={styles.fullNameContainer}>
                        <View style={styles.nameInputContainer}>
                        <Input
                            placeholder={"First Name"}
                            style={styles.input}
                            value={firstName}
                            maxLength={20}
                            onChangeText={t => {
                                setFirstName(t);
                                setErrorMarker({...errorMarker, firstName: !(firstName.length>=1)});
                            }}
                            inputContainerStyle={{borderBottomWidth: 0}}
                        />
                        </View>
                        <View style={styles.nameInputContainer}>
                        <Input
                            placeholder={"Last Name"}
                            style={styles.input}
                            value={lastName}
                            maxLength={20}
                            onChangeText={t => {
                                setLastName(t);
                                setErrorMarker({...errorMarker, lastName: !(lastName.length>=1)});
                            }}
                            inputContainerStyle={{borderBottomWidth: 0}}
                        />
                        </View>
                    </View>
                    {errorMarker.username && <Text style={styles.error}> username must be min. 2 characters </Text>}
                    <Input
                        placeholder={"Username"}
                        style={styles.input}
                        value={username}
                        maxLength={20}
                        onChangeText={t => {
                            setUsername(t);
                            setErrorMarker({...errorMarker, username: !(username.length>=1)});
                        }}
                        inputContainerStyle={{borderBottomWidth: 0}}
                    />
                    {errorMarker.email && <Text style={styles.error}> Invalid email adddress </Text>}
                    <Input
                        placeholder={"E-mail"}
                        style={styles.input}
                        value={email}
                        onChangeText={t => {
                            setEmail(t);
                            setErrorMarker({...errorMarker, email: !validateEmail(t)});
                        }}
                        inputContainerStyle={{borderBottomWidth: 0}}
                    />
                    {errorMarker.password && <Text style={styles.error}> Password requires at least 8 digits, an upper case character and a number </Text>}
                    <Input
                        placeholder={"Password"}
                        style={styles.input}
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
                    <Button style={styles.button} mode={'contained'} onPress={() => {
                        console.log('Registered')
                    }}>Register</Button>
                    <Button style={styles.cancelButton} mode={'contained'} onPress={() => {
                        props.onCancel();
                    }}>Cancel</Button>
                </View>
            </View>
            }
        </View>
    );
}

export default Register;
