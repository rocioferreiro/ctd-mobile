import React from 'react';
import {Icon} from "react-native-elements";
import {Text, View} from "../Themed";
import {useTheme} from "react-native-paper";

type Props = {
  text: string,
  subtext: string
}

const NoResults = (props: Props) => {
  const {colors} = useTheme();

  return(
    <View style={{
      backgroundColor: 'transparent',
      width: '100%',
      minHeight: 80,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 10
    }}>
      <Icon size={30} color={colors.light} name={'compass-outline'} type={'ionicon'}/>
      <View style={{backgroundColor: 'transparent'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.light}}>{props.text}</Text>
        <Text style={{fontSize: 13, color: colors.light}}>{props.subtext}</Text>
      </View>
    </View>
  )
}

export default NoResults;
