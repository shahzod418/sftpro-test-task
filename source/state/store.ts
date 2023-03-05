import { configureStore } from '@reduxjs/toolkit';

import albumsReducer from './slices/albums';
import commentsReducer from './slices/comments';
import commentsByPostReducer from './slices/commentsByPost';
import photosReducer from './slices/photos';
import photosByAlbumReducer from './slices/photosByAlbum';
import postsReducer from './slices/posts';
import todosReducer from './slices/todos';

export const store = configureStore({
  devTools: true,
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    commentsByPostIds: commentsByPostReducer,
    albums: albumsReducer,
    photos: photosReducer,
    photosByAlbumIds: photosByAlbumReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
