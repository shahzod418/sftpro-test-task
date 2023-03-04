import { configureStore } from '@reduxjs/toolkit';

import albumsReducer from './slices/albums';
import commentsReducer from './slices/comments';
import commentsByPostIds from './slices/commentsByPost';
import postsReducer from './slices/posts';

export const store = configureStore({
  devTools: true,
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    commentsByPostIds: commentsByPostIds,
    albums: albumsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
