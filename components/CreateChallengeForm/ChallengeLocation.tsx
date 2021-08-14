import React, {useState} from "react";

import {Card} from "react-native-paper";
import {View, Text} from "../Themed";
import MapView, {LatLng, Marker} from "react-native-maps";
import {Dimensions, StyleSheet} from "react-native";

const ChallengeLocation = () => {
    const [marker, setMarker] = useState<LatLng>();

    return (
        <View>
            <Card style={{width: 300, height: 300}}>
                <Text> Challenge Location</Text>
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
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    // icon: {
    //     color: '#4625FF'
    // }
});

export default ChallengeLocation;
