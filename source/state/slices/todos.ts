import { LoadingStatus } from '@interfaces/state/loadingStatus';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { pendingReducer } from '@state/reducers/pending';
import { rejectedReducer } from '@state/reducers/rejected';
import { addTodo, fetchTodos, removeTodo, updateTodo } from '@state/thunks/todo';

import { initialState } from '@constants/initialState';

import type { ReorderTodosPayload } from '@interfaces/dragAndDrop';
import type { Todo } from '@interfaces/state/todo';
import type { EntityId, PayloadAction } from '@reduxjs/toolkit';

const todosAdapter = createEntityAdapter<Todo>();

const todosSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState(initialState),
  reducers: {
    reorderTodos: (state, action: PayloadAction<ReorderTodosPayload>) => {
      const { startIndex, endIndex } = action.payload;

      const [removed] = state.ids.splice(startIndex, 1);
      state.ids.splice(endIndex, 0, removed);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        todosAdapter.addMany(state, action);
        state.loadingStatus = LoadingStatus.Idle;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        todosAdapter.addOne(state, action);
        state.loadingStatus = LoadingStatus.Idle;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        todosAdapter.setOne(state, action);
        state.loadingStatus = LoadingStatus.Idle;
        state.error = null;
      })
      .addCase(removeTodo.fulfilled, (state, action: PayloadAction<EntityId>) => {
        todosAdapter.removeOne(state, action);
        state.loadingStatus = LoadingStatus.Idle;
        state.error = null;
      })

      .addCase(fetchTodos.pending, pendingReducer)
      .addCase(addTodo.pending, pendingReducer)
      .addCase(updateTodo.pending, pendingReducer)
      .addCase(removeTodo.pending, pendingReducer)

      .addCase(fetchTodos.rejected, rejectedReducer)
      .addCase(addTodo.rejected, rejectedReducer)
      .addCase(updateTodo.rejected, rejectedReducer)
      .addCase(removeTodo.rejected, rejectedReducer);
  },
});

export const { reorderTodos } = todosSlice.actions;

export default todosSlice.reducer;
