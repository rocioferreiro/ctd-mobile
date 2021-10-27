import * as React from 'react';
import {
  ApolloClient, InMemoryCache,
  HttpLink
} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";
import {getToken} from "../Storage";

export function getApolloClientInstance(): ApolloClient<object> {

  const uri = 'http://172.22.36.33:8080/graphql';

  const httpLink = new HttpLink({
      uri: uri,
      headers: {},
      useGETForQueries: false
    });

  // const headerLink = setContext(async (request, previousContext) => {
  //   getToken().then(token => {
  //     return {
  //       headers: {
  //         ...previousContext.headers,
  //         'Authorization': 'Bearer ' + token,
  //       },
  //     }
  //   });
  // });

  return new ApolloClient<object>({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === 'development',
  });
}
