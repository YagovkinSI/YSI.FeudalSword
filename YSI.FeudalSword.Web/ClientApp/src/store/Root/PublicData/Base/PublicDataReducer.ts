import { Action } from "redux";
import { IPublicDataApiModel } from "../../../../models/IPublicDataApiModel";
import { RootState } from "../../../Root"
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

export const reducerPublicData = (state: RootState, incomingAction: Action )
: RootState | undefined => {
    const action = incomingAction as PublicDataActions;
    if (action == undefined)
        return undefined; 

    switch (action.type) {
        case "PUBLIC_DATA/LOAD_DATA":
            if (state.publicData.loadings.includes(action.loadingId))
                return state;
            else {
                let newLoadings = state.publicData.loadings.slice();
                newLoadings.push(action.loadingId);
                return {
                    ...state,
                    publicData: {
                        ...state.publicData,
                        loadings: newLoadings
                    }
                }
            }
        case "PUBLIC_DATA/LOADED_DATA":
            if (!state.publicData.loadings.includes(action.loadingId))
                return state;
            publicDataHelper.update(state, action.publicData);
            let newLoadings = state.publicData.loadings
                .filter(l => l != action.loadingId);
            return {
                ...state,
                publicData: {
                    ...state.publicData,
                    loadings: newLoadings
                }
            }
    }  
}