import React from "react";
import {View, Text} from "./Themed";
import Stepper from "./CreateChallengeForm/Stepper";
import {Card, IconButton, useTheme} from "react-native-paper";
import {Dimensions} from "react-native";
import {Button, Icon} from "react-native-elements";

const Home = () => {
  const [create, setCreate] = React.useState(false)
  const { colors } = useTheme();

  return (
    <View style={{backgroundColor: colors.surface}}>
      {!create && <Card style={{
        paddingTop: Dimensions.get('window').height * 0.1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 20,
      }}>
        <Text> Home Screen </Text>
          <View style={{width: '60%',marginTop: 10}}>
              <Button raised={true}
                      title={'Creat a new Challenge!'}
                      onPress={() => setCreate(true)}
                      buttonStyle={{backgroundColor: colors.primary}}
              />
          </View>

      </Card>}
      {create && <Card style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.95,
        marginTop: Dimensions.get('window').height * 0.03
      }}>
          <View style={{width: '50%'}}>
              <Button onPress={() => setCreate(false)}
                      icon={{name: 'chevron-back-outline', type: 'ionicon'}}
                      buttonStyle={{backgroundColor: colors.surface, marginBottom: 0, paddingBottom:0, paddingLeft:0, marginLeft:-10}}
                      titleStyle={{color: colors.primary}}
                      title="Cancel creation"
              />
          </View>
          <Stepper/>
      </Card>}
    </View>
  )
}

export default Home;
