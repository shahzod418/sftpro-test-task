import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { number, object, string } from 'yup';

import { Fade, Grid, Typography } from '@mui/material';

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
  if (!postId) {
    return null;
  }

  const comments = useAppSelector(state => state.comments);
  const post = useAppSelector(state => state.posts.entities[postId] || null);
  const commentsByPostIds = useAppSelector(
    state => state.commentsByPostIds.entities[postId] || null,
  );

  const handleEdit = (): void => {
    setOpen(true);
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

  const handleClose = (): void => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchCommentsByPostId(postId));

    if (!post) {
      dispatch(fetchPostById(postId));
    }
  }, []);

  return (
    <>
      <Grid container paddingX={24} paddingTop={4}>
        <Header mount={mount} header={t('post')} edit onEdit={handleEdit} />
        <Fade in={mount}>
          <Grid container rowGap={4} marginTop={4}>
            <PostText header={t('title')} text={post?.title} />
            <PostText header={t('body')} text={post?.body} />
            <Grid item xs={11} lg={3}>
              <Typography variant="h4" color="white">
                {t('comments')}
              </Typography>
            </Grid>
            <Grid item xs={11} lg={8}>
              <Grid container className={styles.container} justifyContent="center">
                {!commentsByPostIds ? (
                  <CommentsSkeleton />
                ) : (
                  commentsByPostIds.map(commentId => {
                    const comment = comments.entities[commentId];

                    if (!comment) {
                      return null;
                    }

                    const { id, name, email, body } = comment;

                    return (
                      <Grid item xs={11} key={id} marginBottom={2}>
                        <Comment commentId={id} name={name} email={email} body={body} />
                      </Grid>
                    );
                  })
                )}
              </Grid>
            </Grid>
          </Grid>
        </Fade>
      </Grid>
      <Navigation mount={mount} handleNavigate={handleNavigate} />
      {post && (
        <PostForm
          title={`${t('edit')} ${t('post')}`}
          open={open}
          onClose={handleClose}
          initialValues={{
            userId: post.userId,
            title: post.title,
            body: post.body,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Post;
