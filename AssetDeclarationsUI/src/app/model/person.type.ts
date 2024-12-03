import { Party } from "./party.type"

export type Person = {
    id: number ,
    name: string,
    placeOfBirth : string,
    dateOfBirth : Date,

    partyId?: number,
    party? : Party,
}

export const defaultPerson = {
    id: 0,
    name: '',
    placeOfBirth: '',
    dateOfBirth: new Date()
}