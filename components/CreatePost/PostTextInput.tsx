import * as React from 'react';
import { useTheme} from 'react-native-paper';
import { Input} from "react-native-elements";
import {Dimensions} from "react-native";
import {View} from "../Themed";
import {useTranslation} from "react-i18next";

type Props = {
   formik:any
}
const PostTextInput = (props:Props) => {
    const { colors } = useTheme();
    const {t, i18n} = useTranslation();
    const [language, setLanguage] = React.useState(i18n.language);

    return (
      <View style={{width: '100%', backgroundColor: 'rgba(0,0,0,0)'}}>
        <Input
          placeholderTextColor={colors.primary}
          placeholder={t('post-text-input.title-placeholder')}
          style={{color:colors.primary,borderColor: colors.primary, borderWidth:1,marginTop: 5,
            width: '100%',
            backgroundColor: colors.surface,
            fontSize: 20,
            borderRadius: 30,
            padding: 15,
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.5,
            shadowColor: '#DAB99D',
            elevation: 4}}

          inputContainerStyle={{borderBottomWidth: 0}}
          value={props.formik.values.title}
          onChangeText={title => {
            props.formik.setFieldValue('title', title)
          }}
        />
        <Input
          placeholderTextColor={colors.primary}
          placeholder={t('post-text-input.body-placeholder')}
          style={{color:colors.primary,borderColor: colors.primary, borderWidth:1,marginTop: 5,
            width: '100%',
            backgroundColor: colors.surface,
            fontSize: 20,
            borderRadius: 30,
            padding: 15,
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.5,
            shadowColor: '#DAB99D',
            elevation: 4,
            minHeight: Dimensions.get("window").height * 0.12, paddingTop: 20}}

          multiline={true}
          inputContainerStyle={{borderBottomWidth: 0}}
          value={props.formik.values.text}
          onChangeText={text => {
            props.formik.setFieldValue('text', text)
          }}
        />
      </View>

    );
};

export default PostTextInput;
