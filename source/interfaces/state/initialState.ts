import type { SerializedError } from '@reduxjs/toolkit';

export type InitialState = {
  loadingStatus: string;
  error: SerializedError | null;
};
