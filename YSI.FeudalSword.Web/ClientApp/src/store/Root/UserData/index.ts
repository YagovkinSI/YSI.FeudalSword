import { reducerAuthorization } from "./Authorization/AuthorizationReducer"
import { AuthorizationState, defaultAuthorizationState } from "./Authorization/AuthorizationState"
import { reducerUserCharacter } from "./Character/UserCharacterReducer"
import { defaultChatacterState, IUserChatacterState } from "./Character/UserChatacterState"
import { uiReducers } from "./UI"
import { defaultUiState, UiState } from "./UI"

export interface UserDataState {
    authorization: AuthorizationState,
    character: IUserChatacterState,    
    ui: UiState
}

export const defaultUserDataState : UserDataState = {
    authorization: defaultAuthorizationState,
    character: defaultChatacterState,
    ui: defaultUiState
}

export const userDataReducers = 
[ 
    reducerAuthorization, 
    reducerUserCharacter,
    ...uiReducers, 
]

