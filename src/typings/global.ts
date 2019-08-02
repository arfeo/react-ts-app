// @ts-ignore
declare interface HashMap<T = any> {
  [key: string]: T;
}

interface Action<TType> extends HashMap {
  type: TType;
}

declare type Reducer<TStore, TType> = (state: TStore, action: Action<TType>) => TStore;

interface App {
  userName: string;
}
