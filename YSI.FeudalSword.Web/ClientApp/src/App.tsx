import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Layout from './components/Layout';
import Home from './components/pages/Home';

import './custom.css'
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from './store';
import LoginRegister from './components/pages/LoginRegister';
import Logout from './components/pages/Logout';
import Profile from './components/pages/Profile';
import { authorizationActionCreators } from './store/UserData/Authorization/AuthorizationActionCreators';
import MapPage from './components/pages/MapPage';
import { userCharacterActionCreators } from './store/UserData/Character/UserCharacterActionCreators';

const App: React.FC = () => {
    const dispatch = useDispatch(); 
    const appState = useSelector(state => state as ApplicationState);

    const isAuthorized = !appState.root.userData.authorization.isBusy &&
        appState.root.userData.authorization.isChecked &&
        appState.root.userData.authorization.user != undefined;

    React.useEffect(() => {
        if (!appState.root.userData.authorization.isBusy &&
            !appState.root.userData.authorization.isChecked)
            dispatch(authorizationActionCreators.getCurrentUser());
        if (appState.root.userData.authorization.user != undefined &&
            !appState.root.userData.character.isBusy &&
            !appState.root.userData.character.isChecked)
            dispatch(userCharacterActionCreators.getUserCharacter());
    });    
        
    const authorizedPaths = () => {
        return (
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/map' component={MapPage} />
                    <Redirect to='/' />
                </Switch>
            </Layout>
        )
    }

    const notAuthorizedPaths = () => {
        return (
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/register' component={LoginRegister} />
                    <Route path='/login' component={LoginRegister} />
                    <Route path='/map' component={MapPage} />
                    <Redirect to='/' />
                </Switch>
            </Layout>
        )
    }
    
    return isAuthorized 
        ? authorizedPaths()        
        : notAuthorizedPaths()
    
} 


export default App;
