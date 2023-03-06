import React from 'react';

import { DashboardCustomize, Newspaper, PhotoAlbum } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';

import styles from './style.m.scss';

import { Path } from '@constants/routes';

import type { FC, ReactElement } from 'react';

type Props = {
  path: Path;
  title: string;
  onClick: () => void;
};

const mappedIcon = {
  [Path.Posts]: <Newspaper className={styles.icon} />,
  [Path.Albums]: <PhotoAlbum className={styles.icon} />,
  [Path.Todos]: <DashboardCustomize className={styles.icon} />,
} as Record<Path, ReactElement>;

const MainCard: FC<Props> = ({ path, title, onClick }) => {
  return (
    <Grid item lg={3} xs={12} onClick={onClick}>
      <Box className={styles.box}>
        {mappedIcon[path]}
        <Typography variant="h2">{title}</Typography>
      </Box>
    </Grid>
  );
};

export default MainCard;
