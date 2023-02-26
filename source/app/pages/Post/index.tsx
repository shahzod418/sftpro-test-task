import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import { Fab, Fade, Grid, Slide, Typography } from '@mui/material';

import Comment from '@components/Comment';
import Navigation from '@components/Navigation';
import { useMount } from '@hooks/useMount';
import { fetchCommentsByPostId } from '@state/slices/comments';
import { fetchPostById } from '@state/slices/posts';

import styles from './style.m.scss';

import type { Comment as IComment } from '@interfaces/state/comments';
import type { Post as IPost } from '@interfaces/state/post';
import type { AppDispatch, RootState } from '@state/store';
import type { FC } from 'react';

const Post: FC = () => {
  const { t } = useTranslation();
  const params = useParams<{ postId: string }>();

  const postId = Number(params.postId);
  if (!postId) {
    return null;
  }

  const post = useSelector<RootState, IPost | null>(state => state.posts.entities[postId] || null);
  const comments = useSelector<RootState, IComment[] | null>(
    state => state.comments.entities[postId] || null,
  );

  const dispatch = useDispatch<AppDispatch>();

  const { mount, handleNavigate } = useMount();

  useEffect(() => {
    if (!post) {
      dispatch(fetchPostById(postId));
    }
    if (!comments) {
      dispatch(fetchCommentsByPostId(postId));
    }
  }, []);

  if (!post) {
    return null;
  }

  if (!comments) {
    return null;
  }

  return (
    <>
      <Grid container paddingX={24} paddingTop={4}>
        <Slide in={mount} direction="down">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h3" color="white">
                {t('post')}
              </Typography>
            </Grid>
            <Grid item>
              <Fab variant="extended" color="warning">
                <EditIcon sx={{ mr: 2 }} />
                {t('edit')}
              </Fab>
            </Grid>
          </Grid>
        </Slide>
        <Fade in={mount}>
          <Grid container rowGap={4} marginTop={4}>
            <Grid item lg={3}>
              <Typography variant="h4" color="white">
                {t('title')}
              </Typography>
            </Grid>
            <Grid item lg={9}>
              <Typography variant="h6" color="white">
                {post.title}
              </Typography>
            </Grid>
            <Grid item lg={3}>
              <Typography variant="h4" color="white">
                {t('body')}
              </Typography>
            </Grid>
            <Grid item lg={9}>
              <Typography variant="h6" color="white">
                {post.body}
              </Typography>
            </Grid>
            <Grid item lg={3}>
              <Typography variant="h4" color="white">
                {t('comments')}
              </Typography>
            </Grid>
            <Grid item lg={9}>
              <Grid container className={styles.container}>
                {comments.map(({ id, name, email, body }) => (
                  <Grid item key={id} marginBottom={2}>
                    <Comment name={name} email={email} body={body} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Fade>
      </Grid>
      <Navigation mount={mount} handleNavigate={handleNavigate} />
    </>
  );
};

export default Post;
