import React, {useEffect, useState} from "react";

import {Button, Card, Divider, useTheme} from 'react-native-paper';
import {View,Text} from "../Themed";
import {Dimensions, ScrollView, StyleSheet} from "react-native";
import {Input} from "react-native-elements";
import {colorShade} from "../Models/shadingColor";
import PostTextInput from "./PostTextInput";
import ImagePicker from "../CreateChallengeForm/inscriptions/ImagePicker";
import ImageButton from "./ImageButton";
import CancelButton from "./CancelButton";
type Props = {

    formik: any
}


const CreatePost = (props:Props) => {
    const {formik} = props;
    const { colors } = useTheme();
    const [image, setImage] = React.useState(null)
    const [ addImage, setAddImage] = React.useState(false)

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
                    <View style={{
                        display: "flex",
                        justifyContent: 'center',
                        width: '100%',
                        flexDirection: 'row',
                        padding: 15,
                        backgroundColor: "rgba(0,0,0,0)"
                    }}>
                        {addImage ?
                            <View>
                          <CancelButton setAddImage={setAddImage}></CancelButton>
                            <ImagePicker image={image} setImage={setImage}></ImagePicker>
                            </View>
                                :
                            <View style={{
                                display: "flex",
                                justifyContent: 'flex-start',
                                width: '100%',
                                flexDirection: 'row',
                                padding: 15,
                                backgroundColor: "rgba(0,0,0,0)"
                            }}>

                            <ImageButton setAddImage={setAddImage}></ImageButton>
                            </View>
                        }

                    </View>
                </ScrollView>
            </View>

        </View>

    )
};


export default CreatePost;