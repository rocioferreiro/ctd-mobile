export type CreateChallengeFormValues = {
    title: string,
    description: string,
    challengeObjectives: ChallengeObjective[],
    coordinates: Coordinates,
    inscriptionsFrom?: Date,
    inscriptionsTo?: Date,
    startsFrom: Date,
    finishesOn: Date,
    totalPoints: number,
    ONUObjective: number[],
}

export interface ChallengeObjective {
    name: string,
    points: number
}
export interface Coordinates {
    coordinates: [number, number]
}

export const convertDateToString: (Date) => string = (date: Date) => {
    return date.toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

