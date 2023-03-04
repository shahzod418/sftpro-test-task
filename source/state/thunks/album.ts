import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type { Album } from '@interfaces/state/album';
import type { EntityId } from '@reduxjs/toolkit';

export const fetchAlbums = createAsyncThunk('albums/fetchAlbums', async () => {
  const response = await axios.get<Album[]>('https://jsonplaceholder.typicode.com/albums');
  return response.data;
});

export const removeAlbum = createAsyncThunk('albums/removeAlbum', async (albumId: EntityId) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
  return albumId;
});
