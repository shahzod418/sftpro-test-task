import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type { Post, PostCreatePayload, PostUpdatePayload } from '@interfaces/state/post';
import type { EntityId } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (postId: number) => {
  const response = await axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  return response.data;
});

export const addPost = createAsyncThunk('posts/addPost', async (payload: PostCreatePayload) => {
  const response = await axios.post<Post>('https://jsonplaceholder.typicode.com/posts', payload);
  return response.data;
});

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (payload: PostUpdatePayload) => {
    const { postId, data } = payload;

    const response = await axios.patch<Post>(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      data,
    );
    return response.data;
  },
);

export const removePost = createAsyncThunk('posts/removePost', async (postId: EntityId) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  return postId;
});
