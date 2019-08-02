import { Repositories } from '../repositories';
import { Services } from './';

interface BaseServiceInterface<T> {
  updateProps(injections: T): void;
}

type PossibleInjections = Repositories & Services;

class BaseService<TInjections extends Partial<PossibleInjections> = {}> implements BaseServiceInterface<TInjections> {
  public inject: (keyof TInjections)[] = [];
  protected props: TInjections = {} as any as TInjections;

  public updateProps(injections: TInjections): void {
    this.props = injections;
  }
}

export { BaseService };
