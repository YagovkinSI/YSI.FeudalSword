import { ICurrentUser } from "../../models/ICurrentUser"

export interface AuthorizationState {
    isChecked: boolean,
    isBusy: boolean,
    error: string | undefined,
    user: ICurrentUser | undefined
}

export const defaultAuthorizationState : AuthorizationState = {
    isChecked: false,
    isBusy: false,
    error: undefined,
    user: undefined
}