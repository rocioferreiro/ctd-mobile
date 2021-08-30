import * as React from 'react';
import {Button, Title, useTheme} from 'react-native-paper';


const JoinButton = () => {
    const { colors } = useTheme();
   return( <Button style={{ backgroundColor:colors.extra, height:70, padding:15}} mode="contained" onPress={() => console.log('Pressed')}>
      <Title style={{fontSize:25,fontWeight:"bold", color:colors.background}}>Join Now
      </Title>
    </Button>
);
}

export default JoinButton;