import * as React from 'react';
import {Button, useTheme} from 'react-native-paper';
import {Text} from "../Themed";

interface  Props {

    handlePublish:(formik) =>void
    formik:any
}

const PublishButton = (props:Props) => {
    const { colors } = useTheme();
    return (
        <Button style={{backgroundColor: colors.extra,width:"100%"}} icon="check-bold" mode="contained"
                    onPress={() => props.handlePublish(props.formik)}>
            <Text style={{fontSize:20,color:colors.background}} > Publish</Text>
        </Button>
    );
};

export default PublishButton;