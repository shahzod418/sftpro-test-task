import { LoadingStatus } from '@interfaces/state/loadingStatus';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { pendingReducer } from '@state/reducers/pending';
import { rejectedReducer } from '@state/reducers/rejected';
import { fetchAlbumById, fetchAlbums, removeAlbum } from '@state/thunks/album';

import type { Album } from '@interfaces/state/album';
import type { InitialState } from '@interfaces/state/initialState';
import type { EntityId, PayloadAction } from '@reduxjs/toolkit';

const albumsAdapter = createEntityAdapter<Album>();

const albumsSlice = createSlice({
  name: 'posts',
  initialState: albumsAdapter.getInitialState<InitialState>({
    loadingStatus: LoadingStatus.Idle,
    error: null,
  }),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAlbums.fulfilled, (state, action: PayloadAction<Album[]>) => {
        albumsAdapter.addMany(state, action);
        state.loadingStatus = LoadingStatus.Idle;
        state.error = null;
      })
      .addCase(fetchAlbumById.fulfilled, (state, action: PayloadAction<Album>) => {
        albumsAdapter.addOne(state, action);
        state.loadingStatus = LoadingStatus.Idle;
        state.error = null;
      })
      .addCase(removeAlbum.fulfilled, (state, action: PayloadAction<EntityId>) => {
        albumsAdapter.removeOne(state, action);
        state.loadingStatus = LoadingStatus.Idle;
        state.error = null;
      })

      .addCase(fetchAlbums.pending, pendingReducer)
      .addCase(fetchAlbumById.pending, pendingReducer)
      .addCase(removeAlbum.pending, pendingReducer)

      .addCase(fetchAlbums.rejected, rejectedReducer)
      .addCase(fetchAlbumById.rejected, rejectedReducer)
      .addCase(removeAlbum.rejected, rejectedReducer);
  },
});

export default albumsSlice.reducer;
