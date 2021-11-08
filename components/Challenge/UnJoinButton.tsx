import * as React from 'react';
import {Button, Title, useTheme} from 'react-native-paper';
import {useTranslation} from "react-i18next";

interface Props {
    handleUnJoin:()=>void
}

const UnJoinButton = (props: Props) => {
    const {t} = useTranslation();
    const { colors } = useTheme();
    return( <Button style={{ backgroundColor:colors.backdrop, height:70, width:"100%", padding:15,justifyContent: "center",alignContent:"center"}} mode="contained" onPress={() => props.handleUnJoin()}>
            <Title style={{fontSize:22,fontWeight:"bold", color:colors.extra}}>{t('unjoin-button.unjoin')}
            </Title>
        </Button>
    );
}

export default UnJoinButton;
