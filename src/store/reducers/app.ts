import { AppActions } from '../../constants/actions/app';

import { applyDefaultState } from '../../utils/common';

const app: Reducer<App | null | undefined, AppActions> = (state = null, action): App | null => {
  switch (action.type) {
    case AppActions.SET_USER_NAME: {
      return action.payload;
    }
    default: {
      return applyDefaultState(action.type, state);
    }
  }
};

export { app };
