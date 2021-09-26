import React, {useEffect, useState} from "react";
import Tabbar from "@mindinventory/react-native-tab-bar-interaction";
import {Icon} from "react-native-elements";
import SearchScreen from "../components/SearchScreen";
import Map from "../components/Map";
import {Profile} from "../components/Profile/Profile";
import {useTheme} from "react-native-paper";
import {Dimensions, View} from "react-native";
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

const MyTabbar = () => {
  const {colors} = useTheme();
  const [userId, setUserId] = useState('');
  const [createPost, setCreatePost] = React.useState<Boolean>(true)
  const {t, i18n} = useTranslation();
  const [language, setLanguage] = React.useState(i18n.language);
  const [getConnectionRequestsNumber, {data}] = useLazyQuery(PENDING_CONNECTION_REQUESTS_NUMBER, {variables: {ownerId: userId}});

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
      activeIcon: <Icon name="home" color='#fff' size={25} />,
      inactiveIcon: <Icon name="home" color="#4d4d4d" size={25} />,
      component: <CTDHome/>
    },
    {
      name: t('new-tabbar.search'),
      activeIcon: <Icon name={'search-outline'}
                        type={'ionicon'} color='#fff' size={25} />,
      inactiveIcon: <Icon name={'search-outline'}
                          type={'ionicon'} color="#4d4d4d" size={25} />,
      component: <SearchScreen/>
    },
    {
      name: t('new-tabbar.new-post'),
      activeIcon: <Icon name="camera" color="#fff" size={25} />,
      inactiveIcon: <Icon name="camera" color="#4d4d4d" size={25} />,
      component: createPost? <CreatePost setCreatePost={setCreatePost} toastOn={toastOn} /> : <PostCreationSuccessful close={() => {}}/>
    },
    {
      name: t('new-tabbar.map'),
      activeIcon: <Icon name="map" color="#fff" size={25} />,
      inactiveIcon: <Icon name="map" color="#4d4d4d" size={25} />,
      component: <Map/>
    },
    {
      name: t('new-tabbar.profile'),
      activeIcon: <PersonIcon badgeColor={colors.accent} badgeNumber={data?.getMyPendingConnectionsNumber} backgroundColor={'#fff'}/>,
      inactiveIcon: <PersonIcon badgeColor={colors.accent} badgeNumber={data?.getMyPendingConnectionsNumber} backgroundColor={'#4d4d4d'}/>,
      component: <Profile/>
    },

  ];
  const [activeTab, setActiveTab] = React.useState(tabs[0].component);

  useEffect(() => {
    getUserId().then(id => {
      setUserId(id);
      getConnectionRequestsNumber();
    });
  }, []);

  useEffect(() => {
    if(!createPost) {
      setActiveTab(tabs[2].component)
      setCreatePost(true)
    }
  }, [createPost])

  return (
    <View style={{backgroundColor: colors.surface}}>
      {activeTab}
      <View style={{paddingVertical: 15 }}/>
      <Tabbar
        style={{zIndex: 5}}
        tabs={tabs}
        tabBarContainerBackground={colorShade(colors.surface, -15)}
        tabBarBackground={colors.surface}
        activeTabBackground={colors.light}

        labelStyle={{ color: '#000', fontWeight: '600', fontSize: 11 }}
        onTabChange={a => setActiveTab(a.component)}
      />
    </View>
  );
}

export default MyTabbar;


