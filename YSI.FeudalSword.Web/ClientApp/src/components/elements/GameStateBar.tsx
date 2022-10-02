import * as React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
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
                {getTurnString()}
            </Alert >
        )
    }
}

export default GameStateBar