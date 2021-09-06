import React, {useState} from 'react';
import {Text, View} from "../Themed";
import {Dimensions, StyleSheet} from "react-native";
import {Input} from "react-native-elements";
import {Button, useTheme} from "react-native-paper";

const Login = () => {
    const { colors } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const styles = StyleSheet.create({
        root: {
            display: "flex",
            width: Dimensions.get('screen').width,
            height: '50%',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0)'
        },
        title: {
            backgroundColor: 'rgba(0,0,0,0)',
            fontSize: 30,
            color: '#FFC300',
            fontWeight: 'bold',
            flex: 1
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
            flex: 1
        },
        button: {
            backgroundColor: '#FFC300',
            borderRadius: 20,
            zIndex: 1,
            padding: 5,
        },
        cancelButton: {
            borderRadius: 20,
            backgroundColor: '#808080'
        }
    })

    return (
        <View style={styles.root}>
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
            <View style={{flex: 2, backgroundColor: 'rgba(0,0,0,0)', display: "flex", justifyContent: 'space-around'}}>
                <Button style={styles.button} mode={'contained'} onPress={() => {console.log('login')}}>Login</Button>
                <Button style={styles.cancelButton} mode={'contained'} onPress={() => {console.log('cancel')}}>Cancel</Button>
            </View>
        </View>
    );
}

export default Login;
