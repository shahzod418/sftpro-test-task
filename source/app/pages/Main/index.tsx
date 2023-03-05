import React from 'react';
import { useTranslation } from 'react-i18next';

import { DashboardCustomize, Newspaper, PhotoAlbum } from '@mui/icons-material';
import { Box, Grid, Slide, Typography } from '@mui/material';

import { useMount } from '@hooks/useMount';

import styles from './style.m.scss';

import { Path } from '@constants/routes';

import type { FC } from 'react';

const MainPage: FC = () => {
  const { mount, handleNavigate } = useMount();
  const { t } = useTranslation();

  return (
    <>
      <Slide direction="up" in={mount}>
        <Grid container color="white" gap={4} justifyContent="center" margin="auto">
          <Grid item lg={3} xs={12} onClick={handleNavigate(Path.Posts)}>
            <Box className={styles.box}>
              <Newspaper className={styles.icon} />
              <Typography variant="h2">{t('posts')}</Typography>
            </Box>
          </Grid>
          <Grid item lg={3} xs={12} onClick={handleNavigate(Path.Albums)}>
            <Box className={styles.box}>
              <PhotoAlbum className={styles.icon} />
              <Typography variant="h2">{t('albums')}</Typography>
            </Box>
          </Grid>
          <Grid item lg={3} xs={12} onClick={handleNavigate(Path.ToDos)}>
            <Box className={styles.box}>
              <DashboardCustomize className={styles.icon} />
              <Typography variant="h2">{t('toDo')}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Slide>
    </>
  );
};

export default MainPage;
