import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as CounterStore from '../store/Counter';

type CounterProps =
    CounterStore.CounterState &
    typeof CounterStore.actionCreators &
    RouteComponentProps<{}>;

class Counter extends React.PureComponent<CounterProps> {
    public render() {
        return (
            <React.Fragment>
                <h1>Счётчик</h1>

                <p>Это простой пример компонента React.</p>

                <p aria-live="polite">Текущее значение: <strong>{this.props.count}</strong></p>

                <button type="button"
                    className="btn btn-primary btn-lg"
                    onClick={() => { this.props.increment(); }}>
                    Увеличить
                </button>
            </React.Fragment>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.counter,
    CounterStore.actionCreators
)(Counter);
