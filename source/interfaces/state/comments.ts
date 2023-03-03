export type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

export type CommentCreatePayload = Omit<Comment, 'id'>;

export type CommentUpdatePayload = {
  commentId: number;
  data: Partial<CommentCreatePayload>;
};
