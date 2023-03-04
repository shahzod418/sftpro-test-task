import React from 'react';

import { Card, CardContent, Typography } from '@mui/material';

import CommentHeader from '@components/CommentHeader';

import type { FC } from 'react';

type Props = {
  commentId: number;
  name: string;
  email: string;
  body: string;
};

const Comment: FC<Props> = ({ commentId, name, email, body }) => {
  return (
    <Card variant="outlined">
      <CommentHeader commentId={commentId} name={name} email={email} />
      <CardContent>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;
