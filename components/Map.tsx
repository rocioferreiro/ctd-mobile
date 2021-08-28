import MapView, {Marker} from "react-native-maps";
import {Text, View} from "./Themed";
import React, {useEffect, useState} from "react";
import {Dimensions, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";
import {useQuery} from "@apollo/client";
import {FIND_NEARBY_USERS, FIND_NEARBY_CHALLENGES} from "./apollo-graph/Queries";
import {ActivityIndicator, useTheme} from "react-native-paper";
import CreateChallengeModal from "./CreateChallengeModal/CreateChallengeModal";
import LottieView from "lottie-react-native";
import * as Location from "expo-location";

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

    const {colors} = useTheme()

    const {data: userData,error: userError,loading: userLoading} = useQuery(FIND_NEARBY_USERS);
    const {data: challengeData,error: challengeError,loading: challengeLoading} = useQuery(FIND_NEARBY_CHALLENGES);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [modal, setModal] = React.useState(false)
    const showModal = () => setModal(true);
    const hideModal = () => setModal(false);

    const [userMarkers, setUserMarkers] = useState<MarkerInfo[]>([])
    const [challengeMarkers, setChallengeMarkers] = useState<MarkerInfo[]>([])

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
            color: colors.primary
        }
    });

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
            console.log(cResult)
            setChallengeMarkers(cResult)
        }
    }, [userData, challengeData])


    if (userLoading || challengeLoading || !location) return <View style={{display: 'flex', marginTop:Dimensions.get('window').height*0.4, justifyContent:'center'}}><ActivityIndicator size="large" /></View>;
    if (userError) {
        console.log(userError.message);
        return <LottieView
          style={{ width: '95%',
              height: 400,marginTop:Dimensions.get('window').height*0.07}}
          source={require('../assets/lottie/network-lost.json')}
          autoPlay
          loop
          speed={0.4}
          resizeMode={'cover'}
        />
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
                        onPress={showModal}
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
                        onPress={showModal}
                    >
                        {marker.child}
                    </Marker>
                )): <></>}


                <CreateChallengeModal visible={modal} onDismiss={hideModal}/>
            </MapView>
        </View>
    )
}



export default Map;
