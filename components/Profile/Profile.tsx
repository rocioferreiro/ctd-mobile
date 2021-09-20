import "react-apollo"
import {View,Text} from "../Themed";
import React, {useContext} from "react";
import {Dimensions, StyleSheet} from "react-native";
import {Button, useTheme} from "react-native-paper";
import {AuthContext} from "../../App";
import {useTranslation} from "react-i18next";
import {LanguagePicker} from "../Language/LanguagePicker";

export function Profile() {
  const {colors} = useTheme();
  const auth = useContext(AuthContext);
  const {t, i18n} = useTranslation('profile');
  const [language, setLanguage] = React.useState(i18n.language);

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surface,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }
  });

  return (
    <View style={styles.container}>
      <View>
        <LanguagePicker i18n={i18n} setLanguage={setLanguage}></LanguagePicker>
      </View>

      <Button onPress={() => {auth.signOut().catch(e => console.log(e))}}>
        <Text> {t('profile.logout')}</Text></Button>
    </View>
  );
}
