import * as React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../store';
import * as TestRequestStore from '../store/AuthorizationState';

const TestRequest : React.FC = () => {
  const dispatch = useDispatch(); 
  const appState = useSelector(state => state as ApplicationState);
  
  React.useEffect(() => {
    dispatch(TestRequestStore.actionCreators.getCurrentUser())
  });

  const renderCurrentUser = () => {
    if (appState.authorization == undefined || appState.authorization.isLoading)
      return (
        <div>Загрузка...</div>
      )
    else if (appState.authorization != undefined && appState.authorization.error != '')
      return (
        <div>ОШИБКА! {appState.authorization.error}</div>
      )
    else if (appState.authorization != undefined && appState.authorization.user != undefined)
      return (
        <div>
          <p>ID - {appState.authorization.user.id}</p>
          <p>Имя - {appState.authorization.user.userName}</p>
          <p>Аккаунт созда - {appState.authorization.user.created}</p>
        </div>
      );
    else
      return (
        <div>Пользователь не авторизован</div>
      )
  }

  return (
    <React.Fragment>
      <h1 id="tabelLabel">Тестирование запроса текущего пользователя</h1>
      {renderCurrentUser()}
    </React.Fragment>
  );
}

export default connect(
  (state: ApplicationState) => state.authorization, // Selects which state properties are merged into the component's props
  TestRequestStore.actionCreators // Selects which action creators are merged into the component's props
)(TestRequest as any); // eslint-disable-line @typescript-eslint/no-explicit-any
