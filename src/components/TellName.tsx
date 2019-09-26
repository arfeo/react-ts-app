import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { Inject } from '../utils/Inject/Inject';

import { Services } from '../services';

import styles from './styles.module.scss';

type Props = Pick<Services, 'AppService'>;

interface State {
  userName: string;
  isSubmitted: boolean;
}

class TellNameComponent extends React.Component<Props, State> {
  public state: State = {
    userName: '',
    isSubmitted: false,
  };

  private onUserNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ userName: e.target.value });
  };

  private onUserNameSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    const { userName } = this.state;

    e.preventDefault();

    this.props.AppService.setUserName(userName);

    this.setState({ isSubmitted: !!userName });
  };

  public render(): React.ReactElement {
    const { isSubmitted } = this.state;

    if (isSubmitted) {
      return <Redirect to="/hi"/>;
    }

    return (
      <div className={styles.container}>
        <form onSubmit={this.onUserNameSubmit} className={styles.form}>
          <label htmlFor="userName">Tell your name:</label>
          <input id="userName" type="text" onChange={this.onUserNameChange}/>
          <button type="submit">Say hi</button>
        </form>
      </div>
    );
  }
}

export const TellName = Inject<Props, {}>(['AppService'])(TellNameComponent);
