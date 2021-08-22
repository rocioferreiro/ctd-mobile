import React from "react";
import {View} from "../../Themed";
import {SafeAreaView, StyleSheet} from "react-native";
import DateRPicker from 'react-native-neat-date-picker'
import {useTheme} from "react-native-paper";

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

  const setDates = (start, end) => {
    props.setStartDate(start)
    props.setEndDate(end)
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
    },
    selectedDateContainerStyle: {
      height: 35,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.accent,
    },
    selectedDateStyle: {
      fontWeight: "bold",
      color: "white",
      backgroundColor: colors.accent,
    },
  });

  return props.open &&
    <SafeAreaView style={styles.back}>
      <View style={styles.container}>
        <DateRPicker
          isVisible={props.open}
          mode={'range'}
          onConfirm={(start, end) => {
            setDates(start, end);
            props.close()
          }}
          startDate={props.startDate}
          endDate={props.endDate}
          onCancel={props.close}
          colorOptions={{headerColor: colors.surface,
            headerTextColor:colors.primary,
            weekDaysColor: colors.primary,
            selectedDateBackgroundColor: colors.primary,
            confirmButtonColor: colors.primary}}
        />
      </View>
    </SafeAreaView>
}

export default DatePicker;
