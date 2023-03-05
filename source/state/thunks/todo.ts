import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type { Todo, TodoCreatePayload, TodoUpdatePayload } from '@interfaces/state/todo';
import type { EntityId } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (payload: TodoCreatePayload) => {
  const response = await axios.post<Todo>('https://jsonplaceholder.typicode.com/todos', {
    ...payload,
    completed: false,
  });
  return response.data;
});

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (payload: TodoUpdatePayload) => {
    const { todoId, data } = payload;

    const response = await axios.patch<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`,
      data,
    );
    return response.data;
  },
);

export const removeTodo = createAsyncThunk('todos/deleteTodo', async (todoId: EntityId) => {
  await axios.delete<void>(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
  return todoId;
});
