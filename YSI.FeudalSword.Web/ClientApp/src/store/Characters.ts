import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import axios from "axios";
import GetErrorMessage from "../helpers/ServerErrorParserHepler";
import { ICharacter } from "../models/ICharacter";

export interface CharactersState {
    isLoading: boolean;
    loadingTitle: number | undefined;
    characters : ICharacter[];
    error: string;
}

const unloadedState: CharactersState = { 
    isLoading: false,
    loadingTitle: undefined,
    characters: [],
    error: ''
};

interface LoadingAction {
    type: 'LOADING';
    loadingTitle: number
}

interface ReceiveAction {
    type: 'RECEIVE';
    characters: ICharacter[];
}

interface ErrorAction {
    type: 'ERROR';
    error: string;
}

type KnownAction = LoadingAction | ReceiveAction | ErrorAction;

const getByTitle = (titleId: number): AppThunkAction<KnownAction> => async (dispatch, getState) => {
    const appState = getState();
    if (!appState || 
        appState.characters == undefined ||
        (appState.characters.isLoading && appState.characters.loadingTitle == titleId) ||
        appState.characters.characters
            .find(c => c.titles.find(t => t.id == titleId)))
        return;
    let characters = appState.characters.characters;

    dispatch({ 
        type: 'LOADING',
        loadingTitle: titleId
    });
    console.log('Character/getByTitle');
    await axios.get('Character/getByTitle', { params: { titleId } })
        .then(response => {
            console.log('response Character/getByTitle', response);
            characters.push(response.data as ICharacter);
            dispatch({ 
                type: 'RECEIVE', 
                characters: characters
            })}           
        )
        .catch(error => {
            console.log('error Character/getByTitle', error);
            dispatch({
                type: 'ERROR', 
                error: GetErrorMessage(error)
            })
        });
    
        console.log(appState);
}

export const actionCreators = { getByTitle };

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
            return {
                ...state, 
                error: '',
                loadingTitle: action.loadingTitle,
                isLoading: true
            };
        case 'RECEIVE':
            return {
                ...state, 
                isLoading: false,
                error: '',
                characters: action.characters
            };
        case 'ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
    }
    
    return state;
};