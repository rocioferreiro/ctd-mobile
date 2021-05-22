import "react-apollo"
import {Text, View} from "../Themed";
import React from "react";
import {FIND_CHALLENGE_BY_ID} from "../apollo-graph/Queries";
import {getApolloClientInstance} from "../apollo-graph/Client";
import { ApolloClient, ApolloProvider, InMemoryCache ,useQuery} from '@apollo/client';


export function ChallengeList() {
    const uri='http://localhost:8080/graphql'
    const query=FIND_CHALLENGE_BY_ID
    const cache = new InMemoryCache();
// Create a instance of Apollo Client
  /*  const client = new ApolloClient({
        uri,
        cache,
        headers: {},
        connectToDevTools: process.env.NODE_ENV === 'development',
    });*/
    const client= getApolloClientInstance()

    const {data,error,loading} = useQuery(FIND_CHALLENGE_BY_ID);

    if (loading) return <Text>Loading...</Text>;
    if (error) {
        console.log(error.message);
        return <Text>Error :(</Text>;
    }


    console.log(data.findChallengeById);

    return (
        <ApolloProvider client={client}>
        <View>
            <Text>
                {data.findChallengeById.title}:{data.findChallengeById.user}
            </Text>
        </View>
    </ApolloProvider>
    );




}