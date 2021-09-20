import * as React from 'react';
import {Button, useTheme} from 'react-native-paper';
import {Text} from "../Themed";
import {useTranslation} from "react-i18next";

interface  Props {

    handlePublish:(formik) =>void
    formik:any
}

const PublishButton = (props:Props) => {
    const {t, i18n} = useTranslation();
    const [language, setLanguage] = React.useState(i18n.language);
    const { colors } = useTheme();
    return (
        <Button style={{backgroundColor: colors.extra,width:"100%",borderRadius:10}} icon="check-bold" mode="contained"
                    onPress={() => props.handlePublish(props.formik)}>
            <Text style={{fontSize:20,color:colors.background}} > {t('publish-button.publish')}</Text>
        </Button>
    );
};

export default PublishButton;