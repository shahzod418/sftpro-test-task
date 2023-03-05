import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { Box } from '@mui/material';

import TodoCard from '@components/TodoCard';
import TodosSkeleton from '@components/TodosSkeleton';

import { useDeviceDetect } from '@hooks/useDeviceDetect';

import styles from './style.m.scss';

import type { DroppableId } from '@interfaces/dragAndDrop';
import type { Todo } from '@interfaces/state/todo';
import type { EntityId, EntityState } from '@reduxjs/toolkit';
import type { FC, ReactElement } from 'react';

type Props = {
  todoIds: EntityId[];
  todos: EntityState<Todo>['entities'];
  droppableId: DroppableId;
  isDraggable?: boolean;
  isSkeleton?: boolean;
};

const TodoDnD: FC<Props> = ({ todoIds, todos, droppableId, isDraggable, isSkeleton }) => {
  const { isMobile } = useDeviceDetect();

  return (
    <Droppable droppableId={droppableId}>
      {(provided): ReactElement => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={styles.box}
          sx={{
            ...(!isMobile && { height: '63vh' }),
            ...(isMobile && { display: 'flex', flexDirection: 'column', height: '30vh' }),
          }}
        >
          {isSkeleton ? (
            <TodosSkeleton />
          ) : (
            todoIds.map((id, index) => {
              return (
                <Draggable
                  key={id}
                  draggableId={String(id)}
                  index={index}
                  isDragDisabled={!isDraggable}
                >
                  {(provided): ReactElement => (
                    <TodoCard provided={provided} title={todos[id]?.title} />
                  )}
                </Draggable>
              );
            })
          )}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};

export default TodoDnD;
