import { reducerAuthorization } from "./Authorization/AuthorizationReducer"
import { AuthorizationState, defaultAuthorizationState } from "./Authorization/AuthorizationState"
import { reducerUserCharacter } from "./Character/UserCharacterReducer"
import { defaultChatacterState, IUserChatacterState } from "./Character/UserChatacterState"
import { reducerUserCommands } from "./Commads/UserCommandsReducer"
import { defaultUserCommandsState, IUserCommandsState } from "./Commads/UserCommandsState"
import { uiReducers } from "./UI"
import { defaultUiState, UiState } from "./UI"

export interface UserDataState {
    authorization: AuthorizationState,
    character: IUserChatacterState,  
    commands: IUserCommandsState,     
    ui: UiState
}

export const defaultUserDataState : UserDataState = {
    authorization: defaultAuthorizationState,
    character: defaultChatacterState,
    commands: defaultUserCommandsState,
    ui: defaultUiState
}

export const userDataReducers = 
[ 
    reducerAuthorization, 
    reducerUserCharacter,
    reducerUserCommands,
    ...uiReducers, 
]

