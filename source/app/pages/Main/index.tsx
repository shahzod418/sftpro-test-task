import React from 'react';
import { useTranslation } from 'react-i18next';

import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import { Grid, Paper, Slide, Typography } from '@mui/material';

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
        <Grid container justifyContent="center" margin="auto">
          <Grid item lg={3} xs={12} onClick={handleNavigate(Path.Posts)}>
            <Paper className={styles.paper} elevation={0}>
              <NewspaperIcon className={styles.icon} />
              <Typography variant="h2">{t('posts')}</Typography>
            </Paper>
          </Grid>
          <Grid item lg={3} xs={12} onClick={handleNavigate(Path.Albums)}>
            <Paper className={styles.paper} elevation={0}>
              <PhotoAlbumIcon className={styles.icon} />
              <Typography variant="h2">{t('albums')}</Typography>
            </Paper>
          </Grid>
          <Grid item lg={3} xs={12} onClick={handleNavigate(Path.ToDos)}>
            <Paper className={styles.paper} elevation={0}>
              <DashboardCustomizeIcon className={styles.icon} />
              <Typography variant="h2">{t('toDo')}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Slide>
    </>
  );
};

export default MainPage;
