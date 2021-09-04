import * as React from 'react';
import {TextInput, useTheme} from 'react-native-paper';

const PostTextInput = () => {
    const [text, setText] = React.useState('');
    const { colors } = useTheme();

    return (
        <TextInput
            outlineColor={colors.primary}
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
                elevation: 4}}

            multiline={true}
            value={text}

            onChangeText={text => setText(text)}
        />
    );
};

export default PostTextInput;