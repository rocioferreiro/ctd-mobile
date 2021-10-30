import React from "react";
import {StyleSheet, View} from "react-native";
import {Text} from "../Themed";
import {DataTable, useTheme} from 'react-native-paper';
import {colorShade} from "../Models/shadingColor";

const RankingList = ({navigation,route}) => {

  const [listData, setListData] = React.useState([{title: 'Great challenge', participants: 700, score: 500},
    {title: 'Great challenge', participants: 700, score: 500},
    {title: 'Great challenge', participants: 700, score: 500},
    {title: 'Great challenge', participants: 700, score: 500}])
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginTop: 50,
      padding: 15,
      backgroundColor: '#FFF7F0',
      borderRadius: 50
    },
    rowContainer: {
      margin: 5
    },
    row: {
      backgroundColor: '#fff',
      borderRadius: 60,
      padding: -10,
      margin: 0
    }
  })

  return <View style={styles.container}>
    <DataTable>
      <DataTable.Header style={{borderBottomWidth: 0, paddingBottom: 0}}>
        <DataTable.Title> <Text style={{fontFamily: 'aria', color: '#717171'}}> Challenge </Text> </DataTable.Title>
        <DataTable.Title numeric> <Text style={{fontFamily: 'aria', color: '#717171'}}> Participants </Text> </DataTable.Title>
        <DataTable.Title numeric> <Text style={{fontFamily: 'aria', color: '#717171'}}> Points </Text> </DataTable.Title>
      </DataTable.Header>

      {listData.map((i, index) => {
        return <View style={styles.rowContainer} key={index}>
          <DataTable.Row style={styles.row}>
            <DataTable.Cell style={{padding: 0}}><Text style={{color: colors.primary, fontWeight:"bold", fontFamily: 'aria'}}>{i.title}</Text></DataTable.Cell>
            <DataTable.Cell style={{padding: 0}} numeric centered><Text style={{color: colors.primary, fontWeight:"bold", fontFamily: 'aria'}}>{i.participants}</Text></DataTable.Cell>
            <DataTable.Cell style={{padding: 0}} numeric><Text style={{color: colors.accent, fontWeight:"bold", fontFamily: 'aria'}}>{i.score}</Text></DataTable.Cell>
          </DataTable.Row>
        </View>

      })}

    </DataTable>
  </View>
}

export default RankingList;
