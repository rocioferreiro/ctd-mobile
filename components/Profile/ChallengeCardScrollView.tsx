import React, {useEffect, useState} from "react";
import { Card, Divider, useTheme} from 'react-native-paper';
import {Dimensions, ScrollView} from "react-native";
import {useTranslation} from "react-i18next";
import {Challenge} from "../Models/Challenge";
import {getToken, getUserId} from "../Storage";
import {View} from "../Themed";
import ChallengePage from "../Challenge/ChallengePage";
import ChallengeCard from "../ChallengeCard/ChallengeCard";

type Props = {
    navigation?: any
    route?: any,
}

const ChallengeCardScrollView = (props:Props) => {
    const {t} = useTranslation();
    const [selectedChallenge, setSelectedChallenge] = useState();
    const [userId, setUserId] = useState('');
    const {colors} = useTheme();
    const [token, setToken] = React.useState('')
    const [dataSourceCords, setDataSourceCords] = useState([]);
    const [scrollToIndex,setScrollToIndex]= useState(-1)
    const [ref, setRef] = useState(null);
    //const [dataSource, setDataSource] = useState([]);

    const scrollHandler = () => {
        console.log(dataSourceCords.length, scrollToIndex);
            // @ts-ignore
        ref.scrollTo({
                x: 0,
                y: dataSourceCords[scrollToIndex],
                animated: true,
            });

    };


    useEffect(() => {
        getToken().then(t => {
            setToken(t);
            getUserId().then(id => {
                setUserId(id);
            });
        });
        setScrollToIndex(props.route.params.key)
    }, []);



    useEffect(()=>{
        //console.log(scrollToIndex)
        //console.log(ref)
        console.log(dataSourceCords)
        if(dataSourceCords.length>0 && scrollToIndex !== -1 && ref) {
            console.log("inside use effect")
            scrollHandler()
        }
        else{
            console.log("else")
        }

    }, [dataSourceCords,setDataSourceCords,scrollToIndex,ref])



    return (
       <View>
           {
                selectedChallenge ?
                    <ChallengePage currentUserId={userId} setSelectedChallenge={setSelectedChallenge} challenge={selectedChallenge}/> :
                    <Card style={{
                        width: Dimensions.get('window').width,
                        height: '100%',
                        backgroundColor: colors.surface
                    }}>
                                <View style={{backgroundColor: 'rgba(0,0,0,0)' }}>
                                    <Divider/>
                                    <ScrollView  ref={(ref) => {
                                        setRef(ref);
                                    }} style={{
                                        marginBottom: Dimensions.get('screen').height * 0.15,
                                        marginTop: Dimensions.get('screen').height * 0.04,
                                        backgroundColor: 'rgba(0,0,0,0)',
                                        overflow: "visible"
                                    }}

                                    >

                                        {props.route.params.challenges.map((challenge, i) =>
                                            <View   onLayout={(event) => {
                                                const layout = event.nativeEvent.layout;
                                                let aux= [...dataSourceCords]
                                                aux[i]=layout.y
                                               // dataSourceCords[i] = layout.y;
                                                setDataSourceCords(aux);
                                              /*  console.log(dataSourceCords);
                                                console.log('height:', layout.height);
                                                console.log('width:', layout.width);
                                                console.log('x:', layout.x);*/
                                                console.log('y:', layout.y);

                                            }} key={i} style={{marginBottom: 5,backgroundColor: 'rgba(0,0,0,0)'}}>
                                                <ChallengeCard token={token} navigation={props.navigation} setSelectedChallenge={setSelectedChallenge} challenge={challenge}/>

                                            </View>
                                        )}
                                    </ScrollView>
                                </View>
                    </Card>
            }
        </View>

    )
}

export default ChallengeCardScrollView;
