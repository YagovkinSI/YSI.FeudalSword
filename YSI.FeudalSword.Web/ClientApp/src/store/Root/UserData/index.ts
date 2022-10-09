import { getDefaultBaseState, IBaseState } from "../Base"
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
    commands: IBaseState<IUserCommandsState>,     
    ui: UiState
}

export const defaultUserDataState : UserDataState = {
    authorization: defaultAuthorizationState,
    character: defaultChatacterState,
    commands: getDefaultBaseState(defaultUserCommandsState),
    ui: defaultUiState
}

export const userDataReducers = 
[ 
    reducerAuthorization, 
    reducerUserCharacter,
    reducerUserCommands,
    ...uiReducers, 
]

