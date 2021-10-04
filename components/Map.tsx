import MapView, {Marker} from "react-native-maps";
import {Text, View} from "./Themed";
import React, {useEffect, useState} from "react";
import {Dimensions, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";
import {useLazyQuery} from "@apollo/client";
import {FIND_NEARBY_CHALLENGES, FIND_NEARBY_USERS} from "./apollo-graph/Queries";
import {ActivityIndicator, Modal, useTheme} from "react-native-paper";
import LottieView from "lottie-react-native";
import * as Location from "expo-location";
import ChallengePage from "./Challenge/ChallengePage";
import {getToken} from "./Storage";

type MarkerInfo = {
    title: string,
    description: string,
    latlng: Coordinates,
    child: any,
    identifier: string
}

type Coordinates = {
    latitude: number,
    longitude: number
}

const Map = () => {

    const {colors} = useTheme()

    const [location, setLocation] = useState(null);
    const getLocationLazily = () => {
        if (location && location.latitude && location.longitude) return {latitude: location.latitude, longitude: location.longitude}
        else return {latitude: 0.0, longitude: 0.0}
    };

    const [token,setToken] = React.useState('')
    React.useEffect(() => {
        (async () => {
            let enabled = await Location.hasServicesEnabledAsync();
            console.log(enabled)
            if (!enabled) {
                let {status} = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }
            }
            let location = await Location.getLastKnownPositionAsync({});
            setLocation(location.coords);
        })();
        getToken().then(t => setToken(t))
    }, [])

    const [findNearbyChallenges, {data: challengeData,error: challengeError,loading: challengeLoading}] = useLazyQuery(FIND_NEARBY_CHALLENGES, {
        variables: getLocationLazily(),
        context: {
            headers: {'Authorization' : 'Bearer ' + token}
        }
    });
    const [findNearbyUsers, {data: userData,error: userError,loading: userLoading}] = useLazyQuery(FIND_NEARBY_USERS, {
        variables: getLocationLazily(),
        context: {
            headers: {'Authorization' : 'Bearer ' + token}
        }
    });
    const [errorMsg, setErrorMsg] = useState(null);
    const [modal, setModal] = React.useState(false);
    const [modalID, setModalID] = React.useState(undefined);
    const showModal = (id) => {
        setModal(true);
        setModalID(id)
    }
    const hideModal = () => {
        setModal(false);
        setModalID(undefined)
    }

    const [userMarkers, setUserMarkers] = useState<MarkerInfo[]>([])
    const [challengeMarkers, setChallengeMarkers] = useState<MarkerInfo[]>([])

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            height: Dimensions.get('window').height,
            backgroundColor: colors.surface
        },
        containerStyle: {flex: 1},
        map: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        },
        icon: {
            color: colors.primary
        }
    });

    useEffect(() => {
        if (location) {
            findNearbyChallenges();
            findNearbyUsers();
        }
    }, [location]);
    useEffect(() => {
        if(userData && challengeData){
            const result = userData.findNearbyUsers.map((u) => {
                return {
                    title: u.name,
                    description: u.lastname,
                    identifier: u.id,
                    latlng: {latitude: u.address.coordinates.latitude, longitude: u.address.coordinates.longitude},
                    child: <Icon
                                reverse
                                name='person'
                                type='ionicon'
                                color={colors.accent}
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
                    identifier: c.id,
                    latlng: {latitude: c.coordinates.latitude, longitude: c.coordinates.longitude},
                    child: <Icon
                        reverse
                        name='flag'
                        type='ionicon'
                        color={colors.accent}
                        size={15}
                        iconStyle={styles.icon}
                    />
                }
            })
            setChallengeMarkers(cResult)
        }
    }, [userData, challengeData]);

    if (userLoading || challengeLoading || !location) return <View style={{display: 'flex', backgroundColor: colors.surface, justifyContent:'center', width: '100%', height: '100%'}}><ActivityIndicator size="large" /></View>;
    if (userError) {
        console.log(userError.message);
        return <View style={{width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height,
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "row" }}>
            <LottieView
              style={{ width: '93%',
                  height: 400,marginTop:Dimensions.get('window').height*0.07}}
              source={require('../assets/lottie/network-lost.json')}
              autoPlay
              loop
              speed={0.4}
              resizeMode={'cover'}
            />
        </View>
    }
    if (challengeError) {
        console.log(challengeError.message);
        return <Text>Error :(</Text>;
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                     initialRegion={{
                         latitude: location.latitude,
                         longitude: location.longitude,
                         latitudeDelta: 0.1,
                         longitudeDelta: 0.1,
                     }}>

                {userMarkers ? userMarkers.map((marker, index) => (
                    <Marker
                        key={index}
                        title={marker.title}
                        description={marker.description}
                        coordinate={marker.latlng}
                        onPress={() => showModal(marker.identifier)}
                    >
                        {marker.child}
                    </Marker>
                )): <></>}

                {challengeMarkers ? challengeMarkers.map((marker, index) => (
                    <Marker
                        key={index}
                        title={marker.title}
                        description={marker.description}
                        coordinate={marker.latlng}
                        onPress={() => showModal(marker.identifier)}
                    >
                        {marker.child}
                    </Marker>
                )): <></>}


            </MapView>
            <Modal visible={modal} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
                { challengeData && <ChallengePage challenge={challengeData.findNearbyChallenges.find(c => c.id === modalID)} setSelectedChallenge={(challenge) => hideModal()}/>}
            </Modal>
        </View>
    )
}



export default Map;
