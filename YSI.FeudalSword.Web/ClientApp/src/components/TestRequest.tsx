import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as TestRequestStore from '../store/AuthorizationState';

// At runtime, Redux will merge together...
type TestRequestProps =
TestRequestStore.AuthorizationState // ... state we've requested from the Redux store
  & typeof TestRequestStore.actionCreators // ... plus action creators we've requested

class TestRequest extends React.PureComponent<TestRequestProps> {
  // This method is called when the component is first added to the document
  public componentDidMount() {
    this.ensureDataFetched();
  }

  // This method is called when the route parameters change
  public componentDidUpdate() {
    this.ensureDataFetched();
  }

  public render() {
    return (
      <React.Fragment>
        <h1 id="tabelLabel">Тестирование запроса текущего пользователя</h1>
        {this.renderCurrentUser()}
      </React.Fragment>
    );
  }

  private ensureDataFetched() {
    this.props.getCurrentUser();
  }

  private renderCurrentUser() {
    if (this.props.isLoading)
      return (
        <div>Загрузка...</div>
      )
    else if (this.props.user == undefined)
      return (
        <div>Пользователь не авторизован</div>
      )
    else
      return (
        <div>
          <p>ID - {this.props.user.id}</p>
          <p>Имя - {this.props.user.userName}</p>
          <p>Аккаунт созда - {this.props.user.created}</p>
        </div>
      );
  }
}

export default connect(
  (state: ApplicationState) => state.authorization, // Selects which state properties are merged into the component's props
  TestRequestStore.actionCreators // Selects which action creators are merged into the component's props
)(TestRequest as any); // eslint-disable-line @typescript-eslint/no-explicit-any
