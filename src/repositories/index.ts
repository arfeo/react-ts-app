import { BaseRepository } from './BaseRepository';

import { AppRepository, AppRepositoryInterface } from './AppRepository';

export interface Repositories {
  AppRepository: AppRepositoryInterface;
}

export const Repositories = {
  AppRepository,
};

export { BaseRepository };
