import React from 'react';

import { Card, Typography } from '@mui/material';

import styles from './style.m.scss';

import type { FC } from 'react';
import type { DraggableProvided } from 'react-beautiful-dnd';

type Props = {
  title?: string;
  provided?: DraggableProvided;
};

const TodoCard: FC<Props> = ({ title, provided }) => (
  <Card
    {...provided?.draggableProps}
    {...provided?.dragHandleProps}
    className={styles.card}
    ref={provided && provided.innerRef}
    variant="outlined"
  >
    <Typography align="center" sx={{ userSelect: 'none' }} variant="h6">
      {title}
    </Typography>
  </Card>
);

export default TodoCard;
