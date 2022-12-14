import * as React from 'react';
import { Container } from 'reactstrap';
import ErrorField from './elements/ErrorField';
import GameStateBar from './elements/GameStateBar';
import NavMenu from './NavMenu';

export interface LayoutProps {
    children?: React.ReactNode;
}

const Layout : React.FC<LayoutProps> = ({children}) => {
    return (
        <React.Fragment>
            <NavMenu />
            <GameStateBar />
            <ErrorField />
            <Container>
                {children}
            </Container>
        </React.Fragment>
    );
}

export default Layout;