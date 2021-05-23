import "react-apollo"
import {Text, View} from "../Themed";
import React from "react";
import {FIND_USER_BY_ID} from "../apollo-graph/Queries";
import {getApolloClientInstance} from "../apollo-graph/Client";
import { ApolloProvider,useQuery} from '@apollo/client';


const UserList = () => {
    const client= getApolloClientInstance()

    const {data,error,loading} = useQuery(FIND_USER_BY_ID);

    if (loading) return <Text>Loading...</Text>;
    if (error) {
        console.log(error.message);
        return <Text>Error :(</Text>;
    }

    return (
        <ApolloProvider client={client}>
        <View>
            <Text>User: {data.findUserById.name || "Unknown"} {data.findUserById.lastname || "Unknown"}</Text>
        </View>
    </ApolloProvider>
    );
}

export default UserList;
