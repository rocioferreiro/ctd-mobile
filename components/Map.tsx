import MapView, {Marker} from "react-native-maps";
import {View} from "./Themed";
import React from "react";
import {Dimensions, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";

const Map = () => {

    const markers = [{title:'hola', description: 'como va', latlng: {latitude: 37, longitude: -122}, child: <Icon
            reverse
            name='flag'
            type='ionicon'
            color='#FFE933'
            size={15}
            iconStyle={styles.icon}
        /> },
        {title:'AAAAAAAA', description: 'como va', latlng: {latitude: 37.78825, longitude: -120}, child: <Icon
                reverse
                name='person'
                type='ionicon'
                color='#FFE933'
                size={15}
                iconStyle={styles.icon}
            /> }
    ]


    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                     initialRegion={{
                         latitude: 37.78825,
                         longitude: -122.4324,
                         latitudeDelta: 1,
                         longitudeDelta: 1,
                     }}>
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        title={marker.title}
                        description={marker.description}
                        coordinate={marker.latlng}
                    >
                        {marker.child}
                    </Marker>
                ))}
            </MapView>
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
    icon: {
        color: '#4625FF'
    }
});

export default Map;