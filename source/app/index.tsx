import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import ErrorPage from '@pages/Error';
import MainPage from '@pages/Main';
import Post from '@pages/Post';
import Posts from '@pages/Posts';
import { store } from '@state/store';

import type { FC } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/posts',
    element: <Posts />,
  },
  {
    path: '/posts/:postId',
    element: <Post />,
  },
  {
    path: '*',
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
