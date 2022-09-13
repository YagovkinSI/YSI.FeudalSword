import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../../store';
import * as TestRequestStore from '../../store/Characters';

const TestRequest : React.FC = () => {
  const dispatch = useDispatch(); 
  const appState = useSelector(state => state as ApplicationState);
  
  const pathName = useLocation().pathname;
  let indexString = pathName.replace('/test', '').replace('/', '');
  const index = parseInt(indexString, 10) || 1;

  React.useEffect(() => {
    dispatch(TestRequestStore.actionCreators.getByTitle(index))
  });

  const renderCurrentUser = () => {
    if (appState.characters == undefined || appState.characters.isLoading)
      return (
        <div>Загрузка...</div>
      )
    else if (appState.characters != undefined && appState.characters.error != '')
      return (
        <div>ОШИБКА! {appState.characters.error}</div>
      )
    else if (appState.characters != undefined && appState.characters.characters != undefined)
    {
      return (
        <div>
          <p>Загружено персонажей: {appState.characters.characters.length}</p>
          { 
            appState.characters.characters.map(c => 
              <div key={c.id}>
                <p>ID - {c.id}</p>
                <p>Имя - {c.name} {c.dynastyName}</p>
                <p>Статус - {c.userId == null ? 'Свободен' : 'Занят'}</p>
                <p>Титулы:</p>
                <ul>
                  { c.titles.map(t => 
                    <li key={t.id}>{t.name}</li>
                  )}
                </ul>                          
              </div>
              )
          }
        </div>
      );
    }      
  }

  return (
    <React.Fragment>
      <h1 id="tabelLabel">Тестирование запроса текущего пользователя</h1>
      {renderCurrentUser()}
      <Link className='btn btn-outline-secondary btn-sm' to={`/test/${index + 5}`}>Вдалец {index + 5}</Link>
      <Link className='btn btn-outline-secondary btn-sm' to={`/test/${index - 5}`}>Вдалец {index - 5}</Link>
    </React.Fragment>
  );
}

export default TestRequest;
