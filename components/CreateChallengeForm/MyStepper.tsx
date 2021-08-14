import React, {useState} from 'react';
import {Text, View} from 'react-native';

import Stepper from 'react-native-stepper-ui';
import ChallengeDetails from "./ChallengeDetails";
import ChallengeLocation from "./ChallengeLocation";
import ChallengeExtraInfo from "./ChallengeExtraInfo";
import ChallengePoints from "./ChallengePoints";

const content = [
    <ChallengeDetails/>,
    <ChallengeLocation/>,
    <ChallengeExtraInfo/>,
    <ChallengePoints/>
];

const MyStepper = () => {
    const [active, setActive] = useState(0);

    return (
        <View style={{marginVertical: 80, marginHorizontal: 20}}>
            <View style={{marginTop: 20, marginBottom: 20}}>
                <Text> Create Challenge </Text>
            </View>
            <Stepper
                active={active}
                content={content}
                onBack={() => setActive((p) => p - 1)}
                onFinish={() => alert('Finish')}
                onNext={() => setActive((p) => p + 1)}
            />
        </View>
    );
};

export default MyStepper;
