import gql from "graphql-tag";

export const CREATE_CHALLENGE = gql`
mutation createChallenge($newChallenge: ChallengeDTOInput!){
  saveChallenge(challenge:$newChallenge){
    id
  }
}
`;

export const SAVE_GOOGLE_USER = gql`
mutation googleLogin($googleUser: GoogleLoginRequestInput!){
  googleLogin(req: $googleUser) {
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
    refreshToken
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
mutation likePost($postId: String!){
  likePost(postId: $postId)
}
`;

export const UNLIKE_POST = gql`
mutation unlikePost($postId: String!){
  unlikePost(postId: $postId)
}
`;

export const CONNECT = gql`
mutation connect($followingUserId: String!){
  connect(followingUserId: $followingUserId)
}
`;

export const DISCONNECT = gql`
mutation disconnect($followingUserId: String!){
  disconnect(followingUserId: $followingUserId)
}
`;

export const ACCEPT_CONNECTION = gql`
mutation acceptConnection($otherUserID: String!){
  acceptConnection(otherUserID: $otherUserID)
}
`;

export const REJECT_CONNECTION = gql`
mutation rejectConnection($otherUserID: String!){
  rejectConnection(otherUserID: $otherUserID)
}
`;

/*# Add a user to the challenge participant list
addUserToChallenge(idUser: String!, idChallenge: Long!): String!*/

export const JOIN_CHALLENGE = gql`
 mutation JoinChallenge($idChallenge:Long!){
  addUserToChallenge(idChallenge:$idChallenge)
}

`;

export const UNJOIN_CHALLENGE = gql`
 mutation UnJoinChallenge($challengeId: Long!){
  unsubscribeFromAChallenge(challengeId: $challengeId)
}

`;

export const UPDATE_USER  = gql`
mutation editUser($user: UserInput!){
updateUser(user:$user)
}
`;

export const UPDATE_USER_LOCATION =gql`
mutation editUserLocation($address: AddressInput!){
updateUserLocation(address:$address)
}

`;

export const VERIFY_CHALLENGE = gql`
 mutation VerifyChallenge($challengeId: Long!, $challengeToken: String!){
  verifyChallenge(challengeId: $challengeId, challengeToken: $challengeToken) {
    levelUp
    ok
  }
}`;
