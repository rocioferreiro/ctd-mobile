import * as React from 'react';
import {Button, Title, useTheme} from 'react-native-paper';
import {useTranslation} from "react-i18next";

interface Props {
  handleJoin:()=>void
}

const JoinButton = (props: Props) => {
    const {t} = useTranslation();
    const { colors } = useTheme();
   return( <Button style={{ backgroundColor:colors.primary, height:70, width:"100%", padding:15,justifyContent: "center",alignContent:"center"}} mode="contained" onPress={() => props.handleJoin()}>
      <Title style={{fontSize:22,fontWeight:"bold", color:colors.background}}>{t('join-button.join-this-challenge')}
      <Title style={{fontSize:22,fontWeight:"bold", color:colors.accent}}> {t('join-button.now')}</Title>
      </Title>
    </Button>
);
}

export default JoinButton;
