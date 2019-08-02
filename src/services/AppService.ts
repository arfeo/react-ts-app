import { BaseService } from './BaseService';

import { Repositories } from '../repositories';

export interface AppServiceInterface {
  setUserName(userName: string): void;
  getUserName(): string;
}

type Injection = Pick<Repositories, 'AppRepository'>;

class AppService extends BaseService<Injection> implements AppServiceInterface {
  protected constructor() {
    super();

    this.inject = ['AppRepository'];
  }

  public setUserName(userName: string): void {
    return this.props.AppRepository.setUserName(userName);
  }

  public getUserName(): string {
    return this.props.AppRepository.getUserName();
  }
}

export { AppService };
