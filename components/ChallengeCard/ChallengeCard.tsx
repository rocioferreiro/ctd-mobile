import * as React from 'react';
import {Avatar, Button, Card, Title, Paragraph, useTheme} from 'react-native-paper';
import {StyleSheet, Text} from "react-native";
import {useTranslation} from "react-i18next";

const LeftContent = props => <Avatar.Text label={'UN'} {...props}/>

interface Props {
    challenge: any;
    setSelectedChallenge:(Challenge)=>void
}

const ChallengeCard = (props: Props) => {
    const {t, i18n} = useTranslation();
    const [language, setLanguage] = React.useState(i18n.language);
    const {colors} = useTheme();
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
            backgroundColor: '#c1c1c1',
            width: 60,
            paddingLeft: 17,
            marginBottom: 7,
            paddingRight: 17,
            paddingTop: 8,
            paddingBottom: 8
        }
    });
    return (<Card style={{backgroundColor: colors.surface}}>
            <Card.Title title="Username" subtitle="Level" left={LeftContent}/>
            <Card.Content>
                <Title style={{
                    fontSize: 25, color: colors.primary,
                    marginTop: 5
                }}>{props.challenge.title}</Title>
                <Paragraph style={{color: colors.primary, fontSize: 15, marginBottom: 5}}>{t('challenge-card.challenge-description')}</Paragraph>
            </Card.Content>
            <Card.Cover source={{uri: 'https://picsum.photos/700'}}/>
            <Card.Actions>
                <Button style={{
                    backgroundColor: '#c1c1c1',
                    borderRadius: 20,
                    width: 100,
                    marginLeft: 40,
                    marginRight: 120,
                }} onPress={()=>props.setSelectedChallenge(props.challenge)}
                ><Title style={{
                        fontSize: 15, color: colors.primary,padding: 0
                    }}>{t('challenge-card.view')}</Title>
                </Button>
                <Button style={{
                    backgroundColor: colors.accent,
                    borderRadius: 20,
                    width: 100,
                }}
                ><Title style={{
                        fontSize: 15, color: colors.primary, padding: 0
                    }}>{t('challenge-card.join')}</Title>
                </Button>


            </Card.Actions>
        </Card>

    );
}

export default ChallengeCard;
