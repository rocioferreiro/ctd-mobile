import * as React from 'react';
import { IconButton, Colors } from 'react-native-paper';
import {useTranslation} from "react-i18next";

interface  Props {
    setAddImage:(boolean) =>void
}

const CancelButton = (props:Props) => {
    const {t, i18n} = useTranslation();
    return (
        <IconButton
            icon="close"
            color={Colors.red500}
            size={40}
            onPress={() => props.setAddImage(false)}
        > {t('cancel-button.cancel')}</IconButton>
    );
}

export default CancelButton;
