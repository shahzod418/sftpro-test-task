import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { fetchCommentsByPostId } from '@state/thunks/comments';

import type { Comment } from '@interfaces/state/comments';
import type { InitialState } from '@interfaces/state/initialState';
import type { PayloadAction } from '@reduxjs/toolkit';

const commentsAdapter = createEntityAdapter<Comment>();

const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentsAdapter.getInitialState<InitialState>({
    loadingStatus: 'idle',
    error: null,
  }),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPostId.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        commentsAdapter.addMany(state, action);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export default commentsSlice.reducer;
