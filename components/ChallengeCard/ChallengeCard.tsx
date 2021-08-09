import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {Challenge} from "../Models/Challenge";

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />








const ChallengeCard = () => (
    <Card>
        <Card.Title title="Username" subtitle="Level" left={LeftContent} />
        <Card.Content>
            <Title>Challenge Title</Title>
            <Paragraph>Challenge Description</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Actions>
            <Button>View</Button>
            <Button>Join</Button>
        </Card.Actions>
    </Card>
);

export default ChallengeCard;