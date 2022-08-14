import * as React from 'react';
import { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ApplicationState } from '../../store';
import * as WeatherForecastsStore from '../../store/WeatherForecasts';

const FetchData :  React.FC = () => {  
  const dispatch = useDispatch(); 
  const appState = useSelector(state => state as ApplicationState);

  const pathName = useLocation().pathname;
  let startDateIndexString = pathName.replace('/fetch-data', '').replace('/', '');
  const startDateIndex = parseInt(startDateIndexString, 10) || 0;

  useEffect(() => {
    dispatch(WeatherForecastsStore.actionCreators.requestWeatherForecasts(startDateIndex))
  });

  const renderForecastsTable = () => {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Теспература. (C)</th>
            <th>Теспература. (F)</th>
            <th>По ощущениям</th>
          </tr>
        </thead>
        <tbody>
          { 
            appState.weatherForecasts != undefined
            ?
            appState.weatherForecasts.forecasts.map((forecast: WeatherForecastsStore.WeatherForecast) =>
              <tr key={forecast.date}>
                <td>{forecast.date}</td>
                <td>{forecast.temperatureC}</td>
                <td>{forecast.temperatureF}</td>
                <td>{forecast.summary}</td>
              </tr>)
            :
            <div></div>
          }
        </tbody>
      </table>
    );
  }

  const renderPagination = () => {
    return (
      <div className="d-flex justify-content-between">
        <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${startDateIndex - 5}`}>Назад</Link>
        {(appState.weatherForecasts == undefined || appState.weatherForecasts.isLoading) && 
          <span>Загрузка...</span>
        }
        <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${startDateIndex + 5}`}>Вперёд</Link>
      </div>
    );
  }  

  return (  
    <React.Fragment>
      <h1 id="tabelLabel">Тест загрузки данных с сервера</h1>
      <p>Этот компонент демонстрирует получение данных с сервера и работу с параметрами URL.</p>
      {renderForecastsTable()}
      {renderPagination()}
    </React.Fragment>
  );
}

export default connect(
  (state: ApplicationState) => state.weatherForecasts, // Selects which state properties are merged into the component's props
  WeatherForecastsStore.actionCreators // Selects which action creators are merged into the component's props
)(FetchData as any); // eslint-disable-line @typescript-eslint/no-explicit-any
