export interface IUserChatacterState {
    isChecked: boolean,
    isBusy: boolean,
    error: string | undefined,
    characterId: number | undefined
}

export const defaultChatacterState : IUserChatacterState = {
    isChecked: false,
    isBusy: false,
    error: undefined,
    characterId: undefined
}

