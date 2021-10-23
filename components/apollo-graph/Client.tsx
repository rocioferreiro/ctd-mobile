import * as React from 'react';
import {
  ApolloClient, InMemoryCache,
  HttpLink
} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";
import {getToken} from "../Storage";

export function getApolloClientInstance(): ApolloClient<object> {

  const uri = 'http://192.168.1.101:8080/graphql';

  const httpLink = new HttpLink({
    uri: uri,
    headers: {},
    useGETForQueries: false
  });

  const authLink = setContext(async (request, previousContext) => {

    const token = await getToken();

    return(
      {
        headers: {
          ...previousContext.headers,
          'Authorization': token ? `Bearer ${token}` : "",
        },
      }
    );
  });

  return new ApolloClient<object>({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === 'development',
  });
}
