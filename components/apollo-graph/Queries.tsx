import {  gql } from '@apollo/client';

//if u want to test these queries pls use ChallengeList or UserList function in router component
//then replace the id with your users test id
export const FIND_CHALLENGE_BY_ID = gql`
query findChallengeById{
  findChallengeById(id: 5){
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
  findUserById(id: "meta84374937cc3f08a2-971f-4577-ad90-1c5144f85119"){
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
  findNearbyChallenges(coordinates: {latitude: 0, longitude: 0}, xDis: 0.1, yDis: 0.1){
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
    getCreatedChallengesByUser(userId: "meta84374937cc3f08a2-971f-4577-ad90-1c5144f85119") {
      id
      title
      description
      startEvent
    }
  }
`;
