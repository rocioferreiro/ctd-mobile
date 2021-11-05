//Esta Challenge Card tiene menos info y es para la pantalla de my challenges
import * as React from 'react';
import {Button, Card, Title, Paragraph, useTheme} from 'react-native-paper';
import {StyleSheet} from "react-native";
import {useTranslation} from "react-i18next";
import {ip} from "../apollo-graph/Client";

interface Props {
    challenge: any;
}

const ChallengeCardMini = (props: Props) => {
    const { colors } = useTheme();
    const {t} = useTranslation();
    const styles = StyleSheet.create({
        joinButton: {
            borderRadius: 20,
            backgroundColor: colors.accent,
            width: 60,
            paddingLeft: 17,
            marginBottom: 7,
            paddingRight: 17,
            paddingTop: 8,
            paddingBottom: 8
        },
        viewButton: {
            borderRadius: 20,
            width: 60,
            paddingLeft: 17,
            paddingRight: 17,
            paddingTop: 8,
            paddingBottom: 8,
            marginBottom: 7,
            backgroundColor: '#c1c1c1',
        }
    });
    return (<Card style={{backgroundColor:colors.primary}}>
            <Card.Content>
                <Title style={{ fontSize: 25, color: colors.background,
                    marginTop: 5}}>{props.challenge.title}</Title>
                <Paragraph style={{ color: colors.background,fontSize:15,marginBottom:5}}>{t('challenge-card-mini.challenge-description')}</Paragraph>
            </Card.Content>
            <Card.Cover source={props.challenge.image? props.challenge.image.replace('127.0.0.1', ip) : require('../../assets/images/compost.jpg')}/>
            <Card.Actions>
                <Button style={ {backgroundColor:  '#c1c1c1', borderRadius: 20,  width: 100,marginLeft:40,marginRight:120,}}>
                    <Title style={{ fontSize: 15, color: colors.primary,
                    }}>{t('challenge-card-mini.view')}</Title> </Button>
                <Button style={ {backgroundColor: colors.accent, borderRadius: 20,  width: 100, }} > <Title style={{ fontSize: 15, color: colors.primary,
                }}>{t('challenge-card-mini.share')}</Title></Button>
            </Card.Actions>
        </Card>

    );
}

export default ChallengeCardMini;
