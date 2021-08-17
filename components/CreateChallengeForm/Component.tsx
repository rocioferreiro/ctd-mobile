import Toast from 'react-native-toast-message';
import React from "react";
import {View} from "../Themed";

function SomeComponent() {
    React.useEffect(() => {
        Toast.show({
            type:  'success',
            text1: 'Hello',
            text2: 'This is some something 👋'
        });
    }, []);

    return <View />;
}