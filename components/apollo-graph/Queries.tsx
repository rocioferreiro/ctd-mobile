import {  gql } from '@apollo/client';


// Generic query template
// export const A_QUERY = gql``

//if u want to test these queries pls use ChallengeList or UserList function in router component
//then replace the id with your users test id
export const FIND_CHALLENGE_BY_ID = gql`
query findChallengeById{
  findChallengeById(id: "861b39ca-b5e3-4c13-af58-cc7908b7dfc6"){
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

export const FIND_USER_BY_ID = gql`
query findUserById{
  findUserById(id: "318173e5-e7d0-4b42-a303-f947073097ff"){
    name
    id
    mail
    role
    lastname
    address {
      coordinates {
        x
        y
      }
    }
  }
}
`;