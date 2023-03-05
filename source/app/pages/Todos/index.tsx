import { DroppableId } from '@interfaces/dragAndDrop';
import { LoadingStatus } from '@interfaces/state/loadingStatus';
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

import { Container, Fade, Grid, Typography } from '@mui/material';

import Header from '@components/Header';
import Navigation from '@components/Navigation';
import TodoDnD from '@components/TodoDnD';
import TodoForm from '@components/TodoForm';

import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useDeviceDetect } from '@hooks/useDeviceDetect';
import { useMount } from '@hooks/useMount';
import { reorderTodos } from '@state/slices/todos';
import { fetchTodos, removeTodo, updateTodo } from '@state/thunks/todo';

import styles from './style.m.scss';

import type { FC } from 'react';
import type { DropResult } from 'react-beautiful-dnd';

const Todos: FC = () => {
  const { mount, handleNavigate } = useMount();
  const { isMobile } = useDeviceDetect();

  const [open, setOpen] = useState<boolean>(false);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);

  const startedTodoIds = todos.ids.filter(id => !todos.entities[id]?.completed);
  const completedTodoIds = todos.ids.filter(id => todos.entities[id]?.completed);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      dispatch(removeTodo(startedTodoIds[result.source.index]));
    }

    if (result.destination?.droppableId === DroppableId.Completed) {
      dispatch(
        updateTodo({
          todoId: result.draggableId,
          data: { completed: true },
        }),
      );
    } else {
      dispatch(
        reorderTodos({
          startIndex: todos.ids.findIndex(id => id === startedTodoIds[result.source.index]),
          endIndex: todos.ids.findIndex(
            id => id === startedTodoIds[result.destination?.index || 0],
          ),
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <Container className={styles.container} sx={{ paddingTop: 4 }}>
      <Header create header={t('todos')} mount={mount} onCreate={handleOpen} />
      <Fade in={mount}>
        <Grid
          container
          gap={isMobile ? 2 : 10}
          justifyContent="center"
          marginTop={2}
          sx={{ flexDirection: isMobile ? 'column' : 'raw' }}
        >
          <DragDropContext onDragEnd={handleDragEnd}>
            <Grid item lg={4} xs={12}>
              <Typography color="white" marginBottom={2} variant="h4">
                {t('started')}
              </Typography>
              <TodoDnD
                isDraggable
                droppableId={DroppableId.Started}
                isSkeleton={todos.loadingStatus === LoadingStatus.Loading}
                todoIds={startedTodoIds}
                todos={todos.entities}
              />
            </Grid>
            <Grid item lg={4} xs={12}>
              <Typography color="white" marginBottom={2} variant="h4">
                {t('completed')}
              </Typography>
              <TodoDnD
                droppableId={DroppableId.Completed}
                isSkeleton={todos.loadingStatus === LoadingStatus.Loading}
                todoIds={completedTodoIds}
                todos={todos.entities}
              />
            </Grid>
          </DragDropContext>
        </Grid>
      </Fade>
      <Navigation handleNavigate={handleNavigate} mount={mount} />
      <TodoForm open={open} onClose={handleClose} />
    </Container>
  );
};

export default Todos;
