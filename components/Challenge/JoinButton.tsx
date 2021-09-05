import * as React from 'react';
import {Button, Title, useTheme} from 'react-native-paper';


const JoinButton = () => {
    const { colors } = useTheme();
   return( <Button style={{ backgroundColor:colors.primary, height:70, width:"100%", padding:15,justifyContent: "center",alignContent:"center"}} mode="contained" onPress={() => console.log('Pressed')}>
      <Title style={{fontSize:22,fontWeight:"bold", color:colors.background}}>Join this Challenge
      <Title style={{fontSize:22,fontWeight:"bold", color:colors.accent}}> Now</Title>
      </Title>
    </Button>
);
}

export default JoinButton;