import * as React from 'react';
import {Badge, useTheme} from 'react-native-paper';

type Props = {
  number: number,
  color: string
}

const CTDBadge = (props: Props) => {
    return (
        <Badge  size={30}  style={{backgroundColor: props.color, position: 'absolute', top: 0, left:15, zIndex: 2}}>
          {props.number}
        </Badge>
    );
}

export default CTDBadge;
