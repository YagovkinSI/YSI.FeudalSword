import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { navBarActionCreators } from '../../store/UI/NavBar/actionCreators';

const Logout: React.FC = () => {    
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(navBarActionCreators.logout())
    });

    return (
        <div>
            <h1>Выход...</h1>
        </div>
    )
};

export default Logout;
