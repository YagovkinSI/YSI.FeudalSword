import * as React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import * as TestRequestStore from '../../store/Authorization';

const Profile : React.FC = () => {
    const appState = useSelector(state => state as ApplicationState);
  
    if (appState.authorization == undefined || 
        appState.authorization.isLoading || 
        appState.authorization.user == undefined)
        return (
            <h1>Загрузка...</h1>
        );    
    
    const createDate = new Date(appState.authorization.user.created);
    const activityDate = new Date(appState.authorization.user.lastActivity);

    return (
        <React.Fragment>
            <h1>Приветствую, {appState.authorization.user.userName}!</h1>
            <h3>Это страница твоего профиля, где можно посмотреть свои данные.</h3>
            <p>Сменить пароль или сделать иные дейтвия тут пока нельзя. Для этого обратитесь на прямую к администратору проекта.</p>
            
            <h3>Ваши данные:</h3>
            <p>Имя - {appState.authorization.user.userName}</p>
            <p>Дата создания аккаунта - {createDate.toLocaleString('ru-RU')}</p>
            <p>Дата последнего действия - {activityDate.toLocaleString('ru-RU')}</p>
            <p>Идентификатор в системе - {appState.authorization.user.id}</p>
        </React.Fragment>
    );
}

export default connect(
  (state: ApplicationState) => state.authorization, // Selects which state properties are merged into the component's props
  TestRequestStore.actionCreators // Selects which action creators are merged into the component's props
)(Profile as any); // eslint-disable-line @typescript-eslint/no-explicit-any
