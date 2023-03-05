import { createSlice } from '@reduxjs/toolkit';

import { removeAlbum } from '@state/thunks/album';
import { fetchPhotosByAlbumId, removePhoto } from '@state/thunks/photo';

import type { Photo } from '@interfaces/state/photo';
import type { EntityId, PayloadAction } from '@reduxjs/toolkit';

const photosByAlbumIdsSlice = createSlice({
  name: 'photosByAlbumIds',
  initialState: { ids: [] as EntityId[], entities: {} as { [key: EntityId]: EntityId[] } },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPhotosByAlbumId.fulfilled, (state, action: PayloadAction<Photo[]>) => {
        const albumId = action.payload[0].albumId;

        if (!state.ids.includes(albumId)) {
          state.ids.push(albumId);
        }
        state.entities[albumId] = action.payload.map(({ id }) => id);
      })
      .addCase(removePhoto.fulfilled, (state, action: PayloadAction<EntityId>) => {
        const photoId = action.payload;

        const albumId = Object.keys(state.entities).find(key =>
          state.entities[key].includes(photoId),
        );

        if (albumId) {
          const index = state.entities[albumId].findIndex(id => id === photoId);
          state.entities[albumId].splice(index, 1);
        }
      })
      .addCase(removeAlbum.fulfilled, (state, action: PayloadAction<EntityId>) => {
        const index = state.ids.findIndex(id => id === action.payload);

        state.ids.splice(index, 1);
        delete state.entities[action.payload];
      });
  },
});

export default photosByAlbumIdsSlice.reducer;
