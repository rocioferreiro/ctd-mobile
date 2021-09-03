import * as React from 'react';
import { IconButton, Colors } from 'react-native-paper';

interface  Props {

    setAddImage:(boolean) =>void
}

const ImageButton = (props:Props) => (
    <IconButton
        icon="camera"
        color={Colors.blue400}
        size={20}
        onPress={() => props.setAddImage(true)}
    > Add Image</IconButton>
);

export default ImageButton;