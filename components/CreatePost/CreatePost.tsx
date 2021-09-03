import React, {useEffect, useState} from "react";

import {Button, Card, Colors, Divider, useTheme} from 'react-native-paper';
import {View,Text} from "../Themed";
import {Dimensions, ScrollView, StyleSheet} from "react-native";
import {Input} from "react-native-elements";
import {colorShade} from "../Models/shadingColor";
import PostTextInput from "./PostTextInput";
import ImagePicker from "../CreateChallengeForm/inscriptions/ImagePicker";
import ImageButton from "./ImageButton";
import CancelButton from "./CancelButton";
import PublishButton from "./PublishButton";
type Props = {

    formik: any
}


const CreatePost = (props:Props) => {
    const {formik} = props;
    const { colors } = useTheme();
    const [image, setImage] = React.useState(null)
    const [ addImage, setAddImage] = React.useState(false)

    const handlePublish = () =>{

    }

    const onChange = (searchValue: string) => {

        }




    return (
        <View style={{flex:1,width:Dimensions.get("screen").width, height:Dimensions.get("window").height * 0.1,backgroundColor:colors.surface}}>
            <View style={{width:"100%",alignItems:"flex-start" ,padding:10,marginTop: 20,backgroundColor:colors.surface}}>
                <Button icon="keyboard-backspace" >
                    Back
                </Button>
                <View style={{
                    display: "flex",
                    justifyContent: 'flex-start',
                    width: '100%',
                    flexDirection: 'row',
                    padding: 15,
                    backgroundColor: "rgba(0,0,0,0)"
                }}>
        <Text style={{
            fontSize: 35,
            fontWeight: 'bold',
            color: colors.primary,
            marginLeft: 5,
            marginTop: -20,
        }}>Create Post</Text>
                </View>
                <ScrollView>
                    <View style={{
                        display: "flex",
                        justifyContent: 'center',
                        width: '100%',
                        flexDirection: 'row',
                        padding: 5,
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
                            <View style={{
                                display: "flex",
                                width: '100%',
                                padding: 10,
                                backgroundColor: "rgba(0,0,0,0)"
                            }}>
                          <CancelButton setAddImage={setAddImage}></CancelButton>
                            <ImagePicker image={image} setImage={setImage}></ImagePicker>
                            </View>
                                :
                            <View style={{
                                display: "flex",
                                justifyContent: 'flex-start',
                                width: '100%',
                                flexDirection: 'row',
                                backgroundColor: "rgba(0,0,0,0)",
                                alignItems:'center'
                            }}>
                            <Text  style={{
                                fontSize: 15,
                                fontWeight: 'normal',
                                color:Colors.blue400,
                                marginLeft: 5,
                                marginTop: -5,
                            }}> Add Image</Text>
                            <ImageButton setAddImage={setAddImage}></ImageButton>
                            </View>
                        }

                    </View>
                    <View style={{
                        display: "flex",
                        justifyContent: 'center',
                        width: '100%',
                        flexDirection: 'row',
                        padding: 15,
                        backgroundColor: "rgba(0,0,0,0)"
                    }}>
                        <PublishButton handlePublish={handlePublish} formik={formik}></PublishButton>
                    </View>
                </ScrollView>
            </View>

        </View>

    )
};


export default CreatePost;