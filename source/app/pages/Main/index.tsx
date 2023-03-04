import React from 'react';
import { useTranslation } from 'react-i18next';

import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import { Grid, Paper, Slide, Typography } from '@mui/material';

import { Path } from '@constants/routes';
import { useMount } from '@hooks/useMount';

import styles from './style.m.scss';

import type { FC } from 'react';

const MainPage: FC = () => {
  const { mount, handleNavigate } = useMount();
  const { t } = useTranslation();

  return (
    <>
      <Slide direction="up" in={mount}>
        <Grid container justifyContent="center" margin="auto">
          <Grid item xs={12} lg={3} onClick={handleNavigate(Path.Posts)}>
            <Paper elevation={0} className={styles.paper}>
              <NewspaperIcon className={styles.icon} />
              <Typography variant="h2">{t('posts')}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={3} onClick={handleNavigate(Path.Albums)}>
            <Paper elevation={0} className={styles.paper}>
              <PhotoAlbumIcon className={styles.icon} />
              <Typography variant="h2">{t('albums')}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={3} onClick={handleNavigate(Path.ToDos)}>
            <Paper elevation={0} className={styles.paper}>
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
