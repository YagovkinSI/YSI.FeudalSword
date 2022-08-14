import * as React from 'react';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as Authorization from '../store/Authorization'

const Logout: React.FC = () => {    
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(Authorization.actionCreators.logout())
    });

    return (
        <div>
            <h1>Выход...</h1>
        </div>
    )
};

export default connect()(Logout);
