import React from "react";
import {View} from "../../Themed";
import {Dimensions, SafeAreaView, StyleSheet} from "react-native";
import DateRangePicker from "rnv-date-range-picker";
import {Button, useTheme} from "react-native-paper";

type Props = {
  startDate: any,
  setStartDate: (any) => void,
  endDate: any,
  setEndDate: (any) => void,
  open: boolean,
  close: () => void
}
const DatePicker = (props: Props) => {
  const {colors} = useTheme()

  const setDates = (dates) => {
    const {firstDate, secondDate} = dates
    if (firstDate) props.setStartDate(firstDate)
    if (secondDate) props.setEndDate(secondDate)
  }
  const styles = StyleSheet.create({
    back: {
      position: "absolute",
      width: '100%',
      flex: 1,
    },
    container: {
      margin: 50,
    },
    backdrop: {
      backgroundColor: 'rgba(0,0,0,0)'
    }
  });

  return props.open &&
    <SafeAreaView style={styles.back}>
      <View style={styles.container}>
        <DateRangePicker
            selectedDateContainerStyle={{backgroundColor: colors.accent}}
          onSelectDateRange={(range) => {
            setDates(range);
          }}
          responseFormat="YYYY-MM-DD"
        />
          <Button mode={'contained'} onPress={props.close}>Done</Button>
      </View>
    </SafeAreaView>
}

export default DatePicker;
