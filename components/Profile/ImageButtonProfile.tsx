import * as React from 'react';
import { IconButton, Colors } from 'react-native-paper';
import {colors} from "react-native-elements";
import {Text} from "../Themed";
import {useTranslation} from "react-i18next";

interface  Props {

    setAddImage:(boolean) =>void
}

const ImageButton = (props:Props) => {
    const {t} = useTranslation();
    return (
        <IconButton
            icon="camera"
            color={colors.primary}
            size={30}
            onPress={() => props.setAddImage(true)}
        >  </IconButton>
    );
}

export default ImageButton;