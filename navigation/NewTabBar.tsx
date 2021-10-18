import React, {useEffect, useState} from "react";
import Tabbar from "@mindinventory/react-native-tab-bar-interaction";
import {Icon} from "react-native-elements";
import SearchScreen from "../components/SearchScreen";
import Map from "../components/Map";
import {Profile} from "../components/Profile/Profile";
import {useTheme} from "react-native-paper";
import {Dimensions, Platform, View} from "react-native";
import CreatePost from "../components/CreatePost/CreatePost";
import Toast from "react-native-toast-message";
import {colorShade} from "../components/Models/shadingColor";
import CTDHome from "../components/HomePage/CTDHome";
import PostCreationSuccessful from "../components/CreatePost/PostCreationSuccessful";
import {useTranslation} from "react-i18next";
import {useLazyQuery} from "@apollo/client";
import {PENDING_CONNECTION_REQUESTS_NUMBER} from "../components/apollo-graph/Queries";
import {getUserId} from "../components/Storage";
import PersonIcon from "./PersonIcon";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChallengePage from "../components/Challenge/ChallengePage";
import ViewPost from "../components/viewPost/ViewPost";
import EditProfile from "../components/Profile/EditProfile";

const MyTabbar = ({navigation, route}) => {
  const {colors} = useTheme();
  const [userId, setUserId] = useState('');
  const [createPost, setCreatePost] = React.useState<Boolean>(true)
  const {t, i18n} = useTranslation();
  const [getConnectionRequestsNumber, {data}] = useLazyQuery(PENDING_CONNECTION_REQUESTS_NUMBER, {variables: {userId: userId}, fetchPolicy: 'cache-and-network'});

  function toastOn() {
    Toast.show({
      type: 'error',
      text1: 'Challenge Creation Error',
      text2: 'Try again later',
      topOffset: Dimensions.get("window").height * 0.05,
    });
  }

  const tabs = [
    {
      name:t('new-tabbar.home'),
      url: 'home',
      activeIcon: <Icon name="home" color='#fff' size={25} />,
      inactiveIcon: <Icon name="home" color="#4d4d4d" size={25} />
    },
    {
      name: t('new-tabbar.search'),
      url: 'search',
      activeIcon: <Icon name={'search-outline'}
                        type={'ionicon'} color='#fff' size={25} />,
      inactiveIcon: <Icon name={'search-outline'}
                          type={'ionicon'} color="#4d4d4d" size={25} />
    },
    {
      name: t('new-tabbar.new-post'),
      url: 'createPost',
      activeIcon: <Icon name="camera" color="#fff" size={25} />,
      inactiveIcon: <Icon name="camera" color="#4d4d4d" size={25} />
    },
    {
      name: t('new-tabbar.map'),
      url: 'map',
      activeIcon: <Icon name="map" color="#fff" size={25} />,
      inactiveIcon: <Icon name="map" color="#4d4d4d" size={25} />
    },
    {
      name: t('new-tabbar.profile'),
      url: 'profile',
      activeIcon: <PersonIcon badgeColor={colors.accent} badgeNumber={data?.getMyPendingConnectionsNumber} backgroundColor={'#fff'}/>,
      inactiveIcon: <PersonIcon badgeColor={colors.accent} badgeNumber={data?.getMyPendingConnectionsNumber} backgroundColor={'#4d4d4d'}/>
    },
  ];

  useEffect(() => {
    getUserId().then(id => {
      setUserId(id);
      getConnectionRequestsNumber();
    });
  }, []);

  useEffect(() => {
    if(!createPost) {
      navigation.navigate('creationSuccessful');
      setCreatePost(true)
    }
  }, [createPost]);

  const Stack = createNativeStackNavigator();

  return (
    <View style={{backgroundColor: colors.surface, height: (Platform.OS === 'ios') ? Dimensions.get('screen').height + 25 : Dimensions.get('screen').height - 45}}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'home'} component={CTDHome} />
        <Stack.Screen name={'search'} component={SearchScreen} />
        <Stack.Screen name={'createPost'}>
          {props => <CreatePost {...props} setCreatePost={setCreatePost} toastOn={toastOn} />}
        </Stack.Screen>
        <Stack.Screen name={'creationSuccessful'} component={PostCreationSuccessful} />
        <Stack.Screen name={'map'} component={Map} />
        <Stack.Screen name={'profile'} component={Profile} />
        <Stack.Screen name={'edit-profile'} component={EditProfile} />
        <Stack.Screen name={'challenge'} >
          {props => <ChallengePage {...props}/>}
        </Stack.Screen>
        <Stack.Screen name={'post'}>
          {(props) => <ViewPost {...props} open={true}/>}
        </Stack.Screen>
      </Stack.Navigator>
      <Tabbar
        style={{zIndex: 5}}
        tabs={tabs}
        tabBarContainerBackground={colorShade(colors.surface, -15)}
        tabBarBackground={colors.surface}
        activeTabBackground={colors.light}

        labelStyle={{ color: '#000', fontWeight: '600', fontSize: 11 }}
        onTabChange={a => {
          navigation.navigate(a.url);
        }}
      />
    </View>
  );
}

export default MyTabbar;


