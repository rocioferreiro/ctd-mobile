import React, {useEffect} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import AwesomeTabbar from './AnimatedTabbar';
import {Icon} from "react-native-elements";
import Home from "../components/Home";
import SearchScreen from "../components/SearchScreen";
import Map from "../components/Map";
import {ChallengeList} from "../components/ChallengeList/Challenge";
import {colorShade} from "../components/Models/shadingColor";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

//array of icon views this array can be image or vector icon for tab  bar
// array size can be 1 to maximum 5 !
const icons = [
  <Icon
    name={'grid-outline'}
    type={'ionicon'}
    />,
  <Icon
    name={'search-outline'}
    type={'ionicon'}
    />,
  <Icon
    name={'location-outline'}
    type={'ionicon'}
    />,
  <Icon
    name={'person-outline'}
    type={'ionicon'}
    />
];

const components = [
  <Home/>, <SearchScreen/>, <Map/>, <ChallengeList/>
]
type Props = {
  colorScheme
};

const Tabbar = (props: Props) => {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: props.colorScheme.colors.backgroundColor,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });


  const [actualComponent, setActualComponent] = React.useState<number>()

  const changeView = (index) => {
    switch (index) {
      case 1: setActualComponent(0)
        break;
      case 2: setActualComponent(1)
        break;
      case 3: setActualComponent(2)
        break;
      case 4: setActualComponent(3)
        break;
    }
  }

  useEffect(()=>{
    changeView(1)
  }, [])

  return (
    <View style={styles.container}>
      {actualComponent? components[actualComponent] : components[0]}
      <AwesomeTabbar
        icons={icons} //array of icon views this array can be image or vector icon
        selectedColor={[
          props.colorScheme.colors.light,
          props.colorScheme.colors.extra,
          props.colorScheme.colors.accent,
          props.colorScheme.colors.notification]} //color of selected item in tab bar
        backgroundColor={colorShade(props.colorScheme.colors.surface, -15)} //background color of tab bar
        onSelect={changeView} //on select an item , index starts at 1 :-D
      />
    </View>
  );
}

export default Tabbar;

