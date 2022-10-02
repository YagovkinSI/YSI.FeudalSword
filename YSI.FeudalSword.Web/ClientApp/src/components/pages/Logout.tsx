import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authorizationActionCreators } from '../../store/Root/UserData/Authorization/AuthorizationActionCreators';

const Logout: React.FC = () => {    
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(authorizationActionCreators.logout())
    });

    return (
        <div>
            <h1>Выход...</h1>
        </div>
    )
};

export default Logout;
