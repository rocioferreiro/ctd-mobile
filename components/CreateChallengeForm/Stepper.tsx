import React from 'react';
import {StyleSheet} from 'react-native';

import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import ChallengeDetails from "./ChallengeDetails";
import ChallengeLocation from "./ChallengeLocation";
import ChallengeExtraInfo from "./ChallengeExtraInfo";
import ChallengePoints from "./ChallengePoints";
import {Icon} from "react-native-elements";
import {useTheme} from "react-native-paper";

const content = [
    <ChallengeDetails/>,
    <ChallengeLocation/>,
    <ChallengeExtraInfo/>,
    <ChallengePoints/>
];

const Stepper = () => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        nextButton: {
            borderRadius: 20,
            backgroundColor: colors.accent,
            width: 60,
            paddingLeft: 17,
            marginBottom: 7
        },
        previousButtonIcon: {
            borderRadius: 20,
            width: 60,
            paddingLeft: 17,
            paddingRight: 17,
            paddingTop: 8,
            paddingBottom: 8,
            backgroundColor: '#c1c1c1',
        }
    });

    return (
        <ProgressSteps completedStepIconColor={colors.primary} activeStepIconBorderColor={colors.primary} completedProgressBarColor={colors.primary}>
            {content.map((step, index) => {
                return (
                    <ProgressStep
                        key={index}
                        nextBtnText=
                        {<Icon
                            name={'arrow-forward-outline'}
                            type={'ionicon'}
                        />}
                        nextBtnStyle={styles.nextButton}
                        previousBtnText=
                            {<Icon
                                name={'arrow-back-outline'}
                                type={'ionicon'}
                                style={styles.previousButtonIcon}
                            />}
                    >
                        {step}
                    </ProgressStep>
                );
            })}
        </ProgressSteps>
    );
}

export default Stepper;
