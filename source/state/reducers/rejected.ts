import { LoadingStatus } from '@interfaces/state/loadingStatus';

import type { InitialState } from '@interfaces/state/initialState';
import type { PayloadAction } from '@reduxjs/toolkit';

export const rejectedReducer = (
  state: InitialState,
  action: PayloadAction<unknown, string, unknown, InitialState['error']>,
): void => {
  state.loadingStatus = LoadingStatus.Failed;
  state.error = action.error;
};
