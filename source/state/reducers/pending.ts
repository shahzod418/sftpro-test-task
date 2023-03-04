import { LoadingStatus } from '@interfaces/state/loadingStatus';

import type { InitialState } from '@interfaces/state/initialState';

export const pendingReducer = (state: InitialState): void => {
  state.loadingStatus = LoadingStatus.Loading;
};
