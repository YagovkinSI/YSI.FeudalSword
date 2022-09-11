import { Action, Reducer } from "redux";
import { defaultCurrentRequests, ICurrentRequests } from "./currentRequests";
import { defaultUserPrivate } from "./User/defaultState";
import { IUserPrivateState } from "./User/state";

export interface IPrivateDataState {
    user: IUserPrivateState,
    currentRequests: ICurrentRequests
}

const defaultUiState : IPrivateDataState = {
    user: defaultUserPrivate,
    currentRequests: defaultCurrentRequests
}

export const reducer: Reducer<IPrivateDataState> = (
    state: IPrivateDataState = defaultUiState,
    incomingAction: Action
) : IPrivateDataState => { 
    return state;
}