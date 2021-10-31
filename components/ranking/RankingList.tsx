import React from "react";
import {StyleSheet, View} from "react-native";
import {Text} from "../Themed";
import {DataTable, useTheme} from 'react-native-paper';
import {useTranslation} from "react-i18next";
import { Col, Row, Grid } from "react-native-easy-grid";

type Props = {
  ods?: number
}

const RankingList = (props: Props) => {

  const [listData, setListData] = React.useState([{title: 'Great challenge', participants: 700, score: 500},
    {title: 'Save the turtles', participants: 700, score: 500},
    {title: 'Construction weekend', participants: 700, score: 500},
    {title: 'Great challenge', participants: 700, score: 500},
    {title: 'Great challenge', participants: 700, score: 500},
    {title: 'Great challenge', participants: 700, score: 500},
    {title: 'Great challenge', participants: 700, score: 500},
    {title: 'Great challenge', participants: 700, score: 500}])
  const {colors} = useTheme();
  const {t} = useTranslation();

  const styles = StyleSheet.create({
    container: {
      marginTop: 40,
      padding: 15,
      backgroundColor: '#FFF7F0',
      borderRadius: 20,
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.5,
      shadowColor: '#DAB99D',
      elevation: 4,
      minHeight: 400
    },
    rowContainer: {
      margin: 5
    },
    row: {
      backgroundColor: '#fff',
      borderRadius: 60,
      paddingVertical: 5,
      paddingLeft: 10,
      marginHorizontal: 0,
      marginVertical: 5,
    },
    tableTitle: {
      fontFamily: 'aria',
      color: '#717171',
      fontSize: 14,
    }
  })

  return <View style={styles.container}>
    <Grid>
      <Row style={{borderBottomWidth: 0, paddingBottom: 0}}>
        <Col size={60}><Text style={styles.tableTitle}>{t('ranking.challenge')}</Text></Col>
        <Col size={25}><Text style={styles.tableTitle}>{t('ranking.users')}</Text></Col>
        <Col size={15}><Text style={styles.tableTitle}>{t('ranking.score')} </Text></Col>
      </Row>
      {listData.map((i, index) => {
        return (//<View style={styles.rowContainer} key={index}>
          <Row style={styles.row} onPress={() => {}}>{/*Por ahora no hay on Press, al integrar es un navigate*/}
            <Col size={65} style={{padding: 0, display: "flex", justifyContent: "center"}}><Text style={{color: colors.primary, fontWeight:"bold", fontFamily: 'aria'}}>{i.title}</Text></Col>
            <Col size={20} style={{padding: 0, display: "flex", justifyContent: "center", alignItems: "center"}}><Text style={{color: colors.primary, fontWeight:"bold", fontFamily: 'aria'}}>{i.participants}</Text></Col>
            <Col size={15} style={{padding: 0, display: "flex", justifyContent: "center", alignItems: "center"}}><Text style={{color: colors.accent, fontWeight:"bold", fontFamily: 'aria'}}>{i.score}</Text></Col>
          </Row>)
        //</View>
      })}
    </Grid>
  </View>
}

export default RankingList;
