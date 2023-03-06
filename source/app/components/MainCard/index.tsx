import React from 'react';

import { Newspaper } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';

import styles from './style.m.scss';

import type { FC } from 'react';

type Props = {
  title: string;
  onClick: () => void;
};

const MainCard: FC<Props> = ({ title, onClick }) => {
  return (
    <Grid item lg={3} xs={12} onClick={onClick}>
      <Box className={styles.box}>
        <Newspaper className={styles.icon} />
        <Typography variant="h2">{title}</Typography>
      </Box>
    </Grid>
  );
};

export default MainCard;
