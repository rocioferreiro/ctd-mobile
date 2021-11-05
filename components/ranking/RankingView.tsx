import React, {useContext, useEffect} from "react";
import {Text, View} from "../Themed";
import {onuPictures} from "../CreateChallengeForm/Details/onuObjectiveInfo";
import { Dimensions, ImageBackground, Platform, ScrollView, StyleSheet} from "react-native";
import {IconButton, useTheme, ActivityIndicator} from "react-native-paper";
import {LinearGradient} from "expo-linear-gradient";
import RankingList from "./RankingList";
import {useTranslation} from "react-i18next";
import {useLazyQuery} from "@apollo/client";
import {FIND_POSTS_OF_USER, GET_TOP_CHALLENGES_BY_ODS} from "../apollo-graph/Queries";
import {AuthContext} from "../../App";
import {getToken, getUserId} from "../Storage";

const RankingView = ({navigation,route}) => {
  const onuInfo = onuPictures();
  const [onuODS, setOnuODS] = React.useState(0);
  const [token, setToken] = React.useState('')
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [getTopChallenges, {data, loading}] = useLazyQuery(GET_TOP_CHALLENGES_BY_ODS, {
    fetchPolicy: 'cache-and-network',
    context: {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    },
    onCompleted: data1 => console.log(data1),
    onError: error => console.log(error)
  });

  useEffect(() => {
    setOnuODS(route.params?.ods)
    getToken().then(t => setToken(t));
  }, [])

  useEffect(() => {
    if(token != '') {
      getTopChallenges({variables: {ods: onuODS}})
    }

  }, [token])

  const styles = StyleSheet.create({
    box: {
      width: '100%',
      height: '100%',
      overflow: "visible"
    },
  })

  if(loading) return <ActivityIndicator size={'large'}/>

  return data ? <View style={{backgroundColor: colors.surface, height: '100%'}}>
    <ImageBackground source={onuInfo[onuODS].image} imageStyle={{height: '60%'}} style={{width: '100%', height: '100%', marginTop: -95, overflow: "visible",backgroundColor: colors.surface}}>
      <LinearGradient
        colors={["rgba(255,255,255,0.5)", colors.surface]}
        start={{x: 1, y: 0}}
        end={{ x: 1, y: 0.6}}
        style={styles.box}
      >
          <ScrollView style={{padding: 10, backgroundColor: "rgba(0,0,0,0)"}}>
            <IconButton style={Platform.OS === 'ios' ? {marginTop: Dimensions.get("window").height*0.13}: {}} onPress={() => {
              navigation.goBack()
            }}
                icon={'chevron-left'}
            />
            <Text style={{marginLeft: 30, fontSize: 40, color: colors.primary, fontWeight: "bold"}}>{onuInfo[onuODS].title}</Text>
            <Text style={{marginLeft: 30, fontSize: 20, color: colors.primary}}>{t('ranking.top')}</Text>
            <RankingList ods={onuODS} list={data.getTopChallengesByOds.challenges} navigation={navigation}/>
        </ScrollView>
      </LinearGradient>
      <View style={{marginTop: Dimensions.get('window').height*0.1, backgroundColor: 'transparent'}}>

      </View>
    </ImageBackground>
  </View> : <View/>
}

export default RankingView;
