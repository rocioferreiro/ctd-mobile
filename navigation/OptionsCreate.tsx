import React from 'react';
import {Text, View} from "../components/Themed";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Surface} from "react-native-paper";
import {Dimensions, StyleSheet} from "react-native";

const OptionsCreate = () => {

  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  const styles = StyleSheet.create({
    surface: {
      height: windowHeight / 4,
      width: windowWidth / 1.5,
      backgroundColor: 'black',
      borderRadius: 15
    },
  });

  return (
    <View style={{
      height: windowHeight,
      width: windowWidth,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingVertical: 40
    }}>
      <TouchableOpacity>
        <Surface style={styles.surface}>
          <Text>Create Post</Text>
        </Surface>
      </TouchableOpacity>
      <TouchableOpacity>
        <Surface style={styles.surface}>
          <Text>Create Challenge</Text>
        </Surface>
      </TouchableOpacity>
    </View>
  )
}

export default OptionsCreate;
