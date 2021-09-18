import React, {useEffect, useState} from "react";
import {View} from "./Themed";
import {ActivityIndicator, Card, Divider, useTheme} from 'react-native-paper';
import ChallengeCard from "./ChallengeCard/ChallengeCard";
import {useLazyQuery} from "@apollo/client";
import SearchBarComponent from "./SearchBar/SearchBarComponent";
import {Dimensions, ScrollView, Text, StyleSheet, useWindowDimensions} from "react-native";
import ChallengePage from "./Challenge/ChallengePage";
import {FIND_CHALLENGES_OF_USER} from "./apollo-graph/Queries";
import LottieView from "lottie-react-native";
import {getUserId} from "./Storage";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import CategoryList from "./CategoryList/CategoryList";
import {
  Button,
  Title,
  Paragraph,
} from 'react-native-paper';
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from 'react-native-paper-tabs';

const SearchScreen = () => {
    const [selectedChallenge, setSelectedChallenge] = useState();
    const [userId, setUserId] = useState('');
    const [index, setIndex] = useState(0);
    const {colors} = useTheme();
    const layout = useWindowDimensions();
    const [findChallengesOfUser, {data, error, loading}] = useLazyQuery(FIND_CHALLENGES_OF_USER, {variables: {userId: userId}});
    const [challengeList, setChallengeList] = useState<any>([]);

    useEffect(() => {
        getUserId().then(id => {
            setUserId(id);
            findChallengesOfUser();
        });
    }, []);

    useEffect(() => {
        if (data) {
            setChallengeList(data.getCreatedChallengesByUser)
        }
    }, [data]);

    const [routes] = React.useState([
        { key: 'first', title: 'For you' },
        { key: 'second', title: 'Search' },
        { key: 'third', title: 'Collections' },
    ]);

    const FirstRoute = () => (
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)' }} />
    );
    const SecondRoute = () => (
      <View style={{backgroundColor: 'rgba(0,0,0,0)' }}>
          <SearchBarComponent onChange={onChange}/>
          <Divider/>
          <ScrollView style={{
              marginBottom: Dimensions.get('screen').height * 0.20,
              backgroundColor: 'rgba(0,0,0,0)',
              overflow: "visible"
          }}>
              {challengeList.map((challenge, i) =>
                <View key={i} style={{marginBottom: 5}}>
                    <ChallengeCard setSelectedChallenge={setSelectedChallenge} challenge={challenge}/>
                    <Divider/>
                </View>
              )
              }
          </ScrollView>
      </View>
    );
    const ThirdRoute = () => (
      <View style={{ display:'flex',
          justifyContent:'center',
          alignItems:'center',
          alignContent:'center',

          width:'100%',
          backgroundColor:'rgba(0,0,0,0)',
          marginBottom:50
      }} >
          <CategoryList/>
      </View>
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
    });

    if (loading) return <View style={{
        display: 'flex',
        backgroundColor: colors.surface,
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    }}><ActivityIndicator size="large"/></View>;
    if (error) {
        console.log(error.message);
        return <LottieView
            style={{
                width: '95%',
                height: 400, marginTop: Dimensions.get('window').height * 0.07
            }}
            source={require('../assets/lottie/network-lost.json')}
            autoPlay
            loop
            speed={0.4}
            resizeMode={'cover'}
        />
    }

    const onChange = (searchValue: string) => {
        if (!searchValue || searchValue === "") setChallengeList(data.getCreatedChallengesByUser);
        else {
            const filteredChallenges = data.getCreatedChallengesByUser.filter(challenge =>
                challenge.title.toLowerCase().includes(searchValue.toLowerCase().trim())
            );
            console.log(filteredChallenges)
            setChallengeList(filteredChallenges);
        }
    }

    return (
        <View>
            {selectedChallenge ?
                <ChallengePage setSelectedChallenge={setSelectedChallenge} challenge={selectedChallenge}/> :
                <Card style={{
                    width: Dimensions.get('window').width,
                    height: '100%',
                    backgroundColor: colors.surface
                }}>

                    <Text style={{marginTop:Dimensions.get('window').height*0.06, fontSize:40, fontWeight:'bold', marginBottom:5, color:colors.primary}}> Challenges </Text>

                    {/*<TabView*/}
                    {/*  navigationState={{ index, routes }}*/}
                    {/*  renderScene={renderScene}*/}
                    {/*  onIndexChange={setIndex}*/}
                    {/*  initialLayout={{ width: layout.width }}*/}
                    {/*  renderTabBar={props => <TabBar layout={layout}*/}
                    {/*                                 style={{backgroundColor:colors.surface}}*/}
                    {/*                                 labelStyle={{color: colors.accent}}*/}
                    {/*                                 activeColor={colors.primary}*/}
                    {/*                                 tabStyle={{*/}
                    {/*                                     backgroundColor:'rgba(0,0,0,0)',*/}
                    {/*                                     borderBottomWidth:2,*/}
                    {/*                                     borderBottomColor:colors.accent,*/}
                    {/*                                 }}*/}
                    {/*                                 {...props} />}*/}
                    {/*/>*/}

                  <Tabs
                    style={{ backgroundColor:colors.surface, borderBottomColor: colors.accent, borderBottomWidth: 1 }} // works the same as AppBar in react-native-paper
                    theme={useTheme()}
                  >
                    <TabScreen label="For You" icon="compass">
                      <View style={{ flex: 1, backgroundColor: colors.surface }} />
                    </TabScreen>
                    <TabScreen label="Search" icon="magnify">
                      <View style={{backgroundColor: 'rgba(0,0,0,0)' }}>
                        <SearchBarComponent onChange={onChange}/>
                        <Divider/>
                        <ScrollView style={{
                          marginBottom: Dimensions.get('screen').height * 0.20,
                          backgroundColor: 'rgba(0,0,0,0)',
                          overflow: "visible"
                        }}>
                          {challengeList.map((challenge, i) =>
                            <View key={i} style={{marginBottom: 5}}>
                              <ChallengeCard setSelectedChallenge={setSelectedChallenge} challenge={challenge}/>
                              <Divider/>
                            </View>
                          )
                          }
                        </ScrollView>
                      </View>
                    </TabScreen>
                    <TabScreen label="Collections" icon="checkbox-multiple-blank-outline">
                      <View style={{ display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        alignContent:'center',

                        width:'100%',
                        backgroundColor:colors.surface,
                        marginBottom:50
                      }} >
                        <CategoryList/>
                      </View>
                    </TabScreen>
                  </Tabs>

                </Card>
            }
        </View>

    )
}

export default SearchScreen;
