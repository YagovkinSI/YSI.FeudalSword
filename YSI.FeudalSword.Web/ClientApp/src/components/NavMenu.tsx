import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import LoginMenu from './elements/LoginMenu';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../store';
import { navBarActionCreators } from '../store/Root/UserData/UI/NavBar/NavBarActionCreators';

const NavMenu : React.FC = () => {
    const dispatch = useDispatch();
    const appState = useSelector(state => state as ApplicationState);
    
    const isOpen = appState.root.userData.ui.navBar.isOpen;

    const onClick = () => {
        dispatch(navBarActionCreators.toggleNavBar())
    }

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                <Container>
                    <NavbarBrand tag={Link} to="/">МЕЧ ФЕОДАЛА</NavbarBrand>
                    <NavbarToggler onClick={onClick} className="mr-2"/>
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={isOpen} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} onClick={onClick} className="text-dark" to="/">
                                    Главная
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} onClick={onClick} className="text-dark" to="/map">
                                    Карта
                                </NavLink>
                            </NavItem>
                            <LoginMenu/>
                        </ul>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default NavMenu;