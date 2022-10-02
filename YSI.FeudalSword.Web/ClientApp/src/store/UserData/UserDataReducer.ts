import { reducerAuthorization } from "./Authorization/AuthorizationReducer";
import { reducerUserCharacter } from "./Character/UserCharacterReducer";
import { uiReducers } from "./UI/UiReducer";

export const userDataReducers = 
[ 
    ...uiReducers, 
    reducerAuthorization, 
    reducerUserCharacter 
]