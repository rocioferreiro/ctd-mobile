import React from 'react';
import {Modal, Portal, Text, Provider} from 'react-native-paper';

type Props = {
  visible: boolean,
  onDismiss: () => void
}

const CreateChallengeModal = (props: Props) => {
  const containerStyle = {backgroundColor: 'white', padding: 20, height: 550};

  return (
    <Portal>
      <Modal visible={props.visible} onDismiss={props.onDismiss} contentContainerStyle={containerStyle}>
        <Text>Example Modal. Click outside this area to dismiss.</Text>
      </Modal>
    </Portal>
  );
}

export default CreateChallengeModal;
