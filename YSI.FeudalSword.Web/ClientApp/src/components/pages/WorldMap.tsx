import * as React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import * as Authorization from '../../store/Authorization';
import map1j from '../../svg/map1';
import {SVGMap} from 'react-svg-map';
import '../../svg/index.css';
import { useState } from 'react';
import * as CharactersStore from '../../store/Characters';
import { Card, Offcanvas, Spinner } from 'react-bootstrap';
import { ICharacter } from '../../models/ICharacter';
import CharacterCard from '../cards/CharacterCard';

const WorldMap :  React.FC = () => {
    const dispatch = useDispatch(); 
    const appState = useSelector(state => state as ApplicationState);
    
    const [currentTitleId, setCurrentTitleId] = useState(-1);
    const [showLeftCanvas, setShowLeftCanvas] = useState(false);
    const handleClose = () => setShowLeftCanvas(false);
    const handleShow = () => setShowLeftCanvas(true);
    
    React.useEffect(() => {
        dispatch(CharactersStore.actionCreators.getByTitle(currentTitleId))
    });

    const click = (event: React.MouseEvent<HTMLElement>) => {
        const domainIdString = event.currentTarget.getAttribute('id');
        if (domainIdString == undefined || !domainIdString.includes('domain_'))
            return;
        
        const domainId = parseInt(domainIdString.replace('domain_', ''));
        setCurrentTitleId(domainId);
        handleShow();
    }

    const renderCharacter = (appState : ApplicationState, currentTitleId : number) => {
        if (currentTitleId == -1 || appState.characters == undefined)
            return (<></>)

        const character = appState.characters.characters
            .find(c => c.titles.find(t => t.id == currentTitleId));

        if (character == undefined)
            return (             
                <Offcanvas.Body>
                    <Spinner animation="border" role="status" size="sm"/>   
                    Загрузка...                     
                </Offcanvas.Body>
            )
        else  
            return (                
                <Offcanvas.Body>
                    <CharacterCard {...character}/>   
                </Offcanvas.Body>
            )
    }

    return (
        <>
            <React.Fragment>            
                <SVGMap className='map' locationClassName='land' onLocationClick={click} map={map1j}></SVGMap>                
            </React.Fragment>

            <Offcanvas show={showLeftCanvas} onHide={handleClose} scroll={true} backdrop={false}>                
                    <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Управляет этим владением:</Offcanvas.Title>
                    </Offcanvas.Header>   
                    {renderCharacter(appState, currentTitleId)}
                </Offcanvas>
        </>
    );
};

export default connect(
    (state: ApplicationState) => state.authorization,
    Authorization.actionCreators
)(WorldMap);
