import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Layout from './components/Layout';
import Home from './components/pages/Home';
import Counter from './components/pages/Counter';
import FetchData from './components/pages/FetchData';

import './custom.css'
import TestRequest from './components/pages/TestRequest';
import { useDispatch, useSelector } from 'react-redux';
import * as Authorization from './store/Authorization'
import { ApplicationState } from './store';
import LoginRegister from './components/pages/LoginRegister';
import Logout from './components/pages/Logout';
import Profile from './components/pages/Profile';
import WorldMap from './components/pages/WorldMap';

const App: React.FC = () => {
    const dispatch = useDispatch(); 

    React.useEffect(() => {
        dispatch(Authorization.actionCreators.getCurrentUser())
    });
    
    
    const appState = useSelector(state => state as ApplicationState);
    const isAuthorized = appState.authorization == undefined 
        ? false
        : appState.authorization.user != undefined;
        
        const authorizedPaths = (
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
                    <Route path='/test/:index?' component={TestRequest} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/map' component={WorldMap} />
                    <Redirect to='/' />
                </Switch>
            </Layout>
        )
    
        const notAuthorizedPaths = (
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
                    <Route path='/test/:index?' component={TestRequest} />
                    <Route path='/register' component={LoginRegister} />
                    <Route path='/login' component={LoginRegister} />
                    <Route path='/map' component={WorldMap} />
                    <Redirect to='/' />
                </Switch>
            </Layout>
        )
        
        return (
            isAuthorized 
                ? authorizedPaths        
                : notAuthorizedPaths
        )
} 


export default App;
