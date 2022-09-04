import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import '../../svg/index.css';
import * as LeftCanvasState from '../../store/UI/LeftCanvasState';
import { Offcanvas } from 'react-bootstrap';
import CharacterCard from '../cards/CharacterCard';

const LeftCanvas :  React.FC = () => {
    const dispatch = useDispatch(); 
    const appState = useSelector(state => state as ApplicationState);
    const state = appState.uiLeftCanvasState;

    const onHide = () => {
        dispatch(LeftCanvasState.actionCreators.hide())
    }    

    const renderContent = (state : LeftCanvasState.ILeftCanvasSate | undefined) => {
        const contentType = state == undefined
            ? LeftCanvasState.enLeftCanvasContentType.None
            : state.contentType;
        const contentId = state == undefined
            ? 0
            : state.contentId;
        if (contentId == undefined)
            return <>ОШИБКА</>
        switch (contentType){
            case LeftCanvasState.enLeftCanvasContentType.None:
                return <></>
            case LeftCanvasState.enLeftCanvasContentType.Character:
                return (  
                    <>                       
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Персонаж:</Offcanvas.Title>
                        </Offcanvas.Header>        
                        <Offcanvas.Body>
                            <CharacterCard characterId={contentId}/> 
                        </Offcanvas.Body>
                    </>    
                )
        }
    }

    const show = state != undefined && state.show;
    return (
        <Offcanvas show={show} onHide={onHide} scroll={true} backdrop={false}>             
            {renderContent(state)}
        </Offcanvas>
    )
};

export default LeftCanvas;
