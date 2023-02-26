import { configureStore } from '@reduxjs/toolkit';

import commentsReducer from './slices/comments';
import postsReducer from './slices/posts';

export const store = configureStore({
  devTools: true,
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
