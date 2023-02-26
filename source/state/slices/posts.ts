import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import type { InitialState } from '@interfaces/state/initialState';
import type { Post } from '@interfaces/state/post';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (postId: number) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  return response.data;
});

const postsAdapter = createEntityAdapter<Post>();

const postsSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState<InitialState>({
    loadingStatus: 'idle',
    error: null,
  }),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        postsAdapter.addMany(state, action);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        postsAdapter.addOne(state, action);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export default postsSlice.reducer;
