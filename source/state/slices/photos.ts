import { LoadingStatus } from '@interfaces/state/loadingStatus';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { pendingReducer } from '@state/reducers/pending';
import { rejectedReducer } from '@state/reducers/rejected';
import { removeAlbum } from '@state/thunks/album';
import { fetchPhotosByAlbumId, removePhoto } from '@state/thunks/photo';

import { initialState } from '@constants/initialState';

import type { Photo } from '@interfaces/state/photo';
import type { EntityId, PayloadAction } from '@reduxjs/toolkit';

const photosAdapter = createEntityAdapter<Photo>();

const photosSlice = createSlice({
  name: 'photos',
  initialState: photosAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPhotosByAlbumId.fulfilled, (state, action: PayloadAction<Photo[]>) => {
        photosAdapter.addMany(state, action);
        state.loadingStatus = LoadingStatus.Idle;
        state.error = null;
      })
      .addCase(removePhoto.fulfilled, (state, action: PayloadAction<EntityId>) => {
        photosAdapter.removeOne(state, action);
        state.loadingStatus = LoadingStatus.Idle;
        state.error = null;
      })

      .addCase(removeAlbum.fulfilled, (state, action: PayloadAction<EntityId>) => {
        const commentToRemoveIds = state.ids.reduce((acc: EntityId[], albumId) => {
          if (state.entities[albumId]?.albumId === action.payload) {
            return [...acc, albumId];
          }
          return acc;
        }, []);

        photosAdapter.removeMany(state, commentToRemoveIds);
      })

      .addCase(fetchPhotosByAlbumId.pending, pendingReducer)
      .addCase(removePhoto.pending, pendingReducer)

      .addCase(fetchPhotosByAlbumId.rejected, rejectedReducer)
      .addCase(removePhoto.rejected, rejectedReducer);
  },
});

export default photosSlice.reducer;
