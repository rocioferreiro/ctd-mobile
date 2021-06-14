import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as RNLocalize from 'react-native-localize'
import i18n from 'i18n-js'
import memoize from 'lodash.memoize'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

import {  Dimensions } from 'react-native';



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
const translationGetters = {
    en: () => {return {"example": "this is an example"}},
    es: () => {return {"example": "esto es un ejemplo"}},
}

const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
)

const setI18nConfig = () => {
    const fallback = { languageTag: 'en' }
    const { languageTag } = RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback
    translate.cache.clear()
    i18n.translations = { [languageTag]: translationGetters[languageTag]() }
    i18n.locale = languageTag
}

class App extends React.Component {
    constructor(props) {
        super(props)
        setI18nConfig()

    }
/*    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();*/


    // ...

    componentDidMount() {
        RNLocalize.addEventListener('change', this.handleLocalizationChange)
    }
    componentWillUnmount() {
        RNLocalize.removeEventListener('change', this.handleLocalizationChange)
    }
    handleLocalizationChange = () => {
        setI18nConfig()


    }

    render() {
        return (

            <view>
                <view>
                </view>
                <text>
                    {translate('example')}
                </text>
            </view>

        );
    }
}





/*
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={getApolloClientInstance()}>
            <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }*/


export default App

