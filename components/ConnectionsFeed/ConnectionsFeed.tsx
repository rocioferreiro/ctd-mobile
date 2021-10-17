import React, {useEffect, useState} from "react";
import {Dimensions, Modal, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {Avatar, Button, IconButton, useTheme} from "react-native-paper";
import {Text} from "../Themed";
import {useLazyQuery, useMutation} from "@apollo/client";
import {NEW_GET_PENDING_CONNECTIONS} from "../apollo-graph/Queries";
import {getToken, getUserId} from "../Storage";
import {ACCEPT_CONNECTION, REJECT_CONNECTION} from "../apollo-graph/Mutations";
import {Profile} from "../Profile/Profile";

const ConnectionsFeed = () => {
    const {colors} = useTheme();
    const [userId, setUserId] = useState<string>();
    const [userProfile, setUserProfile] = useState<string>();
    const [pendingConnections, setPendingConnections] = useState<any>();
    const [lastConnectionAnswered, setLastConnectionAnswered] = useState<string>();
    const [token,setToken] = React.useState('')
    React.useEffect(() => {
        getToken().then(t => setToken(t))
    }, [])
    const [getPendingConnections, {data: pendingConnectionsData}] = useLazyQuery(NEW_GET_PENDING_CONNECTIONS, {
        fetchPolicy: 'cache-and-network',
        context: {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
    });

    const [acceptConnection] = useMutation(ACCEPT_CONNECTION, {
        onCompleted: () => {
            const filteredConnections = pendingConnections.filter(connection => connection.followUser.id !== lastConnectionAnswered);
            setPendingConnections(filteredConnections);
            setLastConnectionAnswered(null);
        },
        context: {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
    });
    const [rejectConnection] = useMutation(REJECT_CONNECTION, {
        onCompleted: () => {
            const filteredConnections = pendingConnections.filter(connection => connection.followUser.id !== lastConnectionAnswered);
            setPendingConnections(filteredConnections);
            setLastConnectionAnswered(null);
        },
        context: {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
    });

    useEffect(() => {
        getUserId().then(id => {
            setUserId(id);
            getPendingConnections({variables: {userId: id}})
        });
    }, []);

    useEffect(() => {
        if (pendingConnectionsData) {
            setPendingConnections(pendingConnectionsData?.getMyPendingConnection);
        }
    }, [pendingConnectionsData]);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.surface,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            padding: 20,
            paddingBottom: 60
        },
        connectionContainer: {
            backgroundColor: colors.background,
            padding: 20,
            height: 150,
            justifyContent: "center",
            alignItems: "center",
            borderBottomColor: colors.text,
            borderBottomWidth: 1,
        },
        userInfoContainer: {
            backgroundColor: 'transparent',
            flexDirection: 'row'
        },
        primaryText: {
            fontSize: 24,
            fontWeight: "bold",
            color: colors.primary,
            marginRight: 15
        },
        secondaryText: {
            fontSize: 12,
            color: colors.primary,
        },
        button: {
            position: 'absolute',
            zIndex: 2,
            top: 0,
            left: 0,
            padding: 0,
            margin: 0
        }
    })

    const onAction = (connectionUserId, accept: boolean) => {
        setLastConnectionAnswered(connectionUserId);
        const variables = {otherUserID: connectionUserId, myUserID: userId};
        if (accept) acceptConnection({variables}).catch(e => console.log(e));
        else rejectConnection({variables}).catch(e => console.log(e));
    }

    const renderConnection = (connection) => {
        return <View style={{...styles.connectionContainer}} key={connection}>
            <View style={styles.userInfoContainer}>
                <Avatar.Image size={86} source={require('../../assets/images/profile.png')} style={{marginRight: 15}}/>
                <View style={{backgroundColor: 'transparent', marginRight: 25}}>
                    <TouchableWithoutFeedback onPress={() => setUserProfile(connection.followUser.id)}>
                        <View style={{backgroundColor: 'transparent'}}>
                            <Text style={styles.primaryText}>{connection.followUser.name} {connection.followUser.lastname}</Text>
                            <Text style={styles.secondaryText}>{connection.followUser.mail}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{flexDirection: "row", marginTop: 15}}>
                        <Button style={{backgroundColor: colors.accent, borderRadius: 20, marginRight: 15}}
                            onPress={() => onAction(connection.followUser.id, true)} color={colors.background} labelStyle={{fontWeight: 'bold', fontFamily: 'sans'}}
                        >Confirm</Button>
                        <Button style={{borderColor: colors.accent, borderWidth: 2, borderRadius: 20}}
                                onPress={() => onAction(connection.followUser.id, false)} color={colors.accent} labelStyle={{fontWeight: 'bold', fontFamily: 'sans'}}
                        >Delete</Button>
                    </View>
                </View>
            </View>
        </View>
    }

    return (
        <View style={styles.container}>
            <View style={{backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.primaryText}>Connect request</Text>
                <Text style={{...styles.primaryText, color: colors.accent}}>{pendingConnections?.length || ""}</Text>
            </View>
            <ScrollView style={{marginTop: 30}}>
                {pendingConnections?.map(connection => renderConnection(connection))}
            </ScrollView>
            <Modal animationType="fade"
                   presentationStyle={"fullScreen"}
                   visible={!!userProfile}
                   onRequestClose={() => {
                       setUserProfile(undefined);
                   }}>
                <IconButton onPress={() => setUserProfile(undefined)}
                            style={[styles.button, Platform.OS === 'ios' ? {marginTop: Dimensions.get("window").height*0.05}: {}]}
                            icon={'chevron-left'}
                            size={40}
                />
                <Profile otherUserId={userProfile}/>
            </Modal>
        </View>
    )
}

export default ConnectionsFeed;
