import React from "react";
import {Animated, Dimensions, Image, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {ONUObjectives} from "./ONUObjectives";
import {useTheme} from "react-native-paper";

const obj1 = require(`../../assets/images/objetive1.png`)
const obj2 = require(`../../assets/images/objetive2.png`)
const obj3 = require(`../../assets/images/objetive3.png`)
const obj4 = require(`../../assets/images/objetive4.png`)
const obj5 = require(`../../assets/images/objetive5.png`)
const obj6 = require(`../../assets/images/objetive6.png`)
const obj7 = require(`../../assets/images/objetive7.png`)
const obj8 = require(`../../assets/images/objetive8.png`)
const obj9 = require(`../../assets/images/objetive9.png`)
const obj10 = require(`../../assets/images/objetive10.png`)
const obj11 = require(`../../assets/images/objetive11.png`)
const obj12 = require(`../../assets/images/objetive12.png`)
const obj13 = require(`../../assets/images/objetive13.png`)
const obj14 = require(`../../assets/images/objetive14.png`)
const obj15 = require(`../../assets/images/objetive15.png`)
const obj16 = require(`../../assets/images/objetive16.png`)
const obj17 = require(`../../assets/images/objetive17.png`)

type Props = {
  selected: string[],
  setSelected: (any) => void
}
const OnuObjectiveChoice  = (props: Props) => {
  const { colors } = useTheme();
  const onuPictures = [obj1, obj2, obj3, obj4, obj5, obj6, obj7, obj8, obj9, obj10, obj11, obj12, obj13, obj14, obj15, obj16, obj17]
  const [selectedImage, setSelectedImage] = React.useState()
  const fadeAnim: Animated.Value = React.useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {useNativeDriver: false, toValue: 1, duration: 500}).start();
  };
  const fadeOut = () => {
    Animated.timing(fadeAnim, {useNativeDriver: false, toValue: 0, duration: 500}).start();
  };

  React.useEffect(
    () => {
      let timer1 = setTimeout(() => {
        fadeOut()
        setTimeout(() => {setSelectedImage(undefined)}, 500)
      }, 1000);
      return () => {
        clearTimeout(timer1);
      };
    },
    [selectedImage]
  );

  const styles = StyleSheet.create({
    container: {
      zIndex:5,
      height: Dimensions.get('window').height * 0.52,
    },
    image: {
      width: 85,
      height: 85,
      opacity: 0.5
    },
    imageChecked: {
      width: 85,
      height: 85,
    },
    imageWrapperChecked: {
      borderColor: colors.text,
      borderStyle: 'solid',
      borderWidth:  5,
      width: 95,
      height: 95,
    },
    imageWrapper: {
      width: 85,
      height: 85,
      margin: 5,
      backgroundColor: colors.surface
    },
    onuContainer: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      height:300
    },
    selectedImage: {
      position: "absolute",
      left: 50,
      top: 10,
      width: 300,
      height: 300,
    },
    nonSelected: {
      display: "none"
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.onuContainer}>
        {Object.keys(ONUObjectives).map((o, index) => {
          return <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              if(props.selected.includes(o))
                props.setSelected(props.selected.filter(i => i !== o))
              else {
                setSelectedImage(onuPictures[index])
                fadeIn()
                props.setSelected( [...props.selected, o])
              }
            }}>
            <View style={props.selected.includes(o) ? styles.imageWrapperChecked : styles.imageWrapper}>
              <Image
                style={props.selected.includes(o) ? styles.imageChecked : styles.image}
                source={onuPictures[index]}

              />
            </View>
          </TouchableWithoutFeedback>
        })}

      </View>

      <Animated.Image style={selectedImage ? [styles.selectedImage, {opacity: fadeAnim} ] : styles.nonSelected} source={selectedImage}/>

    </View>
  )
}

export default OnuObjectiveChoice;
