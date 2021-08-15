import * as React from 'react';
import {Avatar, Button, Card, Title, Paragraph, useTheme} from 'react-native-paper';
import {Challenge} from "../Models/Challenge";
import {StyleSheet,Text} from "react-native";



const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

interface Props {
    challenge: any;
}

const ChallengeCard = (props: Props) => {
    const { colors } = useTheme();
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
    return (<Card>
            <Card.Title title="Username" subtitle="Level" left={LeftContent}/>
            <Card.Content>
                <Title>{props.challenge.title}</Title>
                <Paragraph>Challenge Description</Paragraph>
            </Card.Content>
            <Card.Cover source={{uri: 'https://picsum.photos/700'}}/>
            <Card.Actions>
                <Button style={ {backgroundColor:  '#c1c1c1', borderRadius: 20,  width: 80,marginLeft:60,marginRight:60}}>View </Button>
                <Button style={ {backgroundColor: colors.accent, borderRadius: 20,  width: 80 }} >Join</Button>
            </Card.Actions>
        </Card>

    );
}

export default ChallengeCard;
