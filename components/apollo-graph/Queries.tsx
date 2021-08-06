import {  gql } from '@apollo/client';

//if u want to test these queries pls use ChallengeList or UserList function in router component
//then replace the id with your users test id
export const FIND_CHALLENGE_BY_ID = gql`
query findChallengeById{
  findChallengeById(id: "12d273a5-d8e2-4a90-a8ba-4e52982f71e1"){
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
  findNearbyUsers(coordinates: {latitude: 10, longitude: 10}, xDis: 10, yDis: 10){
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
  findUserById(id: "c3231e79-970d-44a3-ac55-b301a1d6e37d"){
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

export const FIND_NEARBY_CHALLENGES = gql`
query findNearbyChallenges {
  findNearbyChallenges(coordinates: {latitude: 10, longitude: 10}, xDis: 10, yDis: 10){
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
  query getCreatedChallengesByUser($userId: String!) {
    getCreatedChallengesByUser(userId: $userId) {
      id
      title
      description
      startEvent
    }
  }
`;
