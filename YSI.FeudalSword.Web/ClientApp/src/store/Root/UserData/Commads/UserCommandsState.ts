export interface IUserCommandsState {
    isChecked: boolean,
    isBusy: boolean,
    error: string | undefined,
    targetDomainId: number | undefined
}

export const defaultUserCommandsState : IUserCommandsState = {
    isChecked: false,
    isBusy: false,
    error: undefined,
    targetDomainId: undefined
}

