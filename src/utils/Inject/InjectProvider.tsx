import * as React from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { assign, pick, reduce } from 'lodash';

import { BaseRepository, Repositories } from '../../repositories';
import { BaseService, Services } from '../../services';

import { StoreInterface } from '../../store/reducers';

interface StoreProps {
  store: StoreInterface;
}

type Props = StoreProps & { dispatch: Dispatch<any> };

type InitRepositories = Record<keyof Repositories, BaseRepository>;

type InitServices = Record<keyof Services, BaseService>;

export interface Injectables {
  repositories: InitRepositories;
  services: InitServices;
}

export const InjectContext: React.Context<Partial<Injectables['services']>> = React.createContext({});

const enhancer = compose(
  withRouter,
  connect<any>(
    (store: {}): { store: {} } => ({ store }),
    (dispatch: {}): { dispatch: {} } => ({ dispatch }),
  ),
);

class InjectProviderComponent extends React.PureComponent<Props, Injectables> {
  private static getDerivedStateFromProps(props: Props, prevState: Injectables): Partial<Injectables> {
    const repositories: InitRepositories = InjectProviderComponent.updateRepositories(prevState.repositories, props);
    const services: InitServices = InjectProviderComponent.updateServices(prevState.services, repositories);

    return {
      services,
      repositories,
    };
  }

  private static updateRepositories(repositories: InitRepositories, props: Props): InitRepositories {
    return reduce(repositories, (acc: InitRepositories, repository: BaseRepository, key: string): InitRepositories => {
      repository.updateProps(props.store);

      return assign(acc, { [key]: repository });
    }, {} as any as InitRepositories);
  }

  private static updateServices(services: InitServices, repositories: InitRepositories): InitServices {
    return reduce(services, (acc: InitServices, service: BaseService, key: string, current: InitServices): InitServices => {
      const injections = pick(assign({}, repositories, current), service.inject);

      service.updateProps(injections);

      return assign(acc, { [key]: service });
    }, {} as any as InitServices);
  }

  public state: Injectables = {
    repositories: this.initRepositories(),
    services: this.initServices(),
  };

  private initRepositories(): InitRepositories {
    const { dispatch } = this.props;

    return reduce(Repositories, (acc: InitRepositories, Repository: any, key: string): InitRepositories => {
      return assign(acc, { [key]: new Repository(dispatch) });
    }, {} as any as InitRepositories);
  }

  private initServices(): InitServices {
    return reduce(Services, (acc: InitServices, Service: any, key: string): InitServices => {
      return assign(acc, { [key]: new Service() });
    }, {} as any as InitServices);
  }

  public render(): React.ReactElement {
    return (
      <InjectContext.Provider value={this.state.services}>
        {this.props.children}
      </InjectContext.Provider>
    );
  }
}

export const InjectProvider = enhancer(InjectProviderComponent) as React.JSXElementConstructor<any>;
