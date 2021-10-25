import * as React from 'react';
import { IconButton, Colors } from 'react-native-paper';
import {colors} from "react-native-elements";

interface  Props {

    setAddImage:(boolean) =>void
}

const ImageButton = (props:Props) => (
    <IconButton
        icon="camera"
        color={colors.primary}
        size={30}
        onPress={() => props.setAddImage(true)}
    > Add Image</IconButton>
);

export default ImageButton;