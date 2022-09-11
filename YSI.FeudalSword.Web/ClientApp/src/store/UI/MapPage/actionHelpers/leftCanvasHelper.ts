import { ApplicationState } from "../../..";
import { enLeftCanvasContentType } from "../enums";
import { MapPageAction } from "../reducer";
import { PublicDataService } from "../../../DataService/dataService";

const showLeftCanvasWithCharacterLoading = (
    dispatch : (action: MapPageAction) => void
) => {
    dispatch({
        type: 'SHOW_LEFT_CANVAS',
        contentId: undefined,
        contentType: enLeftCanvasContentType.Character,
        error: undefined,
        isLoading: true
    })
}

export const showOwnerOfDomain = (
    appState : ApplicationState,
    dispatch : (action: MapPageAction) => void,
    domainId : number
) => {
    showLeftCanvasWithCharacterLoading(dispatch);
    PublicDataService.CharactersPublicData.getCharacterIdByDomainId(appState, domainId)
        .then(response => {
            dispatch({
                type: 'SHOW_LEFT_CANVAS',
                contentId: response.data,
                contentType: enLeftCanvasContentType.Character,
                error: response.error,
                isLoading: false
            })
        });
}