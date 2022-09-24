import * as React from 'react';
import '../../svg/index.css';
import RegionMap from '../elements/RegionMap';
import LeftCanvas from '../elements/LeftCanvas';

const MapPage :  React.FC = () => {
    return (
        <>
            <RegionMap />
            <LeftCanvas />
        </>
    );
};

export default MapPage;
