import * as React from 'react';
import {Button, Title, useTheme} from 'react-native-paper';
import {useTranslation} from "react-i18next";
import {Challenge} from "../Models/Challenge";

interface Props {
    handleUnJoin:()=>void
}

const UnJoinButton = (props: Props) => {
    const {t, i18n} = useTranslation();
    const { colors } = useTheme();
    return( <Button style={{ backgroundColor:colors.primary, height:70, width:"100%", padding:15,justifyContent: "center",alignContent:"center"}} mode="contained" onPress={() => props.handleUnJoin()}>
            <Title style={{fontSize:22,fontWeight:"bold", color:colors.background}}>{t('unjoin-button.unjoin')}
            </Title>
        </Button>
    );
}

export default UnJoinButton;