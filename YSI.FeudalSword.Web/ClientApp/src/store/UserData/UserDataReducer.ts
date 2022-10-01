import { reducerAuthorization } from "./Authorization/AuthorizationReducer";
import { reducerUserCharacter } from "./Character/UserCharacterReducer";

export const userDataReducers = 
[ 
    reducerAuthorization, 
    reducerUserCharacter 
]