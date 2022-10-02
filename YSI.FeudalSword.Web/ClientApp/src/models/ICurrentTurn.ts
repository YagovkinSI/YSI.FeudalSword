import { enTurnState } from "../store/Root/PublicData/CurrentTurn/CurrentTurnState";

export interface ICurrentTurn {
    id: number,
    status: enTurnState
}