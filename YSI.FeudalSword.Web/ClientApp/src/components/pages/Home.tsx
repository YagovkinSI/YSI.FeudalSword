import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';

const Home = () => (
  <div>
    <h1>Меч Феодала</h1>
    <h3>Добро пожаловать на страницу игры "Меч Феодала".</h3> 
    <p>В настоящий момент игра находится в разрботке, а следить за её разработкой удобнее в <a href='https://vk.com/club189975977'>Группе ВК</a></p>
    
    <p>Ближайшие планы:</p>
    <ul>
      <li>Уже готово - можно зарегистрировать свой профиль в проекте</li>
      <li>До конца августа - возможность выбрать одного из лордов под своё управление</li>
      <li>До конца сентября - возможность развивать владения лорда</li>
      <li>До конца октября - возможность воевать с другими лордами</li>
      <li>Ноябрь - Небольшоая тестовая игра на 10-20 игроков</li>
    </ul>
    
    <h3>Полезные ссылки по проекту:</h3>
    <ul>
      <li><a href='https://scs.u1331911.plsk.regruhosting.ru/swagger'>Swagger</a> - Swagger API сервера, можете пробовать сделать свой клиент к проекту</li>
      <li><a href='https://github.com/YagovkinSI/YSI.FeudalSword'>Код проекта на GitHub</a> пока в открытом доступе. Буду рад советам и замечаниям.</li>
      <li><a href='https://vk.com/topic-189975977_49044454'>Подробное описание процесса разработки</a> в группе ВК.</li>     
    </ul>
    <p></p>
    
  </div>
);

export default connect()(Home);
