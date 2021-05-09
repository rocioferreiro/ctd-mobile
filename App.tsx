import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { ApolloProvider } from '@apollo/client';
import { getApolloClientInstance }  from './components/apollo-graph/Client';
import LotsOfGreetings from "./components/capacitacionComponent/LostOfGreetings";
import {CapacitacionReactNative} from "./components/capacitacionComponent/CapacitacionReactNative";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={getApolloClientInstance()}>
          {/*<Navigation colorScheme={colorScheme} />*/}
          <StatusBar />
          <LotsOfGreetings />
          <CapacitacionReactNative />
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
