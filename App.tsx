import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { ApolloProvider } from '@apollo/client';
import { getApolloClientInstance }  from './components/apollo-graph/Client';
import { StyleSheet, Dimensions } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// I think this can be deleted... I didn't because I am scared
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    icon: {
        color: '#4625FF'
    }
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  // I think this colorScheme thing can be deleted too, it is used to tell the navigation component
  // if we are using dark or light mode, but as we are using material ui paper instead I think it doesnt't matter.
  // I didn't delete it tho...
  const colorScheme = useColorScheme();

  // Material UI Paper Theme. To check all options see (https://github.com/callstack/react-native-paper/blob/main/src/styles/DefaultTheme.tsx)
  const materialUITheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#23255e',
      accent: '#ece81a',
      background: '#4c4c4c',
      surface: '#fafafa',
      text: '#08789a',
    },
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={getApolloClientInstance()}>
          <PaperProvider theme={materialUITheme}>
            <Navigation colorScheme={colorScheme} />
          </PaperProvider>
          <StatusBar />
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
