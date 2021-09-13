
import {Picker} from '@react-native-picker/picker';
import React, {useRef, useState} from "react";
import {View} from "../Themed";


interface Props {
    i18n: any
    setLanguage:(string)=>void
}

export const LanguagePicker = (props:Props) => {

    const [selectedLanguage, setSelectedLanguage] =useState("en");

    function handleChange(itemValue) {
        setSelectedLanguage(itemValue)
        props.setLanguage(itemValue)
    }

    return (
        <View style={{zIndex:1}}>
        <Picker

            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
               handleChange(itemValue)
            }>
            <Picker.Item label="Español" value="es" />
            <Picker.Item label="English" value="en" />
        </Picker>
        </View>
    );
};




