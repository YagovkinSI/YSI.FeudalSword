import { Action } from "redux";
import { IPublicDataApiModel } from "../../models/IPublicDataApiModel";
import { RootState } from "../Root"
import { CurrentTurnActions, reducerCurrentTurn } from "./CurrentTurn/CurrentTurnReducer";
import { publicDataHelper } from "./PublicDataHelper";

interface LoadData {
    type: 'PUBLIC_DATA/LOAD_DATA',
    loadingId: string
}

interface LoadedData {
    type: 'PUBLIC_DATA/LOADED_DATA',
    loadingId: string,
    publicData: IPublicDataApiModel
}

export type PublicDataActions = LoadData | LoadedData;

export const reducerPublicData = (state: RootState, action: Action )
: RootState | undefined => {
    let newState = reducerCurrentTurn(state, action as CurrentTurnActions);
    if (newState != undefined)
        return newState;

    const publicDataAction = action as PublicDataActions;
    if (publicDataAction == undefined)
        return undefined; 

    switch (publicDataAction.type) {
        case "PUBLIC_DATA/LOAD_DATA":
            if (state.publicData.loadings.includes(publicDataAction.loadingId))
                return state;
            else {
                let newLoadings = state.publicData.loadings.slice();
                newLoadings.push(publicDataAction.loadingId);
                return {
                    ...state,
                    publicData: {
                        ...state.publicData,
                        loadings: newLoadings
                    }
                }
            }
        case "PUBLIC_DATA/LOADED_DATA":
            if (!state.publicData.loadings.includes(publicDataAction.loadingId))
                return state;
            publicDataHelper.update(state, publicDataAction.publicData);
            let newLoadings = state.publicData.loadings
                .filter(l => l != publicDataAction.loadingId);
            return {
                ...state,
                publicData: {
                    ...state.publicData,
                    loadings: newLoadings
                }
            }
    }

        
}