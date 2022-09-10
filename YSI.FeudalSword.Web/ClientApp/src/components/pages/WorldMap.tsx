import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import map1j from '../../svg/map1';
import {SVGMap} from 'react-svg-map';
import '../../svg/index.css';
import LeftCanvas from '../canvases/LeftCanvas';
import { mapPageActionCreators } from '../../store/UI/MapPage/actionCreators';
import { ApplicationState } from '../../store';

const WorldMap :  React.FC = () => {
    const dispatch = useDispatch(); 
    const appState = useSelector(state => state as ApplicationState);
    const state = appState.ui.mapPage;

    const onLocationClick = (event: React.MouseEvent<HTMLElement>) => {
        const domainIdString = event.currentTarget.getAttribute('id');
        if (domainIdString == undefined || !domainIdString.includes('domain_'))
            return;
        
        const domainId = parseInt(domainIdString.replace('domain_', ''));
        dispatch(mapPageActionCreators.onClickDomainOnMap(domainId));
    }    

    return (
        <>
            <React.Fragment>            
                <SVGMap 
                    className='map' 
                    locationClassName='land' 
                    onLocationClick={onLocationClick} 
                    map={map1j}>
                </SVGMap>                
            </React.Fragment>
            <LeftCanvas></LeftCanvas>
        </>
    );
};

export default WorldMap;
