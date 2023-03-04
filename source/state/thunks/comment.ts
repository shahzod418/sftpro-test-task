import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type { Comment } from '@interfaces/state/comment';

export const fetchCommentsByPostId = createAsyncThunk(
  'comments/fetchCommentsByPostId',
  async (postId: number) => {
    const response = await axios.get<Comment[]>(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    );
    return response.data;
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number) => {
    await axios.delete<Comment>(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
    return commentId;
  },
);
