import { Participant } from "./Participants.model";

export interface Activity {
    id: number,
    name: string,
    participants: number,
    elegidos: Participant[]
}