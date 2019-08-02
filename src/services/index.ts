import { BaseService } from './BaseService';

import { AppService, AppServiceInterface } from './AppService';

export interface Services {
  AppService: AppServiceInterface;
}

export const Services = {
  AppService,
};

export { BaseService };
