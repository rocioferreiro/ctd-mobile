import * as React from 'react';
import {Button, Title, useTheme} from 'react-native-paper';
import {useTranslation} from "react-i18next";


const ViewParticipantsButton = () => {
    const {t, i18n} = useTranslation();
    const [language, setLanguage] = React.useState(i18n.language);
    const { colors } = useTheme();
    return( <Button style={{ backgroundColor:colors.primary, height:70, width:"100%", padding:15,justifyContent: "center",alignContent:"center"}} mode="contained" onPress={() => console.log('Pressed')}>
            <Title style={{fontSize:22,fontWeight:"bold", color:colors.background}}>{t('view-participants-button.view')}
                <Title style={{fontSize:22,fontWeight:"bold", color:colors.accent}}> {t('view-participants-button.participants')}</Title>
            </Title>
        </Button>
    );
}

export default ViewParticipantsButton;