import * as React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { enTitleRank } from '../../models/IPublicDataApiModel';
import { ApplicationState } from '../../store';
import { publicDataActionCreators } from '../../store/Root/PublicData/Base/PublicDataActionCreators';
import { currentTurnActionCreators } from '../../store/Root/PublicData/CurrentTurn/CurrentTurnActionCreators';

const GameStateBar: React.FC = () => { 
    const dispatch = useDispatch();
    const appState = useSelector(state => state as ApplicationState);
    const currentTurn = appState.root.publicData.currentTurn;

    React.useEffect(() => {
        if (!appState.root.publicData.currentTurn.isChecked && 
            !appState.root.publicData.currentTurn.isBusy)
            dispatch(currentTurnActionCreators.getCurrentTurn());
    }); 

    const getTurnString = () : string => {
        const year = 694 - Math.floor(currentTurn.id / 4);
        const season = currentTurn.id % 4;
        let seasonString = '';
        switch (season) {
            case 1:
                seasonString = 'Весна';
                break;
            case 2:
                seasonString = 'Лето';
                break;
            case 3:
                seasonString = 'Осень';
                break;
            case 0:
            default:
                seasonString = 'Зима';
                break;

        }
        return `Ход ${currentTurn.id} (${seasonString} ${year} года до Завоевания Эйгона)`;
    }

    const getCommandString = () : string => {
        const characterId = !appState.root.userData.authorization.isBusy &&
            appState.root.userData.authorization.isChecked &&
            appState.root.userData.authorization.user != undefined &&
            !appState.root.userData.character.isBusy &&
            appState.root.userData.character.isChecked 
                ? appState.root.userData.character.characterId
                : undefined;
        if (characterId == undefined)
            return '';
        
        const commandLoaded = !appState.root.userData.commands.baseState.isBusy &&
            appState.root.userData.commands.baseState.isChecked;
        if (commandLoaded == false)
            return '';
        
        const targetDomainId = appState.root.userData.commands.data.targetDomainId;
        if (targetDomainId == undefined || targetDomainId == -1)
            return 'Приказ: Набор воинов';
        
        const targetTitle = appState.root.publicData.titles
            .find(t => t.rank == enTitleRank.Earl && t.capitalId == targetDomainId);
        if (targetTitle == undefined)
        {
            dispatch(publicDataActionCreators.loadDomain(targetDomainId));
            return '';
        }

        return `Приказ: Атака владения ${targetTitle.name}`;
    }
    
    if (!currentTurn.isChecked || currentTurn.isBusy) {
        return (
            <Alert key='info' variant='info'>
                <Spinner animation="border" role="status" size="sm"/>
                Загрузка...
            </Alert >
        )
    } else {
        return (
            <Alert key='info' variant='info'>
                <div>
                    {getTurnString()}
                </div>
                <div>
                    {getCommandString()}
                </div>
            </Alert >
        )
    }
}

export default GameStateBar