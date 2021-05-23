import {  gql } from '@apollo/client';


// Generic query template
// export const A_QUERY = gql``

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