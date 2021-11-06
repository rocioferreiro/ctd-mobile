import {Address, Tuple, User} from "./User"

export type Challenge  = {
    boost?: Boolean,
    categories: string[],
    coordinates: Tuple,
    description?: string,
    downVotes?: number,
    endEvent: string,
    endInscription: string,
    id?: number,
    locationGeohash?: string,
    objectives: ChallengeObjective[],
    owner: string,
    startEvent: string,
    startInscription: string,
    title?: string,
    upVotes?: number,
    score?: number
}

export type ChallengeObjective = {
    name: string,
    points: number,
    id?: number
}



//faltaria agregar participants pero la lista podria ser muy larga, no se si conviene mandarla aca
export function challengeToGeoJson(challenge: Challenge): string {
    return `
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [${challenge.coordinates.longitude}, ${challenge.coordinates.latitude}]
    },
    "properties": {
      "name": ${challenge.title},
      "description": ${challenge.description},
      "id": ${challenge.id},
      "date": ${challenge.startEvent},
      "created by": ${challenge.owner}
    }
  }
  `;
}
