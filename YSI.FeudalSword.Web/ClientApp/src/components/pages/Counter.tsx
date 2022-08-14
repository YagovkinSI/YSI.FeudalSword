import * as React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as CounterStore from '../../store/Counter';

const Counter :  React.FC = () => {
    const [count, setCount] = useState(0);

    return (
        <React.Fragment>
            <h1>Счётчик</h1>

            <p>Это простой пример компонента React.</p>

            <p aria-live="polite">Текущее значение: <strong>{count}</strong></p>

            <button type="button"
                className="btn btn-primary btn-lg"
                onClick={() => { setCount(count + 1); }}>
                Увеличить
            </button>
        </React.Fragment>
    );
};

export default connect(
    (state: ApplicationState) => state.counter,
    CounterStore.actionCreators
)(Counter);
