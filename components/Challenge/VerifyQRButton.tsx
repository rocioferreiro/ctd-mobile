import * as React from 'react';
import {Button, Title, useTheme} from 'react-native-paper';
import {useTranslation} from "react-i18next";
import * as Linking from 'expo-linking';

type Props = {
  navigation: any,
  challengeId: number
}

const VerifyQRButton = (props: Props) => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  let challengeDeepLink = Linking.createURL('tabbar/challenge', {
    queryParams: {challengeId: props.challengeId},
  });

  return (
    <Button
      style={{
        backgroundColor: '#22bb33',
        height: 70,
        width: "100%",
        padding: 15,
        justifyContent: "center",
        alignContent: "center"
      }}
      mode="contained"
      onPress={() => {
        // props.navigation.navigate('verify', {link: challengeDeepLink})
        console.log(challengeDeepLink);
        // the link is passed to the QRPage component so that it can be converted into a QR
      }}>
      <Title style={{fontSize: 22, fontWeight: "bold", color: colors.background}}>{t('verifyQR-button.verify')}</Title>
    </Button>
  );
}

export default VerifyQRButton;
