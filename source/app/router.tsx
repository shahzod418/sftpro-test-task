import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Album from '@pages/Album';
import Albums from '@pages/Albums';
import ErrorPage from '@pages/Error';
import MainPage from '@pages/Main';
import Post from '@pages/Post';
import Posts from '@pages/Posts';
import Todos from '@pages/Todos';

import { Path } from '@constants/routes';

export const router = createBrowserRouter([
  {
    path: Path.Main,
    element: <MainPage />,
  },
  {
    path: Path.Posts,
    element: <Posts />,
  },
  {
    path: Path.PostById,
    element: <Post />,
  },
  {
    path: Path.Albums,
    element: <Albums />,
  },
  {
    path: Path.AlbumById,
    element: <Album />,
  },
  {
    path: Path.Todos,
    element: <Todos />,
  },
  {
    path: Path.Error,
    element: <ErrorPage />,
  },
]);
