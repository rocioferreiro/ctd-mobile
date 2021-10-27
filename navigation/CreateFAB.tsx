import React from 'react';
import {Portal, FAB} from "react-native-paper";

type Props = {
  open: boolean,
  onClose: () => void,
  navigation: any
}

const CreateFAB = (props: Props) => {

  return (
    <Portal>
      <FAB.Group
        style={{alignItems: 'center'}}
        fabStyle={{opacity: 0, marginTop: 10}}
        open={props.open}
        visible={props.open}
        icon={'creation'}
        actions={[
          {
            icon: 'camera-iris',
            small: false,
            onPress: () => {props.navigation.navigate('createPost')},
          },
          {
            icon: 'flag-variant',
            onPress: () => {props.navigation.navigate('challengeCreation')},
            small: false,
          },
        ]}
        onStateChange={props.onClose}
        onPress={() => {}}
      />
    </Portal>
  )
}

export default CreateFAB;
