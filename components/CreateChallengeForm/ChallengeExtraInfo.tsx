import React from "react";

import {Card} from "react-native-paper";
import {View,Text} from "../Themed";

type Props = {
    formik: any
}

const ChallengeExtraInfo = (props: Props) => {
    return (
        <View>
            <Card style={{width:300,height:50}}>
                <Text> Challenge Extra Info</Text>

            </Card>
        </View>
    )
}

export default ChallengeExtraInfo;
