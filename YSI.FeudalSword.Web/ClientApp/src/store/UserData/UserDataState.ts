import { defaultChatacterState, IUserChatacterState } from "./Character/UserChatacterState"

export interface UserDataState {
    character: IUserChatacterState
}

export const defaultUserDataState : UserDataState = {
    character: defaultChatacterState
}

