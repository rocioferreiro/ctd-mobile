import React, { useEffect} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

const TabOneScreen = () => {

    const {loading, data} = {loading: false, data: []}

 // how to use queries
 // const {loading, data} = useQuery(A_QUERY);

  useEffect(()=>{
    console.log(data)
  }, [])

  if (loading && !data) {
    //loading view
    return (
        <View style={styles.loadingIndicatorContainer}>
          <ActivityIndicator size='large' color='#fff' />
        </View>
    )
  }
  return (
      <View style={styles.container}>
          <Text style={styles.title}>Tab One</Text>
          <View style={styles.container}>
              {/* ---------- EXAMPLE OF LIST ---------- */}
              {/* <FlatList*/}
              {/*    contentContainerStyle={styles.container}*/}
              {/*    data={data.coinsList.Data}*/}
              {/*    keyExtractor={item => item.CoinInfo.Id.toString()}*/}
              {/*    renderItem={({ item }) => {*/}
              {/*        return (*/}
              {/*            <ListItem*/}
              {/*                coin={item}*/}
              {/*                onPress={() => {}}*/}
              {/*            />*/}
              {/*        )*/}
              {/*    }}*/}
              {/*/>*/}
          </View>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      </View>
  );
}

export default TabOneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
    loadingIndicatorContainer: {
        flex: 1,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default TabOneScreen;
