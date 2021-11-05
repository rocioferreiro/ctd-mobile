import {  gql } from '@apollo/client';

//if u want to test these queries pls use ChallengeList or UserList function in router component
//then replace the id with your users test id
export const FIND_CHALLENGE_BY_ID = gql`
query findChallengeById($id: Long!){
  findChallengeById(id: $id){
   id
    title
    owner
    objectives {
      points
      name
    }
    endEvent
    score
    startEvent
    startInscription
    endInscription
    upVotes
    locationGeohash
    categories
    description
    coordinates {
      latitude
      longitude
    }
  }
}
`;

export const FIND_NEARBY_USERS = gql`
query findNearbyUsers($latitude: Float!, $longitude: Float!) {
  findNearbyUsers(coordinates: {latitude: $latitude, longitude: $longitude}, xDis: 0.1, yDis: 0.1){
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

export const NEW_FIND_USER_BY_ID = gql`
query newFindUserById($targetUserId: String!){
  findUserById(targetUserId: $targetUserId){
    user {
        name
        id
        mail
        role
        level
        lastname
        favouriteODS
        biography
        address {
          coordinates {
            latitude
            longitude
          }
          province
          country
        }
        
    gender
    birthDate
    photo
    }
    state
    connectionQuantity 
  
  }
}
`;

export const GET_TOP_CHALLENGES_BY_ODS = gql`
  query topODS($ods: Int!){
  getTopChallengesByOds(ods: $ods, pageNumber: 0, pageSize: 15){
    challenges{
      id
      title
      score
      subscribersQuantity
    }
  }
}
`



export const GET_SCORE = gql`
query getScore($newChallenge: ChallengeDTOInput!){
    getSuggestedScore(challengeDTO: $newChallenge)
}
`;

export const FIND_NEARBY_CHALLENGES = gql`
query findNearbyChallenges($latitude: Float!, $longitude: Float!) {
  findNearbyChallenges(coordinates: {latitude: $latitude, longitude: $longitude}, xDis: 0.1, yDis: 0.1){
    id
    title
    description
    owner
    categories
    endEvent
    endInscription
    locationGeohash
    objectives {
      points
      name
    }
    coordinates {
        longitude
        latitude
    }
    startEvent
    startInscription
  }
}
`;

export const FIND_CHALLENGES_OF_USER = gql`
  query getCreatedChallengesByUser($userId: String!){
    getCreatedChallengesByUser(userId: $userId) {
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

export const FIND_POSTS_BY_OWNER = gql`
query findPostByOwner($ownerId: String!) {
  findPostByOwner(ownerId: $ownerId){
    id
    title
    text
    image
    upvotes
  }
}
`;

export const FIND_POSTS_OF_USER = gql`
  query findPostByOwner($ownerId: String!){
    findPostByOwner(ownerId: $ownerId){
      id
      creationDate
      image
      text
      title
      upvotes
  }
}
`;

export const FIND_POST_BY_ID = gql`
query findPostById($id: String!){
  findPostById(id: $id){
    boosted
    creationDate
    id
    image
    owner {
      mail
      id
      name
      lastname
      role
    }
    text
    title
    upvotes
  }
}
`;

export const FIND_CHALLENGES_BY_CATEGORY = gql`
query getChallengeByFilter($category: Int!) {
    getChallengeByFilter(filter:{ category: [$category]}, pageSize:10,pageNumber:0) {
           actualPage
           challenges{
            categories
            boost
            description
            endEvent
            startEvent
            endInscription 
            startInscription 
            id
            title
            owner
            upVotes
            downVotes
            coordinates{
              longitude
              latitude
            }
            objectives{
              points 
              name
              
            }
          }
            size
            totalElements
            totalPages
           }
}
`;

export const FIND_CHALLENGES_BY_FILTER = gql`
query getChallengeByFilter($title: String!) {
    getChallengeByFilter(filter:{ title: $title}, pageSize:10,pageNumber:0) {
           actualPage
           challenges{
            categories
            boost
            description
            endEvent
            startEvent
            endInscription 
            startInscription 
            id
            title
            owner
            upVotes
            downVotes
            coordinates{
              longitude
              latitude
            }
            objectives{
              points 
              name
              
            }
          }
            size
            totalElements
            totalPages
           }
}
`;

export const PENDING_CONNECTION_REQUESTS_NUMBER = gql`
query myPendingConnectionsNumber {
  getMyPendingConnectionsNumber
}
`;

export const GET_POST_BY_CONNECTIONS = gql`
query getPostByConnections {
  getPostByConnections {
    id
    boosted
    creationDate
    image
    owner
    text
    title
    upvotes
  }
}
`;

export const GET_CONNECTIONS = gql`
query getConnections {
  getAllMyConnections
}
`;

export const NEW_GET_PENDING_CONNECTIONS = gql`
query newGetPendingConnections {
  getMyPendingConnection {
    followUser {
        id
        name
        lastname
        mail
    }
  }
}
`;

export const GET_CHALLENGES_BY_FILTER = gql`
query getChallengeByFilter($title: String!) {
    getChallengeByFilter(filter:{ title: $title}, pageSize:10, pageNumber:1) {
           actualPage
           challenges{
            categories
            boost
            description
            endEvent
            startEvent
            endInscription 
            startInscription 
            id
            title
            owner
            upVotes
            downVotes
            coordinates{
              longitude
              latitude
            }
            objectives{
              points 
              name
            }
          }
            size
            totalElements
            totalPages
           }
}
`;

export const GET_VERIFIED_CHALLENGES = gql`
query getVerifiedChallenges {
    getVerifiedChallenges {
        description
        endEvent
        categories
        id
        title
        score
    }
}
`;
