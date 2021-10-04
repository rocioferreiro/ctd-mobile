import gql from "graphql-tag";

export const CREATE_CHALLENGE = gql`
mutation createChallenge($newChallenge: ChallengeDTOInput!){
  saveChallenge(challenge:$newChallenge){
    id
  }
}
`;
export const CREATE_POST = gql`
mutation createPost($newPost: PostDTOInput!){
  savePost(post:$newPost)
}
`;

export const LOGIN = gql`
mutation login($loginUser: LoginUserInput!){
  login(loginUser:$loginUser){
    idUser
    token
  }
}
`;

export const REGISTER = gql`
mutation register($newUser: InputUserInput!) {
	saveUser(newUser: $newUser) {
        id
    }
}
`;

export const LIKE_POST = gql`
mutation likePost($userId: String!, $postId: String!){
  likePost(userId: $userId, postId: $postId)
}
`;

export const UNLIKE_POST = gql`
mutation unlikePost($userId: String!, $postId: String!){
  unlikePost(userId: $userId, postId: $postId)
}
`;

export const CONNECT = gql`
mutation connect($targetUser: UserInput!, $followingUser: UserInput!){
  connect(targetUser: $targetUser, followingUser: $followingUser)
}
`;

export const DISCONNECT = gql`
mutation disconnect($targetUserId: String!, $followingUserId: String!){
  disconnect(targetUserId: $targetUserId, followingUserId: $followingUserId)
}
`;

export const ACCEPT_CONNECTION = gql`
mutation acceptConnection($myUserID: String!, $otherUserID: String!){
  acceptConnection(myUserID: $myUserID, otherUserID: $otherUserID)
}
`;

export const REJECT_CONNECTION = gql`
mutation rejectConnection($myUserID: String!, $otherUserID: String!){
  rejectConnection(myUserID: $myUserID, otherUserID: $otherUserID)
}
`;

/*# Add a user to the challenge participant list
addUserToChallenge(idUser: String!, idChallenge: Long!): String!*/

export const JOIN_CHALLENGE = gql`
 mutation JoinChallenge($idUser:String!,$idChallenge:Long!){
  addUserToChallenge(idUser: $idUser,idChallenge:$idChallenge)
}

`;
