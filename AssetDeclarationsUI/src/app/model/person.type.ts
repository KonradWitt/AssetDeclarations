import { Party } from "./party.type"

export type Person = {
    id: number,
    name: string

    partyId?: number,
    party? : Party,
}