import * as React from 'react';
import { Fragment } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';
import { ApplicationState } from '../store';

export interface LoginMenuProps {
    resetOpen: () => void;
}

const LoginMenu :  React.FC<LoginMenuProps> = ({resetOpen}) => {     
    const appState = useSelector(state => state as ApplicationState);

    const isLoading = appState.root.authorization.isBusy;
    const isAuthorized = !appState.root.authorization.isBusy &&
        appState.root.authorization.isChecked &&
        appState.root.authorization.user != undefined;        
    const userName = appState.root.authorization.user == undefined
        ? ''
        : appState.root.authorization.user.userName;
    
    const loadinMenu = (
        <Fragment>
            <NavItem>
                <NavLink className="text-dark">
                    <Spinner animation="border" role="status" size="sm"/>
                    Загрузка...
                </NavLink>
            </NavItem>
        </Fragment>
    )

    const authorizedMenu = (
        <Fragment>            
            <NavItem>
                <NavLink 
                    tag={Link} 
                    className="text-dark" 
                    to="/profile"
                    onClick={e => resetOpen()}>
                Здравствуй, {userName}
                </NavLink>
            </NavItem>            
            <NavItem>
                <NavLink 
                    tag={Link} 
                    className="text-dark" 
                    to="/logout"
                    onClick={e => resetOpen()}>
                    Выход
                </NavLink>
            </NavItem>
        </Fragment>
    )

    const notAuthorizedMenu = (
        <Fragment>          
            <NavItem>
                <NavLink 
                    tag={Link} 
                    className="text-dark" 
                    to="/register" 
                    onClick={e => resetOpen()}>
                    Регистрация
                </NavLink>
            </NavItem>            
            <NavItem>
                <NavLink 
                    tag={Link} 
                    className="text-dark" 
                    to="/login" 
                    onClick={e => resetOpen()}>
                    Вход
                </NavLink>
            </NavItem>
        </Fragment>
    )

    if (isLoading) {
        return loadinMenu
    } else if (isAuthorized) {
        return authorizedMenu
    } else {
        return notAuthorizedMenu;
    }
}

export default LoginMenu;
