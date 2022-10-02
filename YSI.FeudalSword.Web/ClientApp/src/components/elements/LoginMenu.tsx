import * as React from 'react';
import { Fragment } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';
import { ApplicationState } from '../../store';
import { navBarActionCreators } from '../../store/UserData/UI/NavBar/NavBarActionCreators';

const LoginMenu :  React.FC = () => {  
    const dispatch = useDispatch();   
    const appState = useSelector(state => state as ApplicationState);

    const isLoading = appState.root.userData.authorization.isBusy;
    const isAuthorized = !appState.root.userData.authorization.isBusy &&
        appState.root.userData.authorization.isChecked &&
        appState.root.userData.authorization.user != undefined;        
    const userName = appState.root.userData.authorization.user == undefined
        ? ''
        : appState.root.userData.authorization.user.userName;
    
    const loadingMenu = (
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
                    onClick={e => dispatch(navBarActionCreators.closeNavBarMenu())}>
                Здравствуй, {userName}
                </NavLink>
            </NavItem>            
            <NavItem>
                <NavLink 
                    tag={Link} 
                    className="text-dark" 
                    to="/logout"
                    onClick={e => dispatch(navBarActionCreators.closeNavBarMenu())}>
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
                    onClick={e => dispatch(navBarActionCreators.closeNavBarMenu())}>
                    Регистрация
                </NavLink>
            </NavItem>            
            <NavItem>
                <NavLink 
                    tag={Link} 
                    className="text-dark" 
                    to="/login" 
                    onClick={e => dispatch(navBarActionCreators.closeNavBarMenu())}>
                    Вход
                </NavLink>
            </NavItem>
        </Fragment>
    )

    if (isLoading) {
        return loadingMenu
    } else if (isAuthorized) {
        return authorizedMenu
    } else {
        return notAuthorizedMenu;
    }
}

export default LoginMenu;
