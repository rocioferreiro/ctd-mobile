import React from "react";
import {View, Text} from "./Themed";
import Stepper from "./CreateChallengeForm/Stepper";
import {Card, IconButton, useTheme} from "react-native-paper";
import {Dimensions, StyleSheet, Image} from "react-native";
import {Button, Icon} from "react-native-elements";

const Home = () => {
  const [create, setCreate] = React.useState(false)
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: "center",
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      position:"absolute",
      zIndex:0
    },
    homeCard: {
      paddingTop: Dimensions.get('window').height * 0.1,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height - 20,
    },
    button: {
      backgroundColor: 'rgba(0,0,0,0)',
      marginBottom: 0,
      paddingBottom:0,
      paddingLeft:0,
      marginLeft:-10
    },
    creationCard: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height * 0.95,
      marginTop: Dimensions.get('window').height * 0.03,
      backgroundColor: colors.surface
    }
  })

  return (
    <View style={{backgroundColor: colors.surface}}>
      {!create && <Card style={styles.homeCard}>
        <Text> Home Screen </Text>
          <View style={{width: '60%',marginTop: 10}}>
              <Button raised={true}
                      title={'Create a new Challenge!'}
                      onPress={() => setCreate(true)}
                      buttonStyle={{backgroundColor: colors.primary}}
              />
          </View>

      </Card>}
      {create && <Card style={styles.creationCard}>
        {/*<Image source={require('../assets/images/dots.png')} resizeMode={'cover'} style={styles.background}/>*/}
        {/*PARA FONDO COLOR: descomentar el de abajo, comentar el de arriba*/}
        <Image source={require('../assets/images/connections.png')} resizeMode={'cover'} style={styles.background}/>
          <View style={{width: '25%', backgroundColor: 'rgba(0,0,0,0)', }}>
              <Button onPress={() => setCreate(false)}
                      icon={{name: 'chevron-back-outline', type: 'ionicon'}}
                      buttonStyle={styles.button}
                      titleStyle={{color: colors.primary}}
                      title="Cancel"
              />
          </View>
          <Stepper/>
      </Card>}
    </View>
  )
}

export default Home;
