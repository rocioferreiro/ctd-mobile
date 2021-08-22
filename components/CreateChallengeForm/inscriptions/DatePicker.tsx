import React from "react";
import {View} from "../../Themed";
import {Dimensions, SafeAreaView, StyleSheet, Text} from "react-native";
import DateRangePicker from "rnv-date-range-picker";
import moment from "moment";

type Props = {
  startDate: any,
  setStartDate: (any) => void,
  endDate: any,
  setEndDate: (any) => void,
}
const DatePicker = (props: Props) => {

  const setDates = (dates) => {
    const {firstDate, secondDate} = dates
    if (firstDate) props.setStartDate(firstDate)
    if (secondDate) props.setEndDate(secondDate)
  }
  const styles = StyleSheet.create({
    container: {
      margin: 50,
    },
    backdrop: {
      backgroundColor: 'rgba(0,0,0,0)'
    }
  });

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <DateRangePicker
          onSelectDateRange={(range) => {
            setDates(range);
          }}
          responseFormat="YYYY-MM-DD"
        />
      </View>
    </SafeAreaView>
  )
}

export default DatePicker;
