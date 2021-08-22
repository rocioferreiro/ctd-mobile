import React from "react";
import {useTheme} from "react-native-paper";
import {View} from "../../Themed";
import ImagePickerExample from "./ChallengeInscriptionsInfo";
import DatePicker from "./DatePicker";

const ChallengeExtraInfo = () => {
  const {colors} = useTheme()
  const [startDate, setStartDate] = React.useState(new Date())
  const [endDate, setEndDate] = React.useState(new Date())

  const selectionRange = {
    startDate:startDate,
    endDate: endDate,
    key: 'selection',
  }

  const setDates = (dates) => {
    console.log(dates)
    // const {startDate, endDate, displayedDate: theDate} = dates
    // if (startDate) props.setStartDate(startDate)
    // if (endDate) props.setEndDate(endDate)
    //if (theDate) setDisplayedDate(theDate)
  }

  return (
    <View style={{backgroundColor:'rgba(0,0,0,0)'}}>
      <DatePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
      <ImagePickerExample/>
    </View>
  )
}

export default ChallengeExtraInfo;
