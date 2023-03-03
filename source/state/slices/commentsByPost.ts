import { createSlice } from '@reduxjs/toolkit';

import { fetchCommentsByPostId } from '@state/thunks/comments';

import type { Comment } from '@interfaces/state/comments';
import type { PayloadAction } from '@reduxjs/toolkit';

const commentsByPostIdsSlice = createSlice({
  name: 'commentsByPostIds',
  initialState: { ids: [] as number[], entities: {} as { [key: number]: number[] } },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCommentsByPostId.fulfilled, (state, action: PayloadAction<Comment[]>) => {
      const postId = action.payload[0].postId;

      if (!state.ids.includes(postId)) {
        state.ids.push(postId);
      }
      state.entities[postId] = action.payload.map(({ id }) => id);
    });
  },
});

export default commentsByPostIdsSlice.reducer;
