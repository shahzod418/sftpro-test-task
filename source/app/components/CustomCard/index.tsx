import React from 'react';

import { Delete } from '@mui/icons-material';
import { Card, CardContent, Grid, IconButton, Typography } from '@mui/material';

import { useAppDispatch } from '@hooks/redux';

import styles from './style.m.scss';

import type { AsyncThunkAction, EntityId } from '@reduxjs/toolkit';
import type { FC, MouseEventHandler } from 'react';

type Props = {
  title: string;
  isEdit: boolean;
  onClick: () => void;
  asyncThunk: AsyncThunkAction<EntityId, EntityId, Record<string, unknown>>;
};

const CustomCard: FC<Props> = ({ title, isEdit, onClick, asyncThunk }) => {
  const dispatch = useAppDispatch();

  const handleDelete: MouseEventHandler = event => {
    event.stopPropagation();
    dispatch(asyncThunk);
  };

  return (
    <Grid item className={isEdit ? styles.container : ''} lg={5} xs={10} onClick={onClick}>
      <Card className={styles.card} variant="outlined">
        <CardContent>
          <Typography align="center" variant="h6">
            {title}
          </Typography>
        </CardContent>
      </Card>
      {isEdit && (
        <IconButton className={styles.button} onClick={handleDelete}>
          <Delete color="error" />
        </IconButton>
      )}
    </Grid>
  );
};

export default CustomCard;
