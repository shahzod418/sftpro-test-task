import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type { Post } from '@interfaces/state/post';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (postId: number) => {
  const response = await axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  return response.data;
});
