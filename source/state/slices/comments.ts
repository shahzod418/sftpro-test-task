import { LoadingStatus } from '@interfaces/state/loadingStatus';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { pendingReducer } from '@state/reducers/pending';
import { rejectedReducer } from '@state/reducers/rejected';
import { fetchCommentsByPostId, removeComment } from '@state/thunks/comment';
import { removePost } from '@state/thunks/post';

import { initialState } from '@constants/initialState';

import type { Comment } from '@interfaces/state/comment';
import type { EntityId, PayloadAction } from '@reduxjs/toolkit';

const commentsAdapter = createEntityAdapter<Comment>();

const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPostId.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        commentsAdapter.addMany(state, action);
        state.loadingStatus = LoadingStatus.Idle;
        state.error = null;
      })
      .addCase(removeComment.fulfilled, (state, action: PayloadAction<EntityId>) => {
        commentsAdapter.removeOne(state, action);
        state.loadingStatus = LoadingStatus.Idle;
        state.error = null;
      })

      .addCase(removePost.fulfilled, (state, action: PayloadAction<EntityId>) => {
        const commentToRemoveIds = state.ids.reduce((acc: EntityId[], postId) => {
          if (state.entities[postId]?.postId === action.payload) {
            return [...acc, postId];
          }
          return acc;
        }, []);

        commentsAdapter.removeMany(state, commentToRemoveIds);
      })

      .addCase(fetchCommentsByPostId.pending, pendingReducer)
      .addCase(removeComment.pending, pendingReducer)

      .addCase(fetchCommentsByPostId.rejected, rejectedReducer)
      .addCase(removeComment.rejected, rejectedReducer);
  },
});

export default commentsSlice.reducer;
