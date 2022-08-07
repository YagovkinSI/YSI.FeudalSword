import { ICurrentUser } from "./ICurrentUser";

export interface ICheckAuthResponse {
    isAuthorized: boolean;
    user: ICurrentUser | undefined;
}