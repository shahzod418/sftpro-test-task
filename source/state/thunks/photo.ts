import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type { Photo } from '@interfaces/state/photo';

export const fetchPhotosByAlbumId = createAsyncThunk(
  'photos/fetchPhotosByAlbumId',
  async (albumId: number) => {
    const response = await axios.get<Photo[]>(
      `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`,
    );
    return response.data;
  },
);

export const removePhoto = createAsyncThunk('photos/removePhoto', async (photoId: number) => {
  await axios.delete<void>(`https://jsonplaceholder.typicode.com/photos/${photoId}`);
  return photoId;
});
