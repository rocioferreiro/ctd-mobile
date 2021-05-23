import MapView, {Marker} from "react-native-maps";
import {Text, View} from "./Themed";
import React, {useEffect, useState} from "react";
import {Dimensions, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";
import {useQuery} from "@apollo/client";
import {FIND_NEARBY_CHALLENGES} from "./apollo-graph/Queries";

type Marker = {
    title: string,
    description: string,
    latlng: Coordinates,
    child: any
}

type Coordinates = {
    latitude: number,
    longitude: number
}

const Map = () => {

    const {data,error,loading} = useQuery(FIND_NEARBY_CHALLENGES);

    // const markers = [{title:'hola', description: 'como va', latlng: {latitude: 37, longitude: -122}, child: <Icon
    //         reverse
    //         name='flag'
    //         type='ionicon'
    //         color='#FFE933'
    //         size={15}
    //         iconStyle={styles.icon}
    //     /> },
    //     {title:'AAAAAAAA', description: 'como va', latlng: {latitude: 37.78825, longitude: -120}, child: <Icon
    //             reverse
    //             name='person'
    //             type='ionicon'
    //             color='#FFE933'
    //             size={15}
    //             iconStyle={styles.icon}
    //         /> }
    // ]

    const [challengeMarkers, setChallengeMarkers] = useState<Marker[]>()

    useEffect(()=> {
        if(data){
            const result = data.findNearbyChallenges.map((c) => {
                return {
                    title: c.title,
                    description: c.description,
                    latlng: {latitude: c.address.coordinates.latitude, longitude: c.address.coordinates.longitude},
                    child: <Icon
                        reverse
                        name='flag'
                        type='ionicon'
                        color='#FFE933'
                        size={15}
                        iconStyle={styles.icon}
                    />
                }
            })
            setChallengeMarkers(result)
        }
    }, [data])


    if (loading) return <Text>Loading...</Text>;
    if (error) {
        console.log(error.message);
        return <Text>Error :(</Text>;
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                     initialRegion={{
                         latitude: 10,
                         longitude: 10,
                         latitudeDelta: 10,
                         longitudeDelta: 10,
                     }}>
                {challengeMarkers ? challengeMarkers.map((marker, index) => (
                    <Marker
                        key={index}
                        title={marker.title}
                        description={marker.description}
                        coordinate={marker.latlng}
                    >
                        {marker.child}
                    </Marker>
                )): <></>}
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