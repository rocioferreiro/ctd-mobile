export type User = {
    address?: Address,
    age?: number,
    birthDate?: string,
    gender?: Gender,
    id?: string,
    lastname: string,
    level?: number,
    mail: string,
    name: string,
    role: Role,
    coordinates?: [number, number],
    photoUrl?: string
}

export type GoogleUser = {
    email: string,
    familyName: string,
    givenName: string,
    photoUrl: string
}

export type GoogleLogin = {
    accessToken: string,
    idToken: string,
    refreshToken: string,
    user: GoogleUser
}

export function jsonToGoogleLogin(json) {
    const user: GoogleUser = {
        email: json["user"]["email"],
        familyName: json["user"]["familyName"],
        givenName: json["user"]["givenName"],
        photoUrl: json["user"]["photoUrl"]
    }
    return {
        accessToken: json["accessToken"], idToken: json["idToken"], refreshToken: json["refreshToken"], user: user
    }
}

export type Address = {
    coordinates: Tuple,
    country?: string,
    id: string,
    locality?: string,
    number?: string,
    province?: string,
    street?: string,
}

export enum Gender {
    MALE,
    FEMALE,
    OTHER
}

export enum Role {
    NORMAL,
    ENTERPRISE,
    INFLUENCER
}

export type Tuple = {
    longitude: number,
    latitude: number
}

export function userToGeoJson(user: User): string {
    return `
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [${user.address.coordinates.longitude}, ${user.address.coordinates.latitude}]
    },
    "properties": {
      "name": ${user.name},
      "lastname": ${user.lastname},
      "id": ${user.id},
      "age": ${user.age},
      "birthDate": ${user.birthDate},
      "addressId": ${user.address.id}
      "country": ${user.address.country}
      "number": ${user.address.number}
      "locality": ${user.address.locality}
      "province": ${user.address.province}
      "street": ${user.address.street}
      "gender": ${user.gender}
      "level": ${user.level}
      "mail": ${user.mail}
      "role": ${user.role}
    }
  }
  `;
}
