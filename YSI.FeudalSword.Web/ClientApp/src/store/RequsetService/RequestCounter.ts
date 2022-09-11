import { ApplicationState } from "..";

export const TryToAddRequest = (appState : ApplicationState, request : string) : boolean => {
    if (appState.privateData.currentRequests.requests.includes(request))
        return false;
    
    appState.privateData.currentRequests.requests.push(request);
    return true; 
}

export const RemoveRequest = (appState : ApplicationState, request : string) => {    
    appState.privateData.currentRequests.requests = 
        appState.privateData.currentRequests.requests.filter(r => r != request);
    return true; 
}