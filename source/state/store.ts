import { configureStore } from '@reduxjs/toolkit';

import commentsReducer from './slices/comments';
import commentsByPostIds from './slices/commentsByPost';
import postsReducer from './slices/posts';

export const store = configureStore({
  devTools: true,
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    commentsByPostIds: commentsByPostIds,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
