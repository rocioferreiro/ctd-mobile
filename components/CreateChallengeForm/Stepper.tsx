import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';

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

type Props = {
    onSubmit: (Challenge) => void
}

const Stepper = (props: Props) => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            borderWidth:0
        },
        nextButton: {
            backgroundColor: colors.accent,
            borderRadius: 20,
            width: 60,
            paddingLeft: 17,
            paddingRight: 17,
            paddingTop: 8,
            paddingBottom: 8,
        },
        previousButtonIcon: {
            borderRadius: 20,
            width: 60,
            paddingLeft: 17,
            paddingRight: 17,
            paddingTop: 8,
            paddingBottom: 8,
            backgroundColor: '#c1c1c1',
        },
        finishButton: {
            backgroundColor: colors.extra,
            borderRadius: 20,
            width: 60,
            paddingLeft: 17,
            paddingRight: 17,
            paddingTop: 8,
            paddingBottom: 8,
        },
    });

    return <ProgressSteps completedStepIconColor={colors.primary} activeStepIconBorderColor={colors.primary}
                       completedProgressBarColor={colors.primary}>
            {content.map((step, index) => {
                return (
                  <ProgressStep style={styles.container}
                                key={index}
                                nextBtnText=
                                  {<Icon
                                    name={'arrow-forward-outline'}
                                    type={'ionicon'}
                                    style={styles.nextButton}
                                  />}
                                onSubmit={props.onSubmit}
                                finishBtnText=
                                  {<Icon
                                    name={'paper-plane-outline'}
                                    type={'ionicon'}
                                    style={styles.finishButton}
                                  />}
                    //nextBtnStyle={styles.nextButton}
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
        </ProgressSteps>;
}

export default Stepper;
