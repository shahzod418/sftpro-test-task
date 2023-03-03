import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type {
  Comment,
  CommentCreatePayload,
  CommentUpdatePayload,
} from '@interfaces/state/comments';

export const fetchCommentsByPostId = createAsyncThunk(
  'comments/fetchCommentsByPostId',
  async (postId: number) => {
    const response = await axios.get<Comment[]>(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    );
    return response.data;
  },
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (payload: CommentCreatePayload) => {
    const response = await axios.post<Comment>(
      'https://jsonplaceholder.typicode.com/comments',
      payload,
    );
    return response.data;
  },
);

export const editComment = createAsyncThunk(
  'comments/editComment',
  async (payload: CommentUpdatePayload) => {
    const { commentId, data } = payload;

    const response = await axios.patch<Comment>(
      `https://jsonplaceholder.typicode.com/comments/${commentId}`,
      data,
    );
    return response.data;
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number) => {
    await axios.delete<Comment>(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
    return { id: commentId };
  },
);
