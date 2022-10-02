import { publicDataReducers } from "./PublicData";
import { defaultPublicDataState, PublicDataState } from "./PublicData";
import { defaultUserDataState, userDataReducers, UserDataState } from "./UserData";

export interface RootState {   
    userData: UserDataState, 
    publicData: PublicDataState
}

export const defaultRootState: RootState = {
    userData: defaultUserDataState,
    publicData: defaultPublicDataState
};

export const rootChildReducers = [
    ...publicDataReducers, 
    ...userDataReducers
]