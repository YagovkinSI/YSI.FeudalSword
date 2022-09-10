import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import '../../svg/index.css';
import { Offcanvas, Spinner } from 'react-bootstrap';
import CharacterCard from '../cards/CharacterCard';
import { mapPageActionCreators } from '../../store/UI/MapPage/actionCreators';
import { ILeftCanvasState } from '../../store/UI/MapPage/state';
import { enLeftCanvasContentType } from '../../store/UI/MapPage/enums';

const LeftCanvas :  React.FC = () => {
    const dispatch = useDispatch(); 
    const appState = useSelector(state => state as ApplicationState);
    const state = appState.ui.mapPage.leftCanvas;

    const onHide = () => {
        dispatch(mapPageActionCreators.hideLeftCanvas())
    }
    
    const renderLoading = () => {
        return (
            <>
                <Spinner animation="border" role="status" size="sm"/> 
                ЗАГРУЗКА
            </>
        )     
    }

    const renderError = () => {
        return (
            <>
                ОШИБКА: {state.error != undefined && state.error !=''
                    ? state.error
                    : state.contentType == enLeftCanvasContentType.None
                        ? 'Не задан тип контента'
                        : state.contentId == undefined
                            ? 'Не задан идентификатор объекта'
                            : 'Неивестная ошибка'}
            </>
        )
    }
    
    const renderCharacter = (characterId : number) => {
        return (
            <>                       
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Персонаж:</Offcanvas.Title>
                </Offcanvas.Header>        
                <Offcanvas.Body>
                    <CharacterCard characterId={characterId}/> 
                </Offcanvas.Body>
            </> 
        )
    }

    const renderContent = (state : ILeftCanvasState) => {
        if (state.isLoading) {
            return renderLoading()          
        }             
        else if (state.error != undefined || 
            state.contentType == enLeftCanvasContentType.None || 
            state.contentId == undefined) {
                return renderError()
        }
        else {
            switch (state.contentType) {
                case enLeftCanvasContentType.Character:
                    return renderCharacter(state.contentId);
                default:
                    return <>ОШИБКА: Неизвестный тип контента</>
            }
        }        
    }

    return (
        <Offcanvas show={state.show} onHide={onHide} scroll={true} backdrop={false}>             
            {renderContent(state)}
        </Offcanvas>
    )
};

export default LeftCanvas;
