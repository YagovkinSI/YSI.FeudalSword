import * as React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../store';

const Profile : React.FC = () => {
    const appState = useSelector(state => state as ApplicationState);
    const currentUser = appState.privateData.user.currentUser;
    if (currentUser == undefined)
        return (
            <h1>Загрузка...</h1>
        );    
    
    const createDate = new Date(currentUser.created);
    const activityDate = new Date(currentUser.lastActivity);

    return (
        <React.Fragment>
            <h1>Приветствую, {currentUser.userName}!</h1>
            <h3>Это страница твоего профиля, где можно посмотреть свои данные.</h3>
            <p>Сменить пароль или сделать иные дейтвия тут пока нельзя. Для этого обратитесь на прямую к администратору проекта.</p>
            
            <h3>Ваши данные:</h3>
            <p>Имя - {currentUser.userName}</p>
            <p>Дата создания аккаунта - {createDate.toLocaleString('ru-RU')}</p>
            <p>Дата последнего действия - {activityDate.toLocaleString('ru-RU')}</p>
            <p>Идентификатор в системе - {currentUser.id}</p>
        </React.Fragment>
    );
}

export default Profile;
