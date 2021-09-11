import gql from "graphql-tag";

export const CREATE_CHALLENGE = gql`
mutation createChallenge($newChallenge: ChallengeDTOInput!){
  saveChallenge(challenge:$newChallenge){
    id
  }
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
