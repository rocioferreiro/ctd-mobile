export type CreateChallengeFormValues = {
    title: string,
    description: string,
    challengeObjectives: ChallengeObjective[],
    coordinates: Coordinates,
    locationExtraInfo?: string,
    inscriptionsFrom?: Date,
    inscriptionsTo?: Date,
    startsFrom: Date,
    finishesOn: Date,
    totalPoints: number,
    ONUObjective: number[],
}

export type CreatePostFormValues = {
    title: string,
    owner: string,
    text: string,
    boosted: false,
    image: string,
    upvotes: number
}

export interface ChallengeObjective {
    name: string,
    points: number
}

export interface Coordinates {
    coordinates: [number, number]
}

export const convertDateToString: (Date) => string = (date: Date) => {
    let d = date.getDate() + '';
    let m = date.getMonth() + '';
    const y = date.getFullYear();
    if (parseInt(d) < 10) d = '0' + d;
    if (parseInt(m) < 10) m = '0' + m;
    return y + '-' + m + '-' + d;
}

