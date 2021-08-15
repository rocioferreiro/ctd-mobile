import * as React from 'react';
import {Avatar, Button, Card, Title, Paragraph, useTheme} from 'react-native-paper';
import {Challenge} from "../Models/Challenge";
import {StyleSheet} from "react-native";



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
            marginBottom: 7
        },
        viewButton: {
            borderRadius: 20,
            width: 60,
            paddingLeft: 17,
            paddingRight: 17,
            paddingTop: 8,
            paddingBottom: 8,
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
                <Button style={styles.viewButton}>View</Button>
                <Button style={styles.joinButton}>Join</Button>
            </Card.Actions>
        </Card>

    );
}

export default ChallengeCard;
