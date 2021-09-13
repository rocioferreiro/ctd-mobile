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
