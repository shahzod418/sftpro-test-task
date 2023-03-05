import type { EntityId } from '@reduxjs/toolkit';

export enum Path {
  Main = '',
  Posts = 'posts',
  PostById = 'posts/:postId',
  Albums = 'albums',
  AlbumById = 'albums/:albumId',
  Todos = 'todos',
  Error = '*',
}

export const getPostByIdPath = (postId: EntityId): string => `/${Path.Posts}/${postId}`;
export const getAlbumByIdPath = (albumId: EntityId): string => `/${Path.Albums}/${albumId}`;
