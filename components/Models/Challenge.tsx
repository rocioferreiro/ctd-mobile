import {Address, User} from "./User"

export type Challenge  = {
    address?: Address,
    date?: string,
    description?: string,
    id?: string,
    participants: User[],
    title: string,
    user: User,
    coordinates?: [number, number]
}



//faltaria agregar participants pero la lista podria ser muy larga, no se si conviene mandarla aca
export function challengeToGeoJson(challenge: Challenge): string {
    return `
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [${challenge.address.coordinates.x}, ${challenge.address.coordinates.y}]
    },
    "properties": {
      "name": ${challenge.title},
      "description": ${challenge.description},
      "id": ${challenge.id},
      "date": ${challenge.date},
      "addressId": ${challenge.address.id}
      "country": ${challenge.address.country}
      "number": ${challenge.address.number}
      "locality": ${challenge.address.locality}
      "province": ${challenge.address.province}
      "street": ${challenge.address.street}
      "created by": ${challenge.user.id}
    }
  }
  `;
}