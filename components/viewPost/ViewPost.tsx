import {Avatar, Button, Card, Colors, Paragraph, Title, useTheme} from "react-native-paper";
import React from "react";
import {Post} from "../Models/Post";
import {Icon} from "react-native-elements";

type Props = {
  post: Post
}



const ViewPost = (props:Props) => {
  const { colors } = useTheme();
  const [image, setImage] = React.useState(null)
  const [ addImage, setAddImage] = React.useState(false)

  const LeftContent = props => <Avatar.Text label={'AA'} {...props}/>

  return (
    <Card style={{backgroundColor: colors.surface}}>
      <Card.Title title="Username" subtitle="Level" left={LeftContent}/>
      <Card.Content>
        <Title style={{
          fontSize: 25, color: colors.primary,
          marginTop: 5
        }}>{props.post.title}</Title>
        <Paragraph style={{color: colors.primary, fontSize: 15, marginBottom: 5}}>Challenge
          Description</Paragraph>
      </Card.Content>
      <Card.Cover source={{uri: 'https://picsum.photos/700'}}/>
      <Card.Actions>
        <Icon name={'heart-outline'} type={'ionicon'}/>
        <Icon name={'heart'} type={'ionicon'}/>

      </Card.Actions>
    </Card>

  )
};


export default ViewPost;
