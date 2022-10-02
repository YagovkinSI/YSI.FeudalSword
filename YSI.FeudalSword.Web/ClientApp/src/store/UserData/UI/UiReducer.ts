import { reducerMapPage } from "./MapPage/MapPageReducer";
import { reducerNavBar } from "./NavBar/NavBarReducer";

export const uiReducers = 
[ 
    reducerNavBar, 
    ...reducerMapPage 
]