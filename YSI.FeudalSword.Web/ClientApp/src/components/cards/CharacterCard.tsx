import React from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { enTitleRank } from "../../models/IPublicDataApiModel";
import { ApplicationState } from "../../store";
import { publicDataActionCreators } from "../../store/Root/PublicData/Base/PublicDataActionCreators";
import { characterCardHelper } from "../../store/Root/UserData/UI/MapPage/LeftCanvas/Helpers/CharacterCardHelper";
import { userCharacterActionCreators } from "../../store/Root/UserData/Character/UserCharacterActionCreators";
import CardLinkLine, { enCardLinkLineType } from "../elements/CardLinkLine";

const CharacterCard : React.FC = () => {
    const dispatch = useDispatch();
    const appState = useSelector(state => state as ApplicationState);

    const characterId = appState.root.userData.ui.mapPage.leftCanvas.contentId;    
    if (characterId == undefined)
        return ( <>ОШИБКА: Не определен идентификатор персонажа.</> )
    
    const state = characterCardHelper.checkDataForCharacter(appState.root, characterId);
    React.useEffect(() => {
        if (!state)
            dispatch(publicDataActionCreators.loadCharacter(characterId))
    });

    if (!state)
        return (
            <>
                <Spinner animation="border" role="status" size="sm"/>
                Загрузка...
            </>
        )
    
    const title = state.character.suzerainId == undefined
        ? 'Король'
        : 'Лорд';

    const lastName = state.dynasty == undefined
        ? ''
        : state.dynasty.name;
    
    const userName = state.user == undefined
        ? 'НЕ ЗАНЯТ ИГРОКОМ'
        : state.user.userName;

    const canTakeCharacter = appState.root.userData.authorization.user != undefined &&
        appState.root.userData.character.isChecked && 
        appState.root.userData.character.characterId == undefined &&
        state.user == undefined;
    
    const isUserCharacter = appState.root.userData.authorization.user != undefined &&
    appState.root.userData.character.isChecked && 
    appState.root.userData.character.characterId == characterId;

    const takeCharacter = () => {
        dispatch(userCharacterActionCreators.takeCharacter(characterId))
    }

    return (
        <Card style={{ margin: 'auto' }}>
            <Card.Body>
                <Card.Title>{title} {state.character.name} {lastName}</Card.Title>
                <h6>Игрок: { isUserCharacter ? `Ваш персонаж, ${userName}` :  userName}</h6>
                { canTakeCharacter
                    ? 
                        <Button 
                            onClick={takeCharacter}>
                            ВЫБРАТЬ ЭТОГО ПЕРСОНАЖА
                        </Button>
                    : <></>
                }
                <h6>Кол-во воинов: {state.character.warriorCount}</h6>
                <h6>Владения:</h6>
                {state.titles
                    .filter(t => t.rank == enTitleRank.Earl)
                    .map(title => {
                        return (<CardLinkLine 
                            key={title.id}
                            lineType={enCardLinkLineType.Domain} 
                            contentId = {title.capitalId}
                        />)  
                    })}
            </Card.Body>
        </Card>
    )
}

export default CharacterCard; 