import * as React from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../store';

const ErrorField: React.FC = () => { 
    const appState = useSelector(state => state as ApplicationState);
    const error : string = appState.authorization == undefined 
        ? ''
        : appState.authorization.error;
    
    if (error === null || error === '') {
        return (
            <>
            </>
        )
    } else {
        return (
            <Alert key='danger' variant='danger'>
                ОШИБКА: {error}
            </Alert >
        )
    }
}

export default ErrorField