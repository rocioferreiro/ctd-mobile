import React from 'react';
import {Dimensions, StyleSheet} from "react-native";
import {View, Text} from "../Themed";
import {Button, Modal, Portal, useTheme} from "react-native-paper";

type Props = {
  open: boolean,
  onClose: () => void,
  onAccept: () => void,
  onCancel: () => void,
  text: string,
  cancelText: string,
  acceptText: string,
  style?: StyleSheet,
  acceptStyle?: StyleSheet,
}

const ConfirmationModal = (props: Props) => {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    modal: {
      width: Dimensions.get('screen').width * 0.7,
      minHeight: 100,
      maxHeight: Dimensions.get('screen').height * 0.3,
      backgroundColor: colors.surface,
      justifyContent: 'space-between'
    },
    text: {justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: colors.surface},
    buttons: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: colors.surface},
    cancel: {},
    accept: {backgroundColor: colors.error}
  });

  return (
    <Portal>
      <Modal
        visible={props.open}
        onDismiss={props.onClose}
        style={{justifyContent: 'center', alignItems: 'center'}}
      >
        <View style={props.style ? {...styles.modal, ...props.style} : styles.modal}>
          <View style={styles.text}>
            <Text>{props.text}</Text>
          </View>
          <View style={styles.buttons}>
            <Button style={styles.cancel} onPress={props.onCancel}>{props.cancelText}</Button>
            <Button mode={'contained'} style={props.acceptStyle ? {...styles.accept, ...props.acceptStyle} : styles.accept} onPress={props.onAccept}>{props.acceptText}</Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

export default ConfirmationModal;
