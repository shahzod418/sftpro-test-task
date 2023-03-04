import type { EntityId } from '@reduxjs/toolkit';

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type PostCreatePayload = Omit<Post, 'id'>;

export type PostUpdatePayload = {
  postId: EntityId;
  data: PostCreatePayload;
};
