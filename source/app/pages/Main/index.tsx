import React from 'react';
import { useTranslation } from 'react-i18next';

import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import { Grid, Paper, Slide, Typography } from '@mui/material';

import Translate from '@components/Translate';
import { useMount } from '@hooks/useMount';

import styles from './style.m.scss';

import type { FC } from 'react';

const MainPage: FC = () => {
  const { mount, handleNavigate } = useMount();
  const { t } = useTranslation();

  return (
    <>
      <Translate mount={mount} />
      <Slide direction="up" in={mount}>
        <Grid container justifyContent="center" margin="auto">
          <Grid item xs={12} lg={3} onClick={handleNavigate('posts')}>
            <Paper elevation={0} className={styles.paper}>
              <NewspaperIcon style={{ fontSize: '10em' }} />
              <Typography variant="h2">{t('posts')}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={3} onClick={handleNavigate('albums')}>
            <Paper elevation={0} className={styles.paper}>
              <PhotoAlbumIcon style={{ fontSize: '10em' }} />
              <Typography variant="h2">{t('albums')}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={3} onClick={handleNavigate('todos')}>
            <Paper elevation={0} className={styles.paper}>
              <DashboardCustomizeIcon style={{ fontSize: '10em' }} />
              <Typography variant="h2">{t('toDo')}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Slide>
    </>
  );
};

export default MainPage;
