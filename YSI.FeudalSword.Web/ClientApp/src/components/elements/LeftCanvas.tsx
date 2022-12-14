import * as React from 'react';
import { Offcanvas, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import { leftCanvasActionCreators } from '../../store/Root/UserData/UI/MapPage/LeftCanvas/LeftCanvasActionCreators';
import { enContentType } from '../../store/Root/UserData/UI/MapPage/LeftCanvas/LeftCanvasState';
import CharacterCard from '../cards/CharacterCard';
import DomainCard from '../cards/DomainCard';

const LeftCanvas :  React.FC = () => {    
    const dispatch = useDispatch();
    const appState = useSelector(state => state as ApplicationState);

    let state = appState.root.userData.ui.mapPage.leftCanvas;
    const handleClose = () => { 
        dispatch(leftCanvasActionCreators.closeLeftCanvasMenu())
    };

    const contentTypeString = () : string => {
        switch (state.contentType) {
            case enContentType.Domain:
                return "Владение";
            case enContentType.Character:
                return "Персонаж";
            case enContentType.Army:
                return "Армия";
            default:
                return "Неизвестный тип контента";
        }
    }
    
    const renderContent = () => {
        if (appState.root.userData.ui.mapPage.leftCanvas.isBusy != undefined)
         return (
            <>
                <Spinner animation="border" role="status" size="sm"/>
                Загрузка...
            </>
        )
        else if (appState.root.userData.ui.mapPage.leftCanvas.error != undefined)
            return (
                <>
                    ОШИБКА: {appState.root.userData.ui.mapPage.leftCanvas.error}
                </>
        )
        else {
            switch (state.contentType) {                
                case enContentType.Domain:
                    return (<DomainCard/>);
                case enContentType.Character:
                    return (<CharacterCard/>);
                case enContentType.Army:
                    return (<>//TODO</>);
                default:
                    return (<>//TODO</>);
            }
        }        
    }

    return (
        <Offcanvas show={state.isOpen} onHide={handleClose} scroll={true} backdrop={false}>                
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{contentTypeString()}</Offcanvas.Title>
            </Offcanvas.Header>   
            <Offcanvas.Body>
                { renderContent() } 
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default LeftCanvas;
