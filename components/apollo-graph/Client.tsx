import * as React from 'react';
import { Platform } from 'react-native';
import {
  ApolloClient, InMemoryCache,
  HttpLink
} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";
import {getRefreshToken, getToken, getTokenType, saveRefreshToken, saveToken} from "../Storage";
import jwtDecode from "jwt-decode";
import {androidClientId, iOSClientId} from "../../ClientId";

export function getApolloClientInstance(): ApolloClient<object> {

  const uri = 'http://192.168.1.101:8080/graphql';
  const refreshTokenMutation =
    `
      mutation updateToken($refreshToken: String!) {
        updateToken(refreshToken: $refreshToken) {
          refreshToken
          token
        }
      }
      `;

  const httpLink = new HttpLink({
    uri: uri,
    headers: {},
    useGETForQueries: false
  });

  const authLink = setContext(async (request, previousContext) => {

    let token = await getToken();

    const decoded: any = jwtDecode(token);
    // Check if token is expired
    if (!(Date.now() >= decoded?.exp * 1000)) {// TODO sacar el !
      const type = await getTokenType(); // To check if the token is ctd or google
      const refreshToken = await getRefreshToken();
      console.log(decoded)
      if (type === 'ctd') {
        // Make the refresh token mutation to backend
        // const res = await fetch(uri, {
        //   method: 'POST',
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     query: refreshTokenMutation,
        //     variables: {
        //       refreshToken: refreshToken
        //     }
        //   })
        // });
        // const r = await res.json();
        // await saveToken(r.data.updateToken.token);
        // await saveRefreshToken(r.data.updateToken.refreshToken);
        // token = r.data.updateToken.token;

        // GOOGLE
        let clientId;
        if (Platform.OS === 'ios') clientId = iOSClientId;
        else if (Platform.OS === 'android') clientId = androidClientId;
        const res = await fetch('https://securetoken.googleapis.com/v1/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: JSON.stringify({
            "client_id": clientId,
            "client_secret": '',
            "refresh_token": refreshToken,
            "grant_type": "refresh_token"
          })
        });
        const r = await res.json();// TODO check case refresh token is revoked
        console.log(r);
        // await saveToken(r["id_token"]);
        // END GOOGLE
      }
      if (type === 'google') {
        // Make the refresh request to google

      }
    }

    return (
      {
        headers: {
          ...previousContext.headers,
          'Authorization': token ? `Bearer ${token}` : '',
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
