import * as React from 'react';
import {Button, Title, useTheme} from 'react-native-paper';
import {useTranslation} from "react-i18next";
import {View} from "../Themed";

interface Props {

}

const JoinButton = (props: Props) => {
    const {t, i18n} = useTranslation();
    const { colors } = useTheme();
    return(<View>
            <Title>Challenge Verification Page</Title>
        </View>
    );
}

export default JoinButton;
