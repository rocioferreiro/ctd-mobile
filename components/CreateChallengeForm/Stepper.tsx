import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import ChallengeDetails from "./Details/ChallengeDetails";
import ChallengeLocation from "./ChallengeLocation";
import ChallengeExtraInfo from "./inscriptions/ChallengeExtraInfo";
import ChallengePoints from "./ChallengePoints";
import {Icon} from "react-native-elements";
import {ActivityIndicator, useTheme} from "react-native-paper";

type Props = {
    onSubmit: (Challenge) => void,
    formik: any,
    isLoading: boolean
}

const Stepper = (props: Props) => {
    const [disabled, setDisabled] = React.useState(true)

    const content = [
        <ChallengeDetails formik={props.formik} setDisabled={setDisabled}/>,
        <ChallengeLocation formik={props.formik} setDisabled={setDisabled}/>,
        <ChallengeExtraInfo formik={props.formik} setDisabled={setDisabled}/>,
        <ChallengePoints formik={props.formik} setDisabled={setDisabled}/>
    ];

    const {colors} = useTheme();

    const styles = StyleSheet.create({
        container: {
            borderWidth: 0,
            backgroundColor: 'rgba(0,0,0,0)',
            overflow: "visible",
        },
        nextButton: {
            backgroundColor: disabled ? '#c1c1c1' : colors.accent,
            borderRadius: 20,
            width: 60,
            paddingLeft: 17,
            paddingRight: 17,
            paddingTop: 8,
            paddingBottom: 8,
            marginBottom: Dimensions.get('screen').height*0.03
        },
        previousButtonIcon: {
            borderRadius: 20,
            width: 60,
            paddingLeft: 17,
            paddingRight: 17,
            paddingTop: 8,
            paddingBottom: 8,
            backgroundColor: '#c1c1c1',
            marginBottom: Dimensions.get('screen').height*0.03
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

    return <ProgressSteps style={{position: 'relative', overflow: 'visible'}} completedStepIconColor={colors.primary} activeStepIconBorderColor={colors.primary}
                          completedProgressBarColor={colors.primary} disabledStepIconColor={colors.accent}
                          progressBarColor={colors.accent}>
        {content.map((step, index) => {
            return (
                <ProgressStep
                    style={styles.container}
                    key={index}
                    nextBtnDisabled={disabled}
                    nextBtnText={
                        <Icon
                            name={'arrow-forward-outline'}
                            type={'ionicon'}
                            style={styles.nextButton}
                            color={colors.background}
                        /> as unknown as string
                    }
                    onSubmit={props.onSubmit}
                    finishBtnText={ props.isLoading ? <ActivityIndicator size="large" /> :
                        <Icon
                            name={'checkmark-outline'}
                            type={'ionicon'}
                            style={styles.nextButton}
                        /> as unknown as string
                    }
                    previousBtnText={
                        <Icon
                            name={'arrow-back-outline'}
                            type={'ionicon'}
                            style={styles.previousButtonIcon}
                        /> as unknown as string
                    }
                >
                    {step}
                </ProgressStep>
            );
        })}
    </ProgressSteps>;
}

export default Stepper;
