import React, {useCallback, useEffect, useRef, useState} from "react";

import {ActivityIndicator, Card, TextInput, useTheme} from "react-native-paper";
import {Text, View} from "../Themed";
import MapView, {LatLng, Marker} from "react-native-maps";
import {Dimensions, Keyboard, StyleSheet} from "react-native";
import * as Location from "expo-location";

type Props = {
    setDisabled: (boolean) => void
    formik: any
}

const ProfileLocation = (props: Props) => {
    const { colors } = useTheme();
    const [marker, setMarker] = useState<LatLng>({latitude: 0, longitude: 0});
    const [location, setLocation] = useState(props.formik.coordinates);
    const [keyboardShown, setKeyboardShown] = React.useState(false);
    const [keyboardHeight, setKeyboardHeight] = React.useState(0);

    useEffect(() => {
        console.log(props.formik.values)
        if(!marker){
            props.setDisabled(true)
        }
        if(props.formik.values.coordinates) {
            //setLocation({latitude: props.formik.values.coordinates.latitude, longitude: props.formik.values.coordinates.longitude})
            console.log("THIS WORKSSSSS")
            console.log(props.formik.values.coordinates.latitude)
            console.log(props.formik.values.coordinates.longitude)
            setMarker({latitude: props.formik.values.coordinates.latitude, longitude: props.formik.values.coordinates.longitude})

            props.setDisabled(false)
        }
        (async () => {

            let enabled = await Location.hasServicesEnabledAsync();
            console.log(enabled)
            if (!enabled) {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') setLocation({"latitude": 0, "longitude":0});
            }
            let location = await Location.getLastKnownPositionAsync({});
            console.log(location)
            setLocation(location.coords);
        })();

        const showSubscription = Keyboard.addListener("keyboardDidShow", e => {
            setKeyboardShown(true);
            setKeyboardHeight(e.endCoordinates.height)
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardShown(false);
            setKeyboardHeight(0)
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const styles = StyleSheet.create({
        card: {
            width: '100%',
            height: Dimensions.get('window').height * 0.7,
            borderWidth: 0,
            padding: '3%',
            backgroundColor: 'rgba(0,0,0,0)'
        },
        map: {
            width: '100%',
            height: '100%',
        },
        mapWrapper: {
            height: '70%',
            borderWidth: 5,
            borderStyle: 'solid',
            borderColor: marker ? colors.extra : colors.surface,
            borderRadius: 16,
            overflow: 'hidden',
            margin: 5,
            alignItems: 'center',
            justifyContent: 'center'
        },
        input: {
            marginTop: 5,
            position: "relative",
            bottom: keyboardShown? keyboardHeight - Dimensions.get("window").height*0.15 : 0,
            width: '100%',
            backgroundColor: colors.surface,
            height: Dimensions.get("window").height * 0.09
        }
    });

    return ( location && marker ?
        <View style={{backgroundColor: 'rgba(0,0,0,0)'}}>
            <View style={styles.card}>
                <View style={styles.mapWrapper}>
                    {location &&
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                        }}
                        onPress={(e) => {
                            props.setDisabled(false)
                            setMarker(e.nativeEvent.coordinate);
                            props.formik.setFieldValue('coordinates', {latitude: e.nativeEvent.coordinate.latitude, longitude:  e.nativeEvent.coordinate.longitude});
                            props.formik.setFieldValue('address', {coordinates: {latitude: e.nativeEvent.coordinate.latitude, longitude:  e.nativeEvent.coordinate.longitude}});
                            console.log(marker);
                            console.log(props.formik.values.coordinates);
                        }}>
                        {
                            marker &&
                            <Marker coordinate={marker}/>
                        }
                    </MapView>}
                </View>
        </View>
        </View> : <ActivityIndicator size="large" />
    );
}

export default ProfileLocation;
