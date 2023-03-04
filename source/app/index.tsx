import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Path } from '@constants/routes';
import Albums from '@pages/Albums';
import ErrorPage from '@pages/Error';
import MainPage from '@pages/Main';
import Post from '@pages/Post';
import Posts from '@pages/Posts';
import { store } from '@state/store';

import type { FC } from 'react';

const router = createBrowserRouter([
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
    path: Path.Error,
    element: <ErrorPage />,
  },
]);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App: FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
