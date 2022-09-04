import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import * as Authorization from './Authorization';
import * as Characters from './Characters';
import * as LeftCanvasState from './UI/LeftCanvasState';
import * as WorldMapState from './UI/WorldMapState';

// The top-level state object
export interface ApplicationState {
    uiLeftCanvasState: LeftCanvasState.ILeftCanvasSate | undefined;
    uiWorldMapState: WorldMapState.IWorldMapState | undefined;

    counter: Counter.CounterState | undefined;
    weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined;
    authorization: Authorization.AuthorizationState | undefined;
    characters: Characters.CharactersState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    uiLeftCanvasState: LeftCanvasState.reducer,
    uiWorldMapState: WorldMapState.reducer,

    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    authorization: Authorization.reducer,
    characters: Characters.reducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
