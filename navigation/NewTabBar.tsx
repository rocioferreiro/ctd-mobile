import React, {useEffect} from "react";
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


const MyTabbar = () => {
  const {colors} = useTheme();
  const [createPost, setCreatePost] = React.useState<Boolean>(true)

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
      name: 'Home',
      activeIcon: <Icon name="home" color='#fff' size={25} />,
      inactiveIcon: <Icon name="home" color="#4d4d4d" size={25} />,
      component: <CTDHome/>
    },
    {
      name: 'Search',
      activeIcon: <Icon name={'search-outline'}
                        type={'ionicon'} color='#fff' size={25} />,
      inactiveIcon: <Icon name={'search-outline'}
                          type={'ionicon'} color="#4d4d4d" size={25} />,
      component: <SearchScreen/>
    },
    {
      name: 'New Post',
      activeIcon: <Icon name="camera" color="#fff" size={25} />,
      inactiveIcon: <Icon name="camera" color="#4d4d4d" size={25} />,
      component: createPost? <CreatePost setCreatePost={setCreatePost} toastOn={toastOn} /> : <PostCreationSuccessful close={() => {}}/>
    },
    {
      name: 'Map',
      activeIcon: <Icon name="map" color="#fff" size={25} />,
      inactiveIcon: <Icon name="map" color="#4d4d4d" size={25} />,
      component: <Map/>
    },
    {
      name: 'Profile',
      activeIcon: <Icon name={'person-outline'}
                        type={'ionicon'} color="#fff" size={25} />,
      inactiveIcon: <Icon name={'person-outline'}
                          type={'ionicon'} color="#4d4d4d" size={25} />,
      component: <Profile/>
    },

  ];
  const [activeTab, setActiveTab] = React.useState(tabs[0].component)

  useEffect(() => {
    if(!createPost) {
      setActiveTab(tabs[2].component)
      setCreatePost(true)
    }
  }, [createPost])




  return (
    <View style={{backgroundColor: colors.surface}}>
      {activeTab}
      <View style={{paddingVertical: 30 }}/>
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


