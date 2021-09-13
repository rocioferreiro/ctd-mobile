import React from "react";
import {Animated, Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {ONUObjectives} from "../../ONUObjectives";
import {IconButton, useTheme} from "react-native-paper";
import ImageCarousel from "./objectivesScroll";
import {Icon} from "react-native-elements";
import {onuPictures} from "./onuObjectiveInfo";

type Props = {
  selected: any[],
  setSelected: (any) => void,
  setOpen: (boolean) => void,
  formik: any
}

const OnuObjectiveChoice  = (props: Props) => {
  const { colors } = useTheme();
  const [currentIndex, setCurrentIndex] = React.useState(1)
  const objectiveSize = Dimensions.get('window').width / 5;

  const styles = StyleSheet.create({
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: colors.primary,
      marginLeft: 5,
      marginTop: -20,
    },
    container: {
      zIndex:5,
      //height: Dimensions.get('window').height * 0.3,
    },
    image: {
      width: objectiveSize,
      height: objectiveSize,
      opacity: 0.5
    },
    imageChecked: {
      width: objectiveSize,
      height: objectiveSize,
    },
    imageWrapperChecked: {
      borderColor: colors.text,
      borderStyle: 'solid',
      borderWidth:  5,
      width: objectiveSize + 10,
      height: objectiveSize + 10,
    },
    imageWrapper: {
      width: objectiveSize,
      height: objectiveSize,
      margin: 5,
      backgroundColor: colors.surface
    },
    onuContainer: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
    },
    nonSelected: {
      display: "none"
    },
    label: {
      fontWeight: "bold",
      color: colors.primary,
      marginLeft: 5,
      marginTop: 5,
      marginBottom: 10,
      fontSize: 20
    },
    text: {
      fontWeight: "normal",
      color: colors.primary,
      marginLeft: 5,
      marginTop: 5,
      marginBottom: 10,
      fontSize: 18
    },
    emptyOption: {
      width: 50, height: 50,
      borderRadius: 25,
      marginHorizontal:10,
      borderWidth: 1,
      borderColor: '#DAB99D',
      backgroundColor: colors.surface,
      textAlignVertical: "center",
      textAlign: "center",
      justifyContent: "center",
      display: "flex",
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.5,
      shadowColor: '#DAB99D',
      elevation: 3
    },
    imageOpt: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginHorizontal:10
    },
    done: {
      width: 50, height: 50,
      borderRadius: 25,
      margin:0,
      backgroundColor: colors.extra,
      textAlignVertical: "center",
      textAlign: "center",
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.5,
      shadowColor: '#DAB99D',
      elevation: 3
    },
    add: {
      width: 40, height: 40,
      borderRadius: 20,
      marginTop:0,
      backgroundColor: colors.accent,
      textAlignVertical: "center",
      textAlign: "center",
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.5,
      shadowColor: '#DAB99D',
      elevation: 3,
    },
    plusContainer: {
      width: '100%',
      display: "flex",
      flexDirection: "row",
      justifyContent: "center"
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose the sustainable objectives </Text>

      <View style={{height: Dimensions.get('window').height * 0.12}}>
        <Text style={styles.label}> Current Objectives </Text>
        {props.selected.length > 0 ?
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: "center", paddingHorizontal: 10}}>
            {props.selected.sort((a, b) => a.index > b.index ? 1 : -1).map((s, index) => {
              return <TouchableWithoutFeedback key={index} onPress={() => {
                  props.setSelected(props.selected.filter(i => i.obj !== Object.keys(ONUObjectives)[s.index]));
                  props.formik.setFieldValue('ONUObjective', props.formik.values.ONUObjective.filter(i => i !== index));
              }}>
                <Image style={styles.imageOpt} source={onuPictures[s.index].image}/>
              </TouchableWithoutFeedback>
            })}
          </View> :
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: "center"}}>
            <Icon style={styles.emptyOption} name={'remove-outline'} type={'ionicon'}/>
          </View>
        }
      </View>

      <ImageCarousel data={onuPictures} setCurrentIndex={setCurrentIndex}/>
      <View style={styles.plusContainer}>
        <IconButton icon={'plus-thick'} style={styles.add} color={colors.background}
          onPress={() => {
            if(props.selected.filter(i => i.obj === Object.keys(ONUObjectives)[currentIndex]).length <= 0) {
              props.setSelected([...props.selected, {
                obj: Object.keys(ONUObjectives)[currentIndex],
                index: currentIndex,
                image: onuPictures[currentIndex].image
              }]);
              props.formik.setFieldValue('ONUObjective', [...props.formik.values.ONUObjective, currentIndex]);
            }
          }}
        />
      </View>
      <View style={styles.onuContainer}>
        <Text style={styles.label}>Objective {currentIndex+1}:</Text>
        <Text style={styles.label}>{onuPictures[currentIndex].title}</Text>
        <Text style={styles.text}>{onuPictures[currentIndex].description}</Text>
        <View style={{justifyContent: "center", display: "flex", flexDirection: 'row', width: '100%'}}>
          <IconButton style={styles.done} icon={"check-bold"} onPress={() => props.setOpen(false)} color={colors.background}/>
        </View>
      </View>
    </View>
  )
}

export default OnuObjectiveChoice;
