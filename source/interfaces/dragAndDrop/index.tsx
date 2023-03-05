export enum DroppableId {
  Started = 'started',
  Completed = 'completed',
}

export type ReorderTodosPayload = {
  startIndex: number;
  endIndex: number;
};
