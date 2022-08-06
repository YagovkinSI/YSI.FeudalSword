import * as React from 'react';
import { connect } from 'react-redux';

const Home = () => (
  <div>
    <h1>Меч Феодала</h1>
    <p>Добро пожаловать на страницу игры "Меч Феодала".</p> 
    <p>В настоящий момент игра находится в разрботке, а следить за её разработкой удобнее тут:</p>
    <ul>
      <li><a href='https://vk.com/club189975977'>Группа в ВК</a> ("Проклятье серебрянной короны" - это игра предшественник)</li>
    </ul>
  </div>
);

export default connect()(Home);
