import { ApplicationState } from "../..";
import { IResponse } from "../../../models/IResponse";
import { IUserPrivateState } from "../../PrivateData/User/state";
import * as RequestHelper from '../../RequsetService/Controllers/User'

const getPrivateUserData = async (appState: ApplicationState) 
: Promise<IResponse<IUserPrivateState>> => {
    const userPrivate = appState.privateData.user;
    if (!userPrivate.isChecked) {           
        appState.privateData.user.isChecked = true;
        const response = await RequestHelper.getCurrentUser(appState);
        return {
            data: response.data == undefined
                ? undefined
                : response.data.user,
            error: response.error,
            success: response.success
        } as IResponse<IUserPrivateState>
    }

    return {
        data: userPrivate,
        error: undefined,
        success: true
    } as IResponse<IUserPrivateState>;
} 

export const UserPrivateData = { getPrivateUserData }