import * as React from 'react';
import map1j from '../../svg/map1';
import {SVGMap} from 'react-svg-map';
import '../../svg/index.css';
import { leftCanvasActionCreators } from '../../store/Root/UserData/UI/MapPage/LeftCanvas/LeftCanvasActionCreators';
import { enContentType } from '../../store/Root/UserData/UI/MapPage/LeftCanvas/LeftCanvasState';
import { useDispatch } from 'react-redux';

const RegionMap :  React.FC = () => {
    const dispatch = useDispatch();   

    const click = (event: React.MouseEvent<HTMLElement>) => {
        const domainIdString = event.currentTarget.getAttribute('id');
        if (domainIdString == undefined || !domainIdString.includes('domain_'))
            return;
        
        const domainId = parseInt(domainIdString.replace('domain_', ''));
        dispatch(leftCanvasActionCreators.setContentForLeftCanvas(enContentType.Domain, domainId));
    }
    

    return (
        <SVGMap className='map' locationClassName='land' onLocationClick={click} map={map1j}></SVGMap> 
    );
};

export default RegionMap;
