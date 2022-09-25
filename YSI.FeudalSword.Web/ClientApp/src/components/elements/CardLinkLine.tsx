import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { ApplicationState } from "../../store";
import { publicDataActionCreators } from "../../store/PublicData/PublicDataActionCreators";

export enum enCardLinkLineType {
    Character = 1,
    Army = 2
}

interface CardLinkLineProp {
    lineType: enCardLinkLineType,
    contentId: number
}

const getCharacterInfo = (
    appState : ApplicationState, 
    dispatch: Dispatch<any>, 
    characterId : number
) => {
    console.log(characterId);
    console.log(appState.root.publicData);
    const character = appState.root.publicData.characters
        .find(c => c.id == characterId);
    console.log(character);
    const dynasty = character == undefined
        ? undefined
        : appState.root.publicData.dynasties
            .find(c => c.id == character.dynastyId);
    console.log(dynasty);
    if (character == undefined || dynasty == undefined)  
    {
        dispatch(publicDataActionCreators.loadCharacter(characterId))
        return (<>
            <Spinner animation="border" role="status" size="sm"/>
            Загрузка...
        </>)
    }  
    else {
        const title = character.suzerainId == undefined
            ? 'Король'
            : 'Лорд';
        return `${title} ${character.name} ${dynasty.name}`;
    }   
}

const getInfo = (
    appState : ApplicationState, 
    dispatch: Dispatch<any>, 
    props : CardLinkLineProp
) => {
    switch (props.lineType) {
        case enCardLinkLineType.Character:
            return getCharacterInfo(appState, dispatch, props.contentId);
        default:
            return 'ОШИБКА: Неизвестый тип данных'
    }
}

const CardLinkLine : React.FC<CardLinkLineProp> = (props) => {
    const dispatch = useDispatch(); 
    const appState = useSelector(state => state as ApplicationState);
    
    const info = getInfo(appState, dispatch, props);

    return (
        <>
            {info} 
            <Button>...</Button>
        </>
    )
}

export default CardLinkLine;