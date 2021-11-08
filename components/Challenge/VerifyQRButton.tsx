import * as React from 'react';
import {Button, IconButton, Title, useTheme} from 'react-native-paper';
import {useTranslation} from "react-i18next";
import * as Linking from 'expo-linking';
import QRCode from "react-native-qrcode-svg";
import {useState} from "react";
import {View} from "../Themed";
import {Dimensions, Modal, Platform} from "react-native";

type Props = {
  navigation: any,
  challengeId: number
}

const VerifyQRButton = (props: Props) => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [clicked, setClicked] = useState<boolean>(false);

  let challengeDeepLink = Linking.createURL(`verify-challenge/${props.challengeId}`);

  return (
    !clicked ? <Button
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
        setClicked(true);
        // the link is passed to the QRPage component so that it can be converted into a QR
      }}>
      <Title style={{fontSize: 16, fontWeight: "bold", color: colors.background}}>{t('verifyQR-button.verify')}</Title>
    </Button> :
    <Modal animationType="fade"
           presentationStyle={"fullScreen"}
           visible={clicked}
           onRequestClose={() => setClicked(false)}>
        <IconButton style={Platform.OS === 'ios' ? {marginTop: Dimensions.get("window").height*0.05}: {}}
                    onPress={() => setClicked(false)} icon={'chevron-left'}/>
        <View style={{justifyContent: 'center', alignItems: 'center', height: '80%'}}>
        <QRCode
            value={challengeDeepLink}
            size={300}
        />
        </View>
    </Modal>

  );
}

export default VerifyQRButton;
