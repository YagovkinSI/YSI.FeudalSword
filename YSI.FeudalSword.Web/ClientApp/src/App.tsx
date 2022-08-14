import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';

import './custom.css'
import TestRequest from './components/TestRequest';
import { useDispatch, useSelector } from 'react-redux';
import * as Authorization from './store/Authorization'
import { ApplicationState } from './store';
import EmptyPage from './components/EmptyPage';
import LoginRegister from './components/LoginRegister';

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
                    <Route path='/test' component={TestRequest} />
                    <Route path='/logout' component={EmptyPage} />
                    <Route path='/profile' component={EmptyPage} />
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
                    <Route path='/test' component={TestRequest} />
                    <Route path='/register' component={LoginRegister} />
                    <Route path='/login' component={LoginRegister} />
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
