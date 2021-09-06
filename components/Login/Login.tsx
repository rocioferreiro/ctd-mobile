import React, {useEffect, useState} from 'react';
import {Text, View} from "../Themed";
import {Dimensions, Image, StyleSheet} from "react-native";
import {Input} from "react-native-elements";
import {Button, useTheme} from "react-native-paper";
import LottieView from "lottie-react-native";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";

type Props = {
    onCancel: () => void
}

const Login = (props: Props) => {
    const {colors} = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [animationFinished, setAnimationFinished] = useState(false);
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
            color: '#FFC300',
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
            padding: 2
        },
        cancelButton: {
            borderRadius: 20,
            backgroundColor: '#909090',
            fontWeight: 'bold',
            padding: 2,
            opacity: 0.8
        },
        logo: {
            height: 100,
            width: 100,
        },
        animatedContainer: {
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0)',
            position: "absolute",
        }
    });

    useEffect(() => {
        visible.value = withTiming(0, {duration: 1000});
    }, [])

    return (
        <View style={styles.root}>
            <Animated.View style={[styles.animatedContainer, reanimatedStyle]}>
                <LottieView
                    source={require('../../assets/lottie/liquid-transition.json')}
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
                <Image source={require('../../assets/images/ctd-logo.jpg')} style={styles.logo}/>
                <Text style={styles.title}>Login</Text>
                <Input
                    placeholder={"Email"}
                    style={styles.input}
                    value={email}
                    onChangeText={t => {
                        setEmail(t);
                    }}
                    inputContainerStyle={{borderBottomWidth: 0}}
                />
                <Input
                    placeholder={"Password"}
                    style={styles.input}
                    value={password}
                    onChangeText={t => {
                        setPassword(t);
                    }}
                    inputContainerStyle={{borderBottomWidth: 0}}
                />
                <View style={{
                    height: 150,
                    backgroundColor: 'rgba(0,0,0,0)',
                    display: "flex",
                    justifyContent: 'space-around'
                }}>
                    <Button style={styles.button} mode={'contained'} onPress={() => {
                        console.log('login')
                    }}>Login</Button>
                    <Button style={styles.cancelButton} mode={'contained'} onPress={() => {
                        props.onCancel()
                    }}>Cancel</Button>
                </View>
            </View>
            }
        </View>
    );
}

export default Login;
