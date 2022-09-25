import { Action, Reducer } from "redux";
import { ApplicationState, AppThunkAction } from ".";
import axios from "axios";
import GetErrorMessage from "../helpers/ServerErrorParserHepler";
import { ICharacter } from "../models/ICharacter";
import { ICheckMyCharacter } from "../models/ICheckMyCharacter";

export interface CharactersState {
    isLoading: boolean;
    loadingTitle: number[];
    loadingMy: number; //0 - нет, 1 - в процессе, 2 - успешно, 3 - неудача
    characters : ICharacter[];
    error: string;
}

const unloadedState: CharactersState = { 
    isLoading: false,
    loadingTitle: [],
    loadingMy: 0,
    characters: [],
    error: ''
};

interface LoadingAction {
    type: 'LOADING';
    loadingTitle: number | undefined;
    loadingMy: boolean | undefined;
}

interface ReceiveAction {
    type: 'RECEIVE';
    characters: ICharacter[];
    loadingTitle: number | undefined;
    loadingMy: boolean | undefined;
}

interface ErrorAction {
    type: 'ERROR';
    error: string;
    loadingTitle: number | undefined;
    loadingMy: boolean | undefined;
}

type KnownAction = LoadingAction | ReceiveAction | ErrorAction;

const isValidRequestGetByTitle =(titleId: number, appState : ApplicationState) => {
    return titleId > 0 &&
        appState != undefined && 
        appState.characters != undefined &&
        (!appState.characters.isLoading || !appState.characters.loadingTitle.includes(titleId)) &&
        !appState.characters.characters
            .find(c => c.titles.find(t => t.id == titleId))
}

const getByTitle = (titleId: number): AppThunkAction<KnownAction> => async (dispatch, getState) => {
    const appState = getState();
    if (!isValidRequestGetByTitle(titleId, appState) || appState.characters == undefined)
        return;
    let characters = appState.characters.characters;

    dispatch({ 
        type: 'LOADING',
        loadingTitle: titleId,
        loadingMy: undefined
    });
    console.log('Character/getByTitle');
    await axios.get('Character/getByTitle', { params: { titleId } })
        .then(response => {
            console.log('response Character/getByTitle', response);
            characters.push(response.data as ICharacter);
            dispatch({ 
                type: 'RECEIVE', 
                characters: characters,
                loadingTitle: titleId,
                loadingMy: undefined
            })}           
        )
        .catch(error => {
            console.log('error Character/getByTitle', error);
            dispatch({
                type: 'ERROR', 
                error: GetErrorMessage(error),
                loadingTitle: titleId,
                loadingMy: undefined
            })
        });
}

const getMyCharacter = (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
    const appState = getState();
    if (!(appState != undefined && 
        appState.characters != undefined && 
        appState.root.authorization.user != undefined &&
        appState.characters.loadingMy == 0))
        return;
    let characters = appState.characters.characters;

    dispatch({ 
        type: 'LOADING',
        loadingTitle: undefined,
        loadingMy: true
    });
    console.log('Character/getMyCharacter');
    await axios.get('Character/getMyCharacter')
        .then(response => {
            console.log('response Character/getMyCharacter', response);
            var check = response.data as ICheckMyCharacter;
            if (check.hasCharacter && check.character != undefined)
                characters.push(check.character);
            dispatch({ 
                type: 'RECEIVE', 
                characters: characters,
                loadingTitle: undefined,
                loadingMy: true
            })}           
        )
        .catch(error => {
            console.log('error Character/getByTitle', error);
            dispatch({
                type: 'ERROR', 
                error: GetErrorMessage(error),
                loadingTitle: undefined,
                loadingMy: true
            })
        });
}

const takeContol = (characterId : number): AppThunkAction<KnownAction> => async (dispatch, getState) => {
    const appState = getState();
    if (!(appState != undefined && 
        appState.characters != undefined && 
        appState.root.authorization.user != undefined &&
        appState.characters.loadingMy == 2))
        return;
    const currentUser = appState.root.authorization.user;

    let characters = appState.characters.characters;
    let character = characters.find(c => c.id == characterId);
    if (character == undefined)
        return;

    dispatch({ 
        type: 'LOADING',
        loadingTitle: undefined,
        loadingMy: true
    });
    await axios.get('Character/takeControl', { params: { characterId } })
        .then(response => {
            console.log('response Character/takeControl', response);
            if (character == undefined)
                return;
            character.userId = currentUser.id;
            character.userName = currentUser.userName;
            character.userLastActivity = currentUser.lastActivity;
            dispatch({ 
                type: 'RECEIVE', 
                characters: characters,
                loadingTitle: undefined,
                loadingMy: true
            })}           
        )
        .catch(error => {
            console.log('error Character/takeСontrol', error);
            dispatch({
                type: 'ERROR', 
                error: GetErrorMessage(error),
                loadingTitle: undefined,
                loadingMy: true
            })
        });
}

export const actionCreators = { getByTitle, getMyCharacter, takeContol };

export const reducer: Reducer<CharactersState> = (
    state: CharactersState | undefined, 
    incomingAction: Action
): CharactersState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'LOADING':
            if (action.loadingTitle != undefined && !state.loadingTitle.includes(action.loadingTitle))
                state.loadingTitle.push(action.loadingTitle)
            if (action.loadingMy)
                state.loadingMy = 1
            return {
                ...state, 
                error: '',
                isLoading: true
            };
        case 'RECEIVE':
            if (action.loadingTitle != undefined && state.loadingTitle.includes(action.loadingTitle))
                state.loadingTitle.filter(t => t == action.loadingTitle)
            if (action.loadingMy && state.loadingMy)
                state.loadingMy = 2
            return {
                ...state, 
                isLoading: false,
                error: '',
                characters: action.characters
            };
        case 'ERROR':
            if (action.loadingTitle != undefined && state.loadingTitle.includes(action.loadingTitle))
                state.loadingTitle.filter(t => t == action.loadingTitle)
            if (action.loadingMy && state.loadingMy)
                state.loadingMy = 0
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
    }
    
    return state;
};