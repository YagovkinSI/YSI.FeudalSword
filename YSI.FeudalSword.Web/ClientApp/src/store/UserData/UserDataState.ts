import { AuthorizationState, defaultAuthorizationState } from "./Authorization/AuthorizationState"
import { defaultChatacterState, IUserChatacterState } from "./Character/UserChatacterState"

export interface UserDataState {
    authorization: AuthorizationState,
    character: IUserChatacterState
}

export const defaultUserDataState : UserDataState = {
    authorization: defaultAuthorizationState,
    character: defaultChatacterState
}

