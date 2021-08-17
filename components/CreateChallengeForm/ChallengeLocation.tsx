import React, {useCallback, useEffect, useRef, useState} from "react";

import {Card, TextInput, useTheme} from "react-native-paper";
import {Text, View} from "../Themed";
import MapView, {LatLng, Marker} from "react-native-maps";
import {Dimensions, StyleSheet} from "react-native";
import * as Location from "expo-location";

const ChallengeLocation = () => {
    const { colors } = useTheme();
    const [marker, setMarker] = useState<LatLng>();
    const [locationExtraInfo, setLocationExtraInfo] = useState('');
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        })();
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
            height: 500,
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
            width: '100%',
            backgroundColor: colors.surface,
            height: Dimensions.get("window").height * 0.12
        }
    });

    return (
        <View style={{backgroundColor: 'rgba(0,0,0,0)'}}>
            <Card style={styles.card}>
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
                          setMarker(e.nativeEvent.coordinate);
                          console.log(marker);
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
                    value={locationExtraInfo}
                    onChangeText={t => setLocationExtraInfo(t)}
                />
            </Card>
        </View>
    );
}

export default ChallengeLocation;
