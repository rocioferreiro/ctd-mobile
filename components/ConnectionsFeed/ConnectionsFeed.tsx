import React from "react";
import {Dimensions, ScrollView, StyleSheet, View} from "react-native";
import {Avatar, Button, useTheme} from "react-native-paper";
import {Text} from "../Themed";
import {useLazyQuery} from "@apollo/client";
import {GET_PENDING_CONNECTIONS} from "../apollo-graph/Queries";


const ConnectionsFeed = () => {
    const {colors} = useTheme();

    const [getPendingConnections, {data: pendingConnectionsData}] = useLazyQuery(GET_PENDING_CONNECTIONS);

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
    })

    const renderConnection = () => {
        return [0,1,2,3,4,5,6].map(connection => <View style={{...styles.connectionContainer}} key={connection}>
            <View style={styles.userInfoContainer}>
                <Avatar.Image size={86} source={require('../../assets/images/profile.png')} style={{marginRight: 15}}/>
                <View style={{backgroundColor: 'transparent', marginRight: 25}}>
                    <Text style={styles.primaryText}>Carlos Hernandez</Text>
                    <Text style={styles.secondaryText}>@carloshernandez</Text>
                    <View style={{flexDirection: "row", marginTop: 15}}>
                        <Button style={{backgroundColor: colors.accent, borderRadius: 20, marginRight: 15}}
                            onPress={() => {}} color={colors.background} labelStyle={{fontWeight: 'bold', fontFamily: 'sans'}}
                        >Confirm</Button>
                        <Button style={{borderColor: colors.accent, borderWidth: 2, borderRadius: 20}}
                                onPress={() => {}} color={colors.accent} labelStyle={{fontWeight: 'bold', fontFamily: 'sans'}}
                        >Delete</Button>
                    </View>
                </View>
            </View>
        </View>)
    }

    return (
        <View style={styles.container}>
            <View style={{backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.primaryText}>Connect request</Text>
                <Text style={{...styles.primaryText, color: colors.accent}}>6</Text>
            </View>
            <ScrollView style={{marginTop: 30}}>
                {renderConnection()}
            </ScrollView>
        </View>
    )
}

export default ConnectionsFeed;
