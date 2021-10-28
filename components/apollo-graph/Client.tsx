import * as React from 'react';
import {
  ApolloClient, InMemoryCache,
  HttpLink
} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";
import {getRefreshToken, getToken, getTokenType, saveRefreshToken, saveToken} from "../Storage";
import jwtDecode, {JwtPayload} from "jwt-decode";
import firebase from "firebase";
import {useContext} from "react";
import {AuthContext} from "../../App";

export function getApolloClientInstance(): ApolloClient<object> {
  const auth = useContext(AuthContext);

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

    let decoded;
    try {
      decoded = jwtDecode<JwtPayload>(token);
    } catch (e) {
      console.log('could not decode token');
    }
    // Check if token is expired
    if (decoded && Date.now() >= decoded?.exp * 1000) {
      const type = await getTokenType(); // To check if the token is ctd or google
      if (type === 'ctd') {
        // Make the refresh token mutation to backend
        const refreshToken = await getRefreshToken();
        const res = await fetch(uri, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: refreshTokenMutation,
            variables: {
              refreshToken: refreshToken
            }
          })
        });
        const r = await res.json();
        await saveToken(r.data.updateToken.token);
        await saveRefreshToken(r.data.updateToken.refreshToken);
        token = r.data.updateToken.token;
      } else if (type === 'google') {
        // Get token from firebase. Firebase automatically refreshes the token if it is expired so it always returns a fresh one
        const idToken = await firebase.auth().currentUser.getIdToken(true).catch((e) => {
          // User has revoked access to they need to be logged out
          auth.signOut();
          console.log(e);
        });
        saveToken(idToken).catch(console.error);
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
