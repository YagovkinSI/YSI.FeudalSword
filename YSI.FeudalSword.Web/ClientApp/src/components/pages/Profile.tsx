import * as React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../store';

const Profile : React.FC = () => {
    const appState = useSelector(state => state as ApplicationState);
  
    if (appState.root.userData.authorization.isBusy || 
        appState.root.userData.authorization.user == undefined)
        return (
            <h1>Загрузка...</h1>
        );    
    
    const createDate = new Date(appState.root.userData.authorization.user.created);
    const activityDate = new Date(appState.root.userData.authorization.user.lastActivity);

    return (
        <React.Fragment>
            <h1>Приветствую, {appState.root.userData.authorization.user.userName}!</h1>
            <h3>Это страница твоего профиля, где можно посмотреть свои данные.</h3>
            <p>Сменить пароль или сделать иные дейтвия тут пока нельзя. Для этого обратитесь на прямую к администратору проекта.</p>
            
            <h3>Ваши данные:</h3>
            <p>Имя - {appState.root.userData.authorization.user.userName}</p>
            <p>Дата создания аккаунта - {createDate.toLocaleString('ru-RU')}</p>
            <p>Дата последнего действия - {activityDate.toLocaleString('ru-RU')}</p>
            <p>Идентификатор в системе - {appState.root.userData.authorization.user.id}</p>
        </React.Fragment>
    );
}

export default Profile;
