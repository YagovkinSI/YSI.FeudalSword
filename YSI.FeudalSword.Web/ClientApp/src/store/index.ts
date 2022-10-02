import { Action, Reducer } from 'redux';
import { defaultRootState, rootChildReducers, RootState } from './Root';

export interface ApplicationState {
    root: RootState;
}

export const reducer: Reducer<RootState> = (
    state: RootState = defaultRootState,
    action: Action
): RootState => {
    let newState : RootState | undefined = undefined;
    rootChildReducers.forEach(currentReducer  => {
        if (newState != undefined)
            return newState;        
        newState = currentReducer(state, action);
    });
    if (newState != undefined)
        return newState;
    return state;
};

export const reducers = {
    root: reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
