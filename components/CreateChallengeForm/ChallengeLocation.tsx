import React, {useEffect, useState} from "react";

import {Card, TextInput} from "react-native-paper";
import {View, Text} from "../Themed";
import MapView, {LatLng, Marker} from "react-native-maps";
import {StyleSheet} from "react-native";
import { useTheme } from 'react-native-paper';
// import Geolocation from 'react-native-geolocation-service';

const ChallengeLocation = () => {
    const { colors } = useTheme();
    const [marker, setMarker] = useState<LatLng>();
    const [locationExtraInfo, setLocationExtraInfo] = useState('');

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
            padding: '3%',
        },
        map: {
            width: '100%',
            height: '100%',
        },
        mapWrapper: {
            height: '70%',
            borderWidth: 5,
            borderStyle: 'solid',
            borderColor: marker? colors.extra : colors.surface,
            borderRadius: 16,
            overflow: 'hidden',
            margin: 5,
            alignItems: 'center',
            justifyContent: 'center'
        },
        input: {
            marginTop: 5,
            width: '100%',
            backgroundColor: colors.surface
        }
    });

    // Get the location of the user. Needs permissions to work
    // useEffect(() => {
    //     Geolocation.getCurrentPosition(
    //         (position) => {
    //             console.log(position);
    //         },
    //         (error) => {
    //             // See error code charts below.
    //             console.log(error.code, error.message);
    //         },
    //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    //     );
    // });

    return (
        <View>
            <Card style={styles.card}>
                <Text style={styles.title}>Where will your challenge be?</Text>
                <View style={styles.mapWrapper}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: -34,
                            longitude: -58,
                            latitudeDelta: 10,
                            longitudeDelta: 10,
                        }}
                        onPress={(e) => {
                            setMarker(e.nativeEvent.coordinate);
                            console.log(marker);
                        }}>
                        {
                            marker &&
                            <Marker coordinate={marker}/>
                        }
                    </MapView>
                </View>
                <TextInput
                    style={styles.input}
                    mode={'flat'}
                    dense={'false'}
                    label="Add additional info (optional)"
                    value={locationExtraInfo}
                    onChangeText={t => setLocationExtraInfo(t)}
                />
            </Card>
        </View>
    );
}

export default ChallengeLocation;
