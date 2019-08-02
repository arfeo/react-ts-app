import { BaseRepository } from './BaseRepository';

import { AppActions } from '../constants/actions/app';

import { StoreInterface } from '../store/reducers';

export interface AppRepositoryInterface {
  setUserName(userName: string): void;
  getUserName(): string;
}

interface StoreProps {
  app: App;
}

class AppRepository extends BaseRepository<StoreProps> implements AppRepositoryInterface {
  public mapStoreToProps(store: StoreInterface): StoreProps {
    return { app: store.app };
  }

  public setUserName(userName: string): void {
    this.dispatch({ type: AppActions.SET_USER_NAME, payload: { userName } });
  }

  public getUserName(): string {
    return this.props && this.props.app ? this.props.app.userName : '';
  }
}

export { AppRepository };
