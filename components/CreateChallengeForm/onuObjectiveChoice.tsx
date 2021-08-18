import React from "react";
import {Animated, Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {ONUObjectives} from "./ONUObjectives";
import {Button, IconButton, useTheme} from "react-native-paper";
import ImageCarousel from "./objectivesScroll";
import {Icon} from "react-native-elements";
import { mdiCheck } from '@mdi/js';

const obj1 = {image: require(`../../assets/images/objetive1.png`), title: "NO POVERTY", description: "Economic growth must be inclusive to provide sustainable jobs and promote equality."}
const obj2 = {image: require(`../../assets/images/objetive2.png`), title: "ZERO HUNGER", description: "The food and agriculture sector offers key solutions for development, and is central for hunger and poverty eradication."}
const obj3 = {image: require(`../../assets/images/objetive3.png`), title: "GOOD HEALTH AND WELL-BEING" , description: "Ensuring healthy lives and promoting the well-being for all at all ages is essential to sustainable development."}
const obj4 = {image: require(`../../assets/images/objetive4.png`), title: "QUALITY EDUCATION", description: "Obtaining a quality education is the foundation to improving people’s lives and sustainable development."}
const obj5 = {image: require(`../../assets/images/objetive5.png`), title: "GENDER EQUALITY", description: "Gender equality is not only a fundamental human right, but a necessary foundation for a peaceful, prosperous and sustainable world."}
const obj6 = {image: require(`../../assets/images/objetive6.png`), title: "CLEAN WATER AND SANITATION", description: "Clean, accessible water for all is an essential part of the world we want to live in." }
const obj7 = {image: require(`../../assets/images/objetive7.png`), title: "AFFORDABLE AND CLEAN ENERGY", description: "Energy is central to nearly every major challenge and opportunity."}
const obj8 = {image: require(`../../assets/images/objetive8.png`), title: "DECENT WORK AND ECONOMIC GROWTH", description: "Sustainable economic growth will require societies to create the conditions that allow people to have quality jobs."}
const obj9 = {image: require(`../../assets/images/objetive9.png`), title: "INDUSTRY, INNOVATION, AND INFRASTRUCTURE", description: "Investments in infrastructure are crucial to achieving sustainable development." }
const obj10 = {image: require(`../../assets/images/objetive10.png`), title: "REDUCED INEQUALITIES", description: "To reduce inequalities, policies should be universal in principle, paying attention to the needs of disadvantaged and marginalized populations." }
const obj11 = {image: require(`../../assets/images/objetive11.png`), title: "SUSTAINABLE CITIES AND COMMUNITIES", description: "There needs to be a future in which cities provide opportunities for all, with access to basic services, energy, housing, transportation and more."}
const obj12 = {image: require(`../../assets/images/objetive12.png`), title: "RESPONSIBLE CONSUMPTION AND PRODUCTION", description: "Responsible Production and Consumption" }
const obj13 = {image: require(`../../assets/images/objetive13.png`), title: "CLIMATE ACTION", description: "Climate change is a global challenge that affects everyone, everywhere."}
const obj14 = {image: require(`../../assets/images/objetive14.png`), title: "LIFE BELOW WATER", description: "Careful management of this essential global resource is a key feature of a sustainable future."}
const obj15 = {image: require(`../../assets/images/objetive15.png`), title: "LIFE ON LAND", description: "Sustainably manage forests, combat desertification, halt and reverse land degradation, halt biodiversity loss."}
const obj16 = {image: require(`../../assets/images/objetive16.png`), title: "PEACE, JUSTICE AND STRONG INSTITUTIONS", description: "Access to justice for all, and building effective, accountable institutions at all levels."}
const obj17 = {image: require(`../../assets/images/objetive17.png`), title: "PARTNERSHIPS", description: "Revitalize the global partnership for sustainable development." }

type Props = {
  selected: any[],
  setSelected: (any) => void,
  setOpen: (boolean) => void
}
const OnuObjectiveChoice  = (props: Props) => {
  const { colors } = useTheme();
  const onuPictures = [obj1, obj2, obj3, obj4, obj5, obj6, obj7, obj8, obj9, obj10, obj11, obj12, obj13, obj14, obj15, obj16, obj17]
  const [selectedImage, setSelectedImage] = React.useState()
  const fadeAnim: Animated.Value = React.useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = React.useState(1)

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

  const objetciveSize = Dimensions.get('window').width / 5;

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
      height: Dimensions.get('window').height * 0.6,
    },
    image: {
      width: objetciveSize,
      height: objetciveSize,
      opacity: 0.5
    },
    imageChecked: {
      width: objetciveSize,
      height: objetciveSize,
    },
    imageWrapperChecked: {
      borderColor: colors.text,
      borderStyle: 'solid',
      borderWidth:  5,
      width: objetciveSize + 10,
      height: objetciveSize + 10,
    },
    imageWrapper: {
      width: objetciveSize,
      height: objetciveSize,
      margin: 5,
      backgroundColor: colors.surface
    },
    onuContainer: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      height: Dimensions.get('window').height*0.22
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
      marginRight:70,
      backgroundColor: colors.accent,
      textAlignVertical: "center",
      textAlign: "center",
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.5,
      shadowColor: '#DAB99D',
      elevation: 3
    }
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose the sustainable objectives </Text>

      <View style={{height: Dimensions.get('window').height * 0.12}}>
        <Text style={styles.label}>Current Objectives </Text>
        {props.selected.length > 0 ?
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: "center", paddingHorizontal: 10}}>
            {props.selected.sort((a, b) => a.index > b.index ? 1 : -1).map((s, index) => {
              return <TouchableWithoutFeedback key={index} onPress={() => props.setSelected(props.selected.filter(i => i.obj !== Object.keys(ONUObjectives)[s.index]))}>
                <Image style={styles.imageOpt} source={onuPictures[s.index].image}/>
              </TouchableWithoutFeedback>
            })}
          </View> :
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: "center"}}>
            <Icon style={styles.emptyOption} name={'add-outline'} type={'ionicon'}/>
          </View>
        }
      </View>

      <ImageCarousel data={onuPictures} setCurrentIndex={setCurrentIndex}/>
      <View style={styles.onuContainer}>
        <Text style={styles.label}>Objective {currentIndex+1}:</Text>
        <Text style={styles.label}>{onuPictures[currentIndex].title}</Text>
        <Text style={styles.text}>{onuPictures[currentIndex].description}</Text>
        <IconButton icon={'plus-thick'} style={styles.add} color={colors.background}
          onPress={() => {
            if(props.selected.filter(i => i.obj === Object.keys(ONUObjectives)[currentIndex]).length <= 0)
              props.setSelected( [...props.selected, {obj: Object.keys(ONUObjectives)[currentIndex], index: currentIndex, image: onuPictures[currentIndex].image}])
          }}
        />
      </View>
      <View style={{justifyContent: "center", display: "flex", flexDirection: 'row'}}>
        <IconButton style={styles.done} icon={"check-bold"} onPress={() => props.setOpen(false)} color={colors.background}/>
      </View>
    </View>
  )
}

export default OnuObjectiveChoice;
