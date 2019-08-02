import * as React from 'react';
import { pick } from 'lodash';

import { Injectables, InjectContext } from './InjectProvider';

import { Services } from '../../services';

type InjectReturn<T> = (Component: React.ComponentType<any>) => React.ComponentType<T>;

const Inject = <TInjections extends Partial<Services>, TNeededProps>(inject: (keyof TInjections)[]): InjectReturn<TNeededProps> => (Component: React.ComponentType<any>): React.ComponentType<TNeededProps> => {
  class WithInjections extends React.Component<TNeededProps> {
    public static displayName = `Inject(${Component.displayName || Component.name})`;

    private injectDependencies = (injections: Partial<Injectables['services']>): React.ReactNode => {
      return <Component {...this.props} {...pick(injections, inject)} />;
    };

    public render(): React.ReactElement {
      return <InjectContext.Consumer>{this.injectDependencies}</InjectContext.Consumer>;
    }
  }

  return WithInjections;
};

export { Inject };
