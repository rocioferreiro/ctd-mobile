import React from "react";

import {Card, TextInput} from "react-native-paper";
import {View,Text} from "../Themed";

const ChallengeDetails = () => {
    const [title, setTitle] = React.useState('');
    return (
        <View style={{marginTop:10, marginBottom:40}}>
            <Text> Challenge Details</Text>
            <Card style={{width:300,height:50, marginTop:50, marginBottom:40}}>


                <TextInput
                    label="Challenge Title"
                    value={title}
                    onChangeText={title => setTitle(title)}
                />

            </Card>
        </View>
    )
}

export default ChallengeDetails;
