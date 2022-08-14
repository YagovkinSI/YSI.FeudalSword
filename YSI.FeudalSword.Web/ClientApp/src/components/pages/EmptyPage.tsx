import * as React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { ApplicationState } from '../../store';
import * as Authorization from '../../store/Authorization';

const EmptyPage :  React.FC = () => {
    const pathName = useLocation().pathname;

    return (
        <React.Fragment>
            <h1>Страница {pathName} пока не досутпна</h1>
        </React.Fragment>
    );
};

export default connect(
    (state: ApplicationState) => state.authorization,
    Authorization.actionCreators
)(EmptyPage);
