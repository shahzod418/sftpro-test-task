import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
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
    <Grid item xs={10} lg={5} xl={3} onClick={onClick} className={isEdit ? styles.container : ''}>
      <Card variant="outlined" className={styles.card}>
        <CardContent>
          <Typography variant="h6" align="center">
            {title}
          </Typography>
        </CardContent>
      </Card>
      {isEdit && (
        <IconButton className={styles.button} onClick={handleDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      )}
    </Grid>
  );
};

export default CustomCard;
