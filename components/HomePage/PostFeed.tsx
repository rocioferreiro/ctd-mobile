import * as React from 'react';
import { useTheme} from 'react-native-paper';
import {Text, View} from "../Themed";
import {ScrollView} from "react-native-gesture-handler";
import {Address, Gender, Role, User} from "../Models/User";
import {Image, TouchableWithoutFeedback} from "react-native";
import ViewPost from "../viewPost/ViewPost";


const PostFeed = () => {
    const posts =[1,2,3]
    const [open, setOpen] = React.useState(false)
    const post =[{
        text: "This is a post text",
        id: "434034",
        owner: {
            lastname: "Alvarez",
            mail: "al@gmail.com",
            name: "Pedro",
            role: Role.NORMAL,
        },
        image: "asad",
        creationDate: "23/5/2021",
        title: "Post Title",
        upVotes:11,
        boosted: false
    }]
    const {colors} = useTheme();
    return (
       <View>
           <ScrollView>
               {posts.map((s, index) => {
                   return <TouchableWithoutFeedback key={index}>
                       <View  style={{backgroundColor: colors.surface}} >
                       <ViewPost post={post[0]} open={open}></ViewPost>
                       </View>

                   </TouchableWithoutFeedback>
               })}
           </ScrollView>
       </View>
    );
}

export default PostFeed;
