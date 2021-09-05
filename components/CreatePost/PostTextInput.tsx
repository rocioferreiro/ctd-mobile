import * as React from 'react';
import { useTheme} from 'react-native-paper';
import { Input} from "react-native-elements";
import {Dimensions} from "react-native";

const PostTextInput = () => {
    const [text, setText] = React.useState('');
    const { colors } = useTheme();

    return (
        <Input

            placeholderTextColor={colors.primary}
            placeholder={"Your post here..."}

            style={{color:colors.primary,borderColor: colors.primary, borderWidth:1,marginTop: 5,
                width: '100%',
                backgroundColor: colors.surface,
                fontSize: 20,
                borderRadius: 30,
                padding: 15,
                shadowOffset: {width: 2, height: 2},
                shadowOpacity: 0.5,
                shadowColor: '#DAB99D',
                elevation: 4,
                minHeight: Dimensions.get("window").height * 0.12, paddingTop: 20}}

            multiline={true}
            value={text}
            inputContainerStyle={{borderBottomWidth: 0}}

            onChangeText={text => setText(text)}
        />
    );
};

export default PostTextInput;