import gql from "graphql-tag";

export const CREATE_CHALLENGE = gql`
mutation createChallenge($newChallenge: ChallengeInput!){
  saveChallenge(challenge:$newChallenge)
}
`;
