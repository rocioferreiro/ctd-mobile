import * as React from 'react';
import { TextInput } from 'react-native-paper';

const PostTextInput = () => {
    const [text, setText] = React.useState('');

    return (
        <TextInput
            style={{width:"90%"}}
            label="Your post here..."
            multiline={true}
            value={text}

            onChangeText={text => setText(text)}
        />
    );
};

export default PostTextInput;