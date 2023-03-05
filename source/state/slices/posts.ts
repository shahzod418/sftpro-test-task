import { LoadingStatus } from '@interfaces/state/loadingStatus';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { pendingReducer } from '@state/reducers/pending';
import { rejectedReducer } from '@state/reducers/rejected';
import { addPost, fetchPostById, fetchPosts, removePost, updatePost } from '@state/thunks/post';

import { initialState } from '@constants/initialState';

import type { Post } from '@interfaces/state/post';
import type { EntityId, PayloadAction } from '@reduxjs/toolkit';

const postsAdapter = createEntityAdapter<Post>();

const postsSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        postsAdapter.addMany(state, action);
        state.loadingStatus = LoadingStatus.Idle;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<Post>) => {
        postsAdapter.addOne(state, action);
        state.loadingStatus = LoadingStatus.Idle;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        postsAdapter.addOne(state, action);
        state.loadingStatus = LoadingStatus.Idle;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        postsAdapter.setOne(state, action);
        state.loadingStatus = LoadingStatus.Idle;
        state.error = null;
      })
      .addCase(removePost.fulfilled, (state, action: PayloadAction<EntityId>) => {
        postsAdapter.removeOne(state, action);
        state.loadingStatus = LoadingStatus.Idle;
        state.error = null;
      })

      .addCase(fetchPosts.pending, pendingReducer)
      .addCase(fetchPostById.pending, pendingReducer)
      .addCase(addPost.pending, pendingReducer)
      .addCase(updatePost.pending, pendingReducer)
      .addCase(removePost.pending, pendingReducer)

      .addCase(fetchPosts.rejected, rejectedReducer)
      .addCase(fetchPostById.rejected, rejectedReducer)
      .addCase(addPost.rejected, rejectedReducer)
      .addCase(updatePost.rejected, rejectedReducer)
      .addCase(removePost.rejected, rejectedReducer);
  },
});

export default postsSlice.reducer;
