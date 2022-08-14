import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import LoginMenu from './LoginMenu';

const NavMenu : React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const resetOpen = () => {
        setIsOpen(false)
    }
    
    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                <Container>
                    <NavbarBrand tag={Link} to="/">МЕЧ ФЕОДАЛА</NavbarBrand>
                    <NavbarToggler onClick={() => setIsOpen(!isOpen)} className="mr-2"/>
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={isOpen} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/">Главная</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/map">Карта</NavLink>
                            </NavItem>
                            <LoginMenu
                                resetOpen={resetOpen}>                                
                            </LoginMenu>
                        </ul>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default NavMenu;