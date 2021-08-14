import React, {useState} from "react";

import {Card, TextInput} from "react-native-paper";
import {View, Text} from "../Themed";
import MapView, {LatLng, Marker} from "react-native-maps";
import {StyleSheet} from "react-native";
import { useTheme } from 'react-native-paper';

const ChallengeLocation = () => {
    const { colors } = useTheme();
    const [marker, setMarker] = useState<LatLng>();
    const [locationExtraInfo, setLocationExtraInfo] = useState('');

    const styles = StyleSheet.create({
        title: {

        },
        card: {
            width: '100%',
            height: 350,
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
            margin: 5
        },
        input: {
            margin: 5,
            width: '100%'
        }
    });

    return (
        <View>
            <Card style={styles.card}>
                <Text style={styles.title}>Where will your challenge be?</Text>
                <View style={styles.mapWrapper}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 0,
                            longitude: 0,
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
                    label="Add whatever additional info you want for the location..."
                    value={locationExtraInfo}
                    onChangeText={t => setLocationExtraInfo(t)}
                />
            </Card>
        </View>
    );
}

export default ChallengeLocation;
