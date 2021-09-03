import React, {useCallback, useEffect, useRef, useState} from "react";

import {Card, TextInput, useTheme} from "react-native-paper";
import {Text, View} from "../Themed";
import MapView, {LatLng, Marker} from "react-native-maps";
import {Dimensions, Keyboard, StyleSheet} from "react-native";
import * as Location from "expo-location";

type Props = {
    setDisabled: (boolean) => void
    formik: any
}

const ChallengeLocation = (props: Props) => {
    const { colors } = useTheme();
    const [marker, setMarker] = useState<LatLng>();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [keyboardShown, setKeyboardShown] = React.useState(false);
    const [keyboardHeight, setKeyboardHeight] = React.useState(0);

    useEffect(() => {
        if(!marker){
            props.setDisabled(false)
        }
        if(props.formik.values.coordinates) {
            setMarker({latitude: props.formik.values.coordinates.coordinates[0], longitude: props.formik.values.coordinates.coordinates[1]})
            props.setDisabled(false)
        }
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocation({"latitude": 0, "longitude":0});
            } else {
                let location = await Location.getCurrentPositionAsync({});
                console.log(location)
                setLocation(location.coords);
            }
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
        title: {
            fontSize: 35,
            fontWeight: 'bold',
            color: colors.primary,
            marginLeft: 25,
            marginTop: -22,
        },
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
            height: Dimensions.get("window").height * 0.1
        }
    });

    return (
        <View style={{backgroundColor: 'rgba(0,0,0,0)'}}>
            <View style={styles.card}>
                <Text style={styles.title}>Where will your challenge be?</Text>
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
                          props.formik.setFieldValue('coordinates', {coordinates: [e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude]});
                          console.log(marker);
                          console.log(props.formik.values.coordinates);
                      }}>
                        {
                            marker &&
                            <Marker coordinate={marker}/>
                        }
                    </MapView>}

                </View>
                <TextInput
                    style={styles.input}
                    mode={'flat'}
                    dense={false}
                    multiline={true}
                    label="Add additional info (optional)"
                    value={props.formik.values.locationExtraInfo}
                    onChangeText={(value) => {props.formik.setFieldValue('locationExtraInfo', value)}}
                />
            </View>
        </View>
    );
}

export default ChallengeLocation;
