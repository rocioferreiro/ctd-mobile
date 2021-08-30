import {  gql } from '@apollo/client';

//if u want to test these queries pls use ChallengeList or UserList function in router component
//then replace the id with your users test id
export const FIND_CHALLENGE_BY_ID = gql`
query findChallengeById{
  findChallengeById(id: 1){
    title
    user
    address {
      coordinates {
        longitude
        latitude
      }
    }
  }
}
`;

export const FIND_NEARBY_USERS = gql`
query findNearbyUsers {
  findNearbyUsers(coordinates: {latitude: -34.4618343, longitude: -58.8705242}, xDis: 0.1, yDis: 0.1){
    id
    name
    lastname
    mail
    address {
      coordinates {
        longitude
        latitude
      }
    }
  }
}
`;

export const FIND_USER_BY_ID = gql`
query findUserById{
  findUserById(id: "meta-69y5fn6vr0qp-8be2dc34-cd4b-48ef-85a3-453ac00496eb"){
    name
    id
    mail
    role
    lastname
    address {
      coordinates {
        latitude
        longitude
      }
    }
  }
}
`;

export const GET_SCORE = gql`
query getScore($newChallenge: ChallengeDTOInput!){
    getSuggestedScore(challengeDTO: $newChallenge)
}
`;

export const FIND_NEARBY_CHALLENGES = gql`
query findNearbyChallenges {
  findNearbyChallenges(coordinates: {latitude: -34.4618343, longitude: -58.8705242}, xDis: 0.1, yDis: 0.1){
    id
    title
    description
    coordinates {
        longitude
        latitude
    }
  }
}
`;

export const FIND_CHALLENGES_OF_USER = gql`
  query getCreatedChallengesByUser{
    getCreatedChallengesByUser(userId: "meta-69y5fn6vr0qp-345b9e1b-0c5d-45bf-b9f9-b7b242b5ce80") {
       boost
       categories
       coordinates {
        longitude
        latitude
      }
       description
       downVotes
       endEvent
       endInscription
       id
       locationGeohash
       objectives {
        points
        name
      }
       owner
       startEvent
       startInscription
       title
       upVotes
    }
  }
`;
