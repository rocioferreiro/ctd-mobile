import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { ApolloProvider } from '@apollo/client';
import { getApolloClientInstance }  from './components/apollo-graph/Client';
import WebView from "react-native-webview";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={getApolloClientInstance()}>
          <WebView source={{ uri: 'https://rocioferreiro.github.io/' }} style={{ marginTop: 20 }} />
          {/*<Navigation colorScheme={colorScheme} />*/}
          <StatusBar />
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
