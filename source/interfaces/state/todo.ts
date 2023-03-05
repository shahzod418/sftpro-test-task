export type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

export type TodoCreatePayload = Pick<Todo, 'title' | 'userId'>;

export type TodoUpdatePayload = {
  todoId: string;
  data: Pick<Todo, 'completed'>;
};
