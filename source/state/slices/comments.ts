import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import type { Comment } from '@interfaces/state/comments';
import type { InitialState } from '@interfaces/state/initialState';

export const fetchCommentsByPostId = createAsyncThunk(
  'comments/fetchCommentsByPostId',
  async (postId: number) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    );

    return { id: postId, data: response.data };
  },
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (payload: Omit<Comment, 'id'>) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/comments', payload);
    return response.data;
  },
);

export const editComment = createAsyncThunk('comments/editComment', async commentId => {
  const response = await axios.patch(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
  return response.data;
});

export const removeComment = createAsyncThunk('comments/removeComment', async commentId => {
  await axios.delete(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
  return { id: commentId };
});

const commentsAdapter = createEntityAdapter<Comment[]>();

const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentsAdapter.getInitialState<InitialState>({
    loadingStatus: 'idle',
    error: null,
  }),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        const postId = action.payload.id;

        if (!state.entities[postId]) {
          state.ids.push(postId);
          state.entities[postId] = action.payload.data;
        }

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
