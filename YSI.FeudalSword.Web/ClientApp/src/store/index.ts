import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import * as Characters from './Characters';
import * as UiState from './UI/ui';
import * as PrivateData from './PrivateData/privateData';

// The top-level state object
export interface ApplicationState {
    ui: UiState.IUiState;
    privateData: PrivateData.IPrivateDataState;

    counter: Counter.CounterState | undefined;
    weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined;
    characters: Characters.CharactersState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    ui: UiState.reducer,
    privateData: PrivateData.reducer,

    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    characters: Characters.reducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
