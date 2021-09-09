import "react-apollo"
import {View} from "../Themed";
import React, {useContext} from "react";
import {Dimensions, StyleSheet} from "react-native";
import {Button, useTheme} from "react-native-paper";
import {AuthContext} from "../../App";

export function Profile() {
  const {colors} = useTheme();
  const auth = useContext(AuthContext);

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surface,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }
  });

  return (
    <View style={styles.container}>
      <Button onPress={() => {auth.signOut().catch(e => console.log(e))}}>Logout</Button>
    </View>
  );
}
