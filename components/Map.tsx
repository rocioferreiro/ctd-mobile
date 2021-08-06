import MapView, {Marker} from "react-native-maps";
import {Text, View} from "./Themed";
import React, {useEffect, useState} from "react";
import {Dimensions, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";
import {useQuery} from "@apollo/client";
import {FIND_NEARBY_USERS, FIND_NEARBY_CHALLENGES} from "./apollo-graph/Queries";

type MarkerInfo = {
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

    const {data: userData,error: userError,loading: userLoading} = useQuery(FIND_NEARBY_USERS);
    const {data: challengeData,error: challengeError,loading: challengeLoading} = useQuery(FIND_NEARBY_CHALLENGES);

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

    const [userMarkers, setUserMarkers] = useState<MarkerInfo[]>([])
    const [challengeMarkers, setChallengeMarkers] = useState<MarkerInfo[]>()

    useEffect(() => {
        if(userData && challengeData){
            const result = userData.findNearbyUsers.map((u) => {
                return {
                    title: u.name,
                    description: u.lastname,
                    latlng: {latitude: u.address.coordinates.latitude, longitude: u.address.coordinates.longitude},
                    child: <Icon
                                reverse
                                name='person'
                                type='ionicon'
                                color='#FFE933'
                                size={15}
                                iconStyle={styles.icon}
                            />
                }
            })
            setUserMarkers(result)

            const cResult = challengeData.findNearbyChallenges.map((c) => {
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
            setChallengeMarkers(cResult)
        }
    }, [userData, challengeData])


    if (userLoading || challengeLoading) return <Text>Loading...</Text>;
    if (userError) {
        console.log(userError.message);
        return <Text>Error :(</Text>;
    }
    if (challengeError) {
        console.log(challengeError.message);
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

                {userMarkers ? userMarkers.map((marker, index) => (
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
