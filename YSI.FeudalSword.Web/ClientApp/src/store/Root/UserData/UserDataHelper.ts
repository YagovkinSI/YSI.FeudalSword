import { Dispatch } from "redux"
import { ApplicationState } from "../.."
import { authorizationActionCreators } from "./Authorization/AuthorizationActionCreators";
import { userCharacterActionCreators } from "./Character/UserCharacterActionCreators";
import { userCommandsActionCreators } from "./Commads/UserCommandsActionCreators";


const checkUserData = (appState : ApplicationState, dispatch: Dispatch<any> ) => {
    if (!appState.root.userData.authorization.isBusy &&
        !appState.root.userData.authorization.isChecked)
        dispatch(authorizationActionCreators.getCurrentUser());
    else if (appState.root.userData.authorization.user != undefined &&
        !appState.root.userData.character.isBusy &&
        !appState.root.userData.character.isChecked)
        dispatch(userCharacterActionCreators.getUserCharacter());
    else if (appState.root.userData.character.characterId != undefined &&
        !appState.root.userData.commands.baseState.isBusy &&
        !appState.root.userData.commands.baseState.isChecked)
        dispatch(userCommandsActionCreators.getUserCommands());
}

export const userDataHelper = { checkUserData }