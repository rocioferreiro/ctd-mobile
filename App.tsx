import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {ApolloProvider} from '@apollo/client';
import {getApolloClientInstance} from './components/apollo-graph/Client';
import {StyleSheet, Dimensions} from 'react-native';
import {configureFonts, DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {useFonts} from 'expo-font';
import Tabbar from "./navigation/BottomTabBar";
import Toast from 'react-native-toast-message';

// I think this can be deleted... but I didn't because I am scared
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
  // if we are using dark or light mode, but as we are using material ui paper instead I think it doesn't matter.
  // I didn't delete it tho...
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    ApfelGrotezk: require('./assets/fonts/ApfelGrotezk-Regular.ttf'),
  });

  const _fontConfig = {
    regular: {
      fontFamily: 'ApfelGrotezk',
      fontWeight: 'normal' as 'normal',
    },
    medium: {
      fontFamily: 'ApfelGrotezk',
      fontWeight: 'normal' as 'normal',
    },
    light: {
      fontFamily: 'ApfelGrotezk',
      fontWeight: 'normal' as 'normal',
    },
    thin: {
      fontFamily: 'ApfelGrotezk',
      fontWeight: 'normal' as 'normal',
    },
  };

  const fontConfig = {
    ios: _fontConfig,
    android: _fontConfig,
    web: _fontConfig
  }

  // React Native Paper Theme.
  // To check all options see:
  // (https://github.com/callstack/react-native-paper/blob/main/src/styles/DefaultTheme.tsx)
  const reactNativePaperTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#15006D',
      accent: '#FFC300',
      background: '#ffffff',
      surface: '#FFF3E9',
      text: '#383c53',
      notification: '#F24726',
      extra: '#8FD14F',
      light: '#8FA1ff'
    },
    fonts: configureFonts(fontConfig),
  };

  if (!isLoadingComplete || !loaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={getApolloClientInstance()}>
          <PaperProvider theme={reactNativePaperTheme}>
            <Tabbar colorScheme={reactNativePaperTheme}/>
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </PaperProvider>
          <StatusBar/>
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
