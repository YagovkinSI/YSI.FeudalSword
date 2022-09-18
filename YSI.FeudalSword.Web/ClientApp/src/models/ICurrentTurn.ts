import { enTurnState } from "../store/PublicData/CurrentTurn/CurrentTurnState";

export interface ICurrentTurn {
    id: number,
    status: enTurnState
}