import { createSlice } from '@reduxjs/toolkit';

import { fetchCommentsByPostId, removeComment } from '@state/thunks/comment';
import { removePost } from '@state/thunks/post';

import type { Comment } from '@interfaces/state/comment';
import type { EntityId, PayloadAction } from '@reduxjs/toolkit';

const commentsByPostIdsSlice = createSlice({
  name: 'commentsByPostIds',
  initialState: { ids: [] as EntityId[], entities: {} as { [key: EntityId]: EntityId[] } },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPostId.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        const postId = action.payload[0].postId;

        if (!state.ids.includes(postId)) {
          state.ids.push(postId);
        }
        state.entities[postId] = action.payload.map(({ id }) => id);
      })
      .addCase(removeComment.fulfilled, (state, action: PayloadAction<EntityId>) => {
        const commentId = action.payload;

        const postId = Object.keys(state.entities).find(key =>
          state.entities[key].includes(commentId),
        );

        if (postId) {
          const index = state.entities[postId].findIndex(id => id === commentId);
          state.entities[postId].splice(index, 1);
        }
      })
      .addCase(removePost.fulfilled, (state, action: PayloadAction<EntityId>) => {
        const index = state.ids.findIndex(id => id === action.payload);

        state.ids.splice(index, 1);
        delete state.entities[action.payload];
      });
  },
});

export default commentsByPostIdsSlice.reducer;
