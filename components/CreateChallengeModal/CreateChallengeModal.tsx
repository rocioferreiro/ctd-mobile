import React from 'react';
import {Modal, Portal, Text, Button} from 'react-native-paper';

type Props = {
  visible: boolean,
  onDismiss: () => void
}

const CreateChallengeModal = (props: Props) => {
  const containerStyle = {backgroundColor: 'white', flex: 1};

  return (
    <Portal>
      <Modal visible={props.visible} onDismiss={props.onDismiss} contentContainerStyle={containerStyle}>
        <Text>Example Modal. Click outside this area to dismiss. Or click the close button</Text>
        <Button onPress={props.onDismiss}>Close</Button>
      </Modal>
    </Portal>
  );
}

export default CreateChallengeModal;
