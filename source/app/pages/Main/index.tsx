import React from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, Slide } from '@mui/material';

import MainCard from '@components/MainCard';

import { useMount } from '@hooks/useMount';

import { Path } from '@constants/routes';

import type { FC } from 'react';

const MainPage: FC = () => {
  const { mount, handleNavigate } = useMount();

  const { t } = useTranslation();

  const data = [
    { path: Path.Posts, title: t('posts') },
    { path: Path.Albums, title: t('albums') },
    { path: Path.Todos, title: t('todos') },
  ];

  return (
    <>
      <Slide direction="up" in={mount}>
        <Grid container color="white" gap={4} justifyContent="center" margin="auto">
          {data.map(({ path, title }) => (
            <MainCard key={path} path={path} title={title} onClick={handleNavigate(path)} />
          ))}
        </Grid>
      </Slide>
    </>
  );
};

export default MainPage;
