import { LoadingStatus } from '@interfaces/state/loadingStatus';

import type { InitialState } from '@interfaces/state/initialState';

export const initialState: InitialState = {
  loadingStatus: LoadingStatus.Idle,
  error: null,
};
