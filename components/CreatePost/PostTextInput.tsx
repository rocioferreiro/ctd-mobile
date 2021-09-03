import * as React from 'react';
import {TextInput, useTheme} from 'react-native-paper';

const PostTextInput = () => {
    const [text, setText] = React.useState('');
    const { colors } = useTheme();

    return (
        <TextInput
            outlineColor={colors.primary}
            placeholderTextColor={colors.primary}

            style={{width:"90%",fontSize:25,color:colors.primary,backgroundColor:colors.background}}
            label="Your post here..."
            multiline={true}
            value={text}

            onChangeText={text => setText(text)}
        />
    );
};

export default PostTextInput;