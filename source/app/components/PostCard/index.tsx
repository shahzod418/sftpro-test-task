import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, Grid, Typography } from '@mui/material';

import styles from './style.m.scss';

import type { EntityId } from '@reduxjs/toolkit';
import type { FC } from 'react';

type Props = {
  postId: EntityId;
  title: string;
};

const PostCard: FC<Props> = ({ postId, title }) => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(`/posts/${postId}`);
  };

  return (
    <Grid item xs={12} md={6} lg={4} onClick={handleClick}>
      <Card variant="outlined" className={styles.card}>
        <CardContent>
          <Typography variant="h6" align="center">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PostCard;
