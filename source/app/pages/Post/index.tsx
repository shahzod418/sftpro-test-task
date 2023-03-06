import { LoadingStatus } from '@interfaces/state/loadingStatus';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { number, object, string } from 'yup';

import { Container, Fade, Grid, Typography } from '@mui/material';

import Comment from '@components/Comment';
import CommentsSkeleton from '@components/CommentsSkeleton';
import Header from '@components/Header';
import Navigation from '@components/Navigation';
import PostForm from '@components/PostForm';
import PostText from '@components/PostText';

import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useMount } from '@hooks/useMount';
import { fetchCommentsByPostId } from '@state/thunks/comment';
import { fetchPostById, updatePost } from '@state/thunks/post';

import styles from './style.m.scss';

import type { PostUpdatePayload } from '@interfaces/state/post';
import type { FC } from 'react';

const validationSchema = object<PostUpdatePayload>({
  userId: number().integer().positive(),
  title: string(),
  body: string(),
});

const Post: FC = () => {
  const { mount, handleNavigate } = useMount();

  const [open, setOpen] = useState<boolean>(false);

  const { t } = useTranslation();
  const params = useParams<{ postId: string }>();
  const dispatch = useAppDispatch();

  const postId = Number(params.postId);

  const comments = useAppSelector(state => state.comments);
  const post = useAppSelector(state => state.posts.entities[postId] || null);
  const commentsByPostIds = useAppSelector(
    state => state.commentsByPostIds.entities[postId] || null,
  );

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleSubmit = (values: PostUpdatePayload['data']): void => {
    if (!post?.id) {
      return;
    }

    const payload: PostUpdatePayload = {
      postId: post?.id,
      data: values,
    };

    dispatch(updatePost(payload));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchCommentsByPostId(postId));

    if (!post) {
      dispatch(fetchPostById(postId));
    }
  }, []);

  return (
    <Container sx={{ pt: 4, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header edit header={t('post')} mount={mount} onEdit={handleOpen} />
      <Fade in={mount}>
        <Grid container justifyContent="center" mt={4} rowGap={4}>
          <PostText header={t('title')} text={post?.title} />
          <PostText header={t('body')} text={post?.body} />
          <Grid item lg={3} xs={11}>
            <Typography color="white" variant="h4">
              {t('comments')}
            </Typography>
          </Grid>
          <Grid item lg={8} xs={11}>
            <Grid container className={styles['comment-section']}>
              {comments.loadingStatus !== LoadingStatus.Idle || !commentsByPostIds ? (
                <CommentsSkeleton />
              ) : (
                commentsByPostIds.map(commentId => {
                  const comment = comments.entities[commentId];

                  if (!comment) {
                    return null;
                  }

                  const { id, name, email, body } = comment;

                  return (
                    <Grid key={id} item mb={2} xs={11}>
                      <Comment body={body} commentId={id} email={email} name={name} />
                    </Grid>
                  );
                })
              )}
            </Grid>
          </Grid>
        </Grid>
      </Fade>
      <Navigation handleNavigate={handleNavigate} mount={mount} />
      {post && (
        <PostForm
          open={open}
          title={`${t('edit')} ${t('post')}`}
          validationSchema={validationSchema}
          initialValues={{
            userId: post.userId,
            title: post.title,
            body: post.body,
          }}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      )}
    </Container>
  );
};

export default Post;
