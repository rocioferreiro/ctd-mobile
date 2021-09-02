import React, {useEffect, useState} from "react";

import {Button, Card, Divider, useTheme} from 'react-native-paper';
import {View,Text} from "../Themed";
import {Dimensions, ScrollView, StyleSheet} from "react-native";
import {Input} from "react-native-elements";
import {colorShade} from "../Models/shadingColor";
import PostTextInput from "./PostTextInput";
type Props = {

    formik: any
}


const CreatePost = (props:Props) => {
    const {formik} = props;
    const { colors } = useTheme();

    const onChange = (searchValue: string) => {

        }




    return (
        <View style={{flex:1,width:Dimensions.get("screen").width, height:Dimensions.get("window").height * 0.1,backgroundColor:colors.surface}}>
            <View style={{width:"100%",alignItems:"flex-start" ,padding:10,marginTop: 20,backgroundColor:colors.surface}}>
                <Button icon="keyboard-backspace" >
                    Back
                </Button>
        <Text>Create Post</Text>
                <ScrollView>
                    <View style={{
                        display: "flex",
                        justifyContent: 'center',
                        width: '100%',
                        flexDirection: 'row',
                        padding: 15,
                        backgroundColor: "rgba(0,0,0,0)"
                    }}>
                <PostTextInput></PostTextInput>
                    </View>
                </ScrollView>
            </View>

        </View>

    )
};


export default CreatePost;