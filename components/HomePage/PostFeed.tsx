import * as React from 'react';
import { useTheme} from 'react-native-paper';
import {View} from "../Themed";
import {ScrollView} from "react-native-gesture-handler";
import {TouchableWithoutFeedback} from "react-native";
import ViewPost from "../viewPost/ViewPost";
import {useLazyQuery} from "@apollo/client";
import {GET_POST_BY_CONNECTIONS} from "../apollo-graph/Queries";
import {useEffect} from "react";
import {getUserId} from "../Storage";


const PostFeed = () => {
    const [open, setOpen] = React.useState(false)
    const [getPostsByConnections, {data: postsByConnectionsData}] = useLazyQuery(GET_POST_BY_CONNECTIONS);
    const {colors} = useTheme();

    useEffect(() => {
        getUserId().then(id => {
            getPostsByConnections({variables: {userId: id}});
        });
    }, []);

    return (
       <View style={{marginBottom: 70}}>
           <ScrollView>
               {postsByConnectionsData?.getPostByConnections.map((post, index) => {
                   return <TouchableWithoutFeedback key={index}>
                       <View  style={{backgroundColor: colors.surface}} >
                       <ViewPost post={post} open={open}/>
                       </View>

                   </TouchableWithoutFeedback>
               })}
           </ScrollView>
       </View>
    );
}

export default PostFeed;
