import type { LoadingStatus } from './loadingStatus';
import type { SerializedError } from '@reduxjs/toolkit';

export type InitialState = {
  loadingStatus: LoadingStatus;
  error: SerializedError | null;
};
