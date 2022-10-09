import { BaseState, defaultBaseState } from "../../Base"

export interface IUserCommandsState {
    baseState: BaseState,
    targetDomainId: number | undefined
}

export const defaultUserCommandsState : IUserCommandsState = {
    baseState: defaultBaseState,
    targetDomainId: undefined
}

