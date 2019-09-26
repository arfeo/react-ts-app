import { Dispatch } from 'redux';

import { HttpDataSource } from '../utils/HttpDataSource';

import { StoreInterface } from '../store/reducers';

interface RepositoryBaseInterface<TProps> {
  updateProps(store: StoreInterface): void;
  mapStoreToProps(store: StoreInterface): TProps;
}

class BaseRepository<TProps extends {} = {}> implements RepositoryBaseInterface<TProps> {
  protected props: TProps | undefined;
  protected dispatch: Dispatch<any>;
  protected http: HttpDataSource;

  protected constructor(dispatch: Dispatch<any>) {
    this.dispatch = dispatch;
    this.http = new HttpDataSource();
  }

  public updateProps(store: StoreInterface): void {
    this.props = this.mapStoreToProps(store);
  }

  public mapStoreToProps(store: StoreInterface): TProps {
    return {} as any as TProps;
  }
}

export { BaseRepository };
