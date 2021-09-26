import React from 'react';
import {Icon} from "react-native-elements";
import {Badge} from 'react-native-paper';

type Props = {
  backgroundColor: string,
  badgeNumber: number,
  badgeColor: string
}

const PersonIcon = (props: Props) => {
  return (
    <>
      {props.badgeNumber != undefined && props.badgeNumber > 0 &&
      <Badge size={20} style={{
        backgroundColor: props.badgeColor,
        position: 'absolute',
        top: 0,
        left: 40,
        zIndex: 2
      }}>{props.badgeNumber}</Badge>}
      <Icon name={'person-outline'} type={'ionicon'} color={props.backgroundColor} size={25}/>
    </>
  );
}

export default PersonIcon;
