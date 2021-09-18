import React from "react";

import {Colors, useTheme} from 'react-native-paper';
import {View,Text} from "../Themed";
import {Dimensions, ScrollView} from "react-native";
import PostTextInput from "./PostTextInput";
import ImagePicker from "../CreateChallengeForm/inscriptions/ImagePicker";
import ImageButton from "./ImageButton";
import CancelButton from "./CancelButton";
import PublishButton from "./PublishButton";
import {CreatePostFormValues} from "../CreateChallengeForm/Types";
import {useFormik} from "formik";
import {useMutation} from "@apollo/client";
import {CREATE_POST} from "../apollo-graph/Mutations";
import {getUserId} from "../Storage";
type Props = {
    setCreatePost:(Boolean)=>void
    toastOn:()=>void
}


const CreatePost = (props:Props) => {
    const { colors } = useTheme();
    const [image, setImage] = React.useState(null)
    const [ addImage, setAddImage] = React.useState(false)
    const [creationSuccess, setCreationSuccess] = React.useState(false)
    const [createPost] = useMutation(CREATE_POST, {
        onCompleted: () => {
            setCreationSuccess(true);
            props.setCreatePost(false);
        },
        onError: err => {
            props.toastOn();
            console.log(err);
        },
        refetchQueries: []
    });

    const [userId, setUserId] = React.useState('');

    React.useEffect(() => {
        getUserId().then(id => setUserId(id));
    }, [])

    const initialValues: CreatePostFormValues = {
        "title": '',
        "owner": '',
        "text": '',
        "boosted": false,
        "image": "asdasd",
        "upvotes": 0
    }
    const onSubmitCreation = () => {
        parseAndSendPost(formik.values);
    }
    const formik = useFormik(
        {
            initialValues: initialValues,
            onSubmit: onSubmitCreation
        }
    )
    const parseAndSendPost = (post) => {
        const newPostDTOInput = {
            "title": post.title,
            "owner": userId,
            "text": post.text,
            "boosted": false,
            "image": "asdasd",
            "upvotes": 0
        }
        console.log(newPostDTOInput)
        createPost({variables: {newPost: newPostDTOInput}}).catch(() => {
            props.toastOn();
        });
    }


    const handlePublish = () =>{
        onSubmitCreation()

    }


    return (
        <View style={{width:Dimensions.get("screen").width, height:Dimensions.get("window").height, backgroundColor: colors.surface, paddingTop: Dimensions.get("window").height*0.05}}>
            <View style={{width:"100%",alignItems:"flex-start" ,padding:10,marginTop: 20, backgroundColor: 'rgba(0,0,0,0)'}}>
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
                        backgroundColor: "rgba(0,0,0,0)",


                    }}
                          >
                <PostTextInput formik={formik} />
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
                          <CancelButton setAddImage={setAddImage}/>
                            <ImagePicker image={image} setImage={setImage}/>
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
                            <ImageButton setAddImage={setAddImage}/>
                            </View>
                        }

                    </View>
                    <View style={{
                        display: "flex",
                        justifyContent: 'center',
                        width: '100%',
                        flexDirection: 'row',
                        padding: 15,
                        backgroundColor: "rgba(0,0,0,0)",
                        borderRadius:10
                    }}>
                        <PublishButton handlePublish={handlePublish} formik={formik}/>
                    </View>
                </ScrollView>
            </View>

        </View>

    )
};


export default CreatePost;
