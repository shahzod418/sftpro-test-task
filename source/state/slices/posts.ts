import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { fetchPostById, fetchPosts } from '@state/thunks/posts';

import type { InitialState } from '@interfaces/state/initialState';
import type { Post } from '@interfaces/state/post';
import type { PayloadAction } from '@reduxjs/toolkit';

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
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        postsAdapter.addMany(state, action);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<Post>) => {
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
