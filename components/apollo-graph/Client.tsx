import * as React from 'react';
import {
  ApolloClient, InMemoryCache,
  HttpLink, useMutation
} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";
import {getRefreshToken, getToken, saveRefreshToken, saveToken} from "../Storage";
import { onError } from "@apollo/client/link/error";
import jwtDecode from "jwt-decode";
import {REFRESH_TOKEN} from "./Mutations";

export function getApolloClientInstance(): ApolloClient<object> {
  /*
    si no hay token no lo agrega
    si hay token chequea si esta expirado
      no --> agrege header y listo
      si --> chequea si es de google
        si --> le pega a google con el refresh token y obtiene el nuevo
        no --> le pega al back y obtiene el nuevo
     */

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
          // 'Authorization': token ? `Bearer ${token}` : "",
        },
      }
    );
  });

  const onUnauthorized = onError(({ networkError }) => {
    // const [refreshToken] = useMutation(REFRESH_TOKEN, {
    //   onCompleted: data => {
    //     saveToken(data.updateToken.token).catch(e => console.log(e));
    //     saveRefreshToken(data.updateToken.refreshToken).catch(e => console.log(e));
    //     console.log('success!')
    //   },
    //   onError: error => console.log(error)
    // });
    if (networkError && networkError.message === 'Response not successful: Received status code 401') {
      getRefreshToken().then(rt => {
        // if (rt) refreshToken({variables: {refreshToken: rt}}).catch(e => console.log(e))
        if (rt) console.log('success')
      });
    }
  })

  return new ApolloClient<object>({
    link: onUnauthorized.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === 'development',
  });
}
