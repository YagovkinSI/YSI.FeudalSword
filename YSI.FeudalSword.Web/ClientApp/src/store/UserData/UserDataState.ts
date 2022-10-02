import { AuthorizationState, defaultAuthorizationState } from "./Authorization/AuthorizationState"
import { defaultChatacterState, IUserChatacterState } from "./Character/UserChatacterState"
import { defaultUiState, UiState } from "./UI/UiState"

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

