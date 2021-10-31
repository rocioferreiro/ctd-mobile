import React, {useEffect} from "react";
import {Text, View} from "../Themed";
import {onuPictures} from "../CreateChallengeForm/Details/onuObjectiveInfo";
import {Dimensions, ImageBackground, Platform, ScrollView, StyleSheet} from "react-native";
import {IconButton, useTheme} from "react-native-paper";
import {LinearGradient} from "expo-linear-gradient";
import RankingList from "./RankingList";
import {useTranslation} from "react-i18next";

const RankingView = ({navigation,route}) => {
  const onuInfo = onuPictures();
  const [onuODS, setOnuODS] = React.useState(0);
  const {colors} = useTheme();
  const {t} = useTranslation();

  useEffect(() => {
    setOnuODS(route.params?.ods)
  }, [])

  const styles = StyleSheet.create({
    box: {
      width: '100%',
      height: '100%',
      overflow: "visible"
    },
  })

  return <View style={{backgroundColor: colors.surface, height: '100%'}}>
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
            <RankingList ods={onuODS}/>
        </ScrollView>
      </LinearGradient>
      <View style={{marginTop: Dimensions.get('window').height*0.1, backgroundColor: 'transparent'}}>

      </View>
    </ImageBackground>
  </View>
}

export default RankingView;
