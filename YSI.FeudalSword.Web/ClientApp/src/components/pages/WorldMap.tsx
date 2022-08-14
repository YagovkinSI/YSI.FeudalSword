import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as Authorization from '../../store/Authorization';
import map1 from '../../svg/map1.svg';
import map1j from '../../svg/map1';
import {SVGMap} from 'react-svg-map';
import '../../svg/index.css';

const WorldMap :  React.FC = () => {
    const click = (event: React.MouseEvent<HTMLElement>) => {
        console.log(event.target);
    }

    return (
        <React.Fragment>
            <SVGMap className='map' locationClassName='land' onLocationClick={click} map={map1j}></SVGMap>
        </React.Fragment>
    );
};

export default connect(
    (state: ApplicationState) => state.authorization,
    Authorization.actionCreators
)(WorldMap);
