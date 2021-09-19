import * as React from 'react';
import {Badge, useTheme} from 'react-native-paper';


const CTDBadge = () => {
    const {colors} = useTheme();
    return (
        <Badge  size={30}  style={{backgroundColor: colors.accent}}>
            1
        </Badge>
    );
}

export default CTDBadge;