import * as React from 'react';
import { IconButton, Colors } from 'react-native-paper';

interface  Props {

    setAddImage:(boolean) =>void
}

const CancelButton = (props:Props) => (
    <IconButton
        icon="close"
        color={Colors.red500}
        size={40}
        onPress={() => props.setAddImage(false)}
    > Cancel</IconButton>
);

export default CancelButton;