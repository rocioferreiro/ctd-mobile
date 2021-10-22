import React from 'react';
import {Text, View} from "../components/Themed";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useTheme} from "react-native-paper";
import {Dimensions, Image, StyleSheet} from "react-native";
import {categoryBackgrounds} from "../components/ONUObjectives";

const OptionsCreate = () => {

  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    card: {
      display: 'flex',
      borderRadius: 5,
      height: windowHeight / 3,
      width: windowWidth * 0.9,
      marginBottom: 10,
      marginTop: 10,
      overflow: 'visible',
      backgroundColor: 'rgba(0,0,0,0)'
    },
    imageContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      flex: 10,
      display: 'flex',
      justifyContent: 'flex-end',
      borderRadius: 15,
      overflow: 'hidden'
    },
    name: {
      fontWeight: 'bold',
      color: '#ffffff',
      marginLeft: 6,
      marginBottom: 6,
    },
  });

  return (
    <View style={{
      height: windowHeight,
      width: windowWidth,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingVertical: 40
    }}>
      <TouchableOpacity onPress={() => {

      }}>
        <View style={styles.card}>
          <View style={[styles.imageContainer, {backgroundColor: 'blue'}]}>
            <Image style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'blue',
              opacity: 0.5,
              width: '100%',
              height: '100%'
            }} source={categoryBackgrounds[0].image} resizeMode={'cover'}/>
            <Text style={styles.name}>Create Post</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {

      }}>
        <View style={styles.card}>
          <View style={[styles.imageContainer, {backgroundColor: 'red'}]}>
            <Image style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'red',
              opacity: 0.5,
              width: '100%',
              height: '100%'
            }} source={categoryBackgrounds[1].image} resizeMode={'cover'}/>
            <Text style={styles.name}>Create Challenge</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default OptionsCreate;
