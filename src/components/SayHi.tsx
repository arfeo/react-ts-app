import * as React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import { Inject } from '../utils/Inject/Inject';

import { Services } from '../services';

import styles from './styles.module.scss';

type Props = Pick<Services, 'AppService'>;

const SayHiComponent: React.FunctionComponent<Props> = (props: Props): React.ReactElement => {
  const userName: string = props.AppService.getUserName();

  const renderHiUsername = (): React.ReactElement => {
    return (
      <div className={styles.container}>
        <div className={styles.hi}>Hi, {userName}!</div>
        <Link to="/">Back</Link>
      </div>
    );
  };

  const renderRedirect = (): React.ReactElement => <Redirect to="/" />;

  return userName ? renderHiUsername() : renderRedirect();
};

export const SayHi = Inject<Props, {}>(['AppService'])(SayHiComponent);
