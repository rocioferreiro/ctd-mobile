
import {Picker} from '@react-native-picker/picker';
import React, {useRef, useState} from "react";
import {View} from "../Themed";


interface Props {
    i18n: any
    setLanguage:(string)=>void
    setChangeLanguage:(boolean)=>void
}

export const LanguagePicker = (props:Props) => {

    const [selectedLanguage, setSelectedLanguage] =React.useState(props.i18n.language);


    function handleChange(itemValue) {
        setSelectedLanguage(itemValue)

        props.i18n.changeLanguage(itemValue)
        props.setChangeLanguage(false)
        console.log(props.i18n.language)
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




