import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import { Fab, Fade, Grid, Slide, Typography } from '@mui/material';

import Comment from '@components/Comment';
import Navigation from '@components/Navigation';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useMount } from '@hooks/useMount';
import { fetchCommentsByPostId } from '@state/thunks/comments';
import { fetchPostById } from '@state/thunks/posts';

import styles from './style.m.scss';

import type { FC } from 'react';

const Post: FC = () => {
  const { t } = useTranslation();
  const params = useParams<{ postId: string }>();

  const postId = Number(params.postId);
  if (!postId) {
    return null;
  }

  const comments = useAppSelector(state => state.comments);
  const post = useAppSelector(state => state.posts.entities[postId] || null);
  const commentsByPostIds = useAppSelector(
    state => state.commentsByPostIds.entities[postId] || null,
  );

  const dispatch = useAppDispatch();

  const { mount, handleNavigate } = useMount();

  useEffect(() => {
    dispatch(fetchCommentsByPostId(postId));

    if (!post) {
      dispatch(fetchPostById(postId));
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
            {commentsByPostIds && (
              <>
                <Grid item lg={3}>
                  <Typography variant="h4" color="white">
                    {t('comments')}
                  </Typography>
                </Grid>
                <Grid item lg={9}>
                  <Grid container className={styles.container}>
                    {commentsByPostIds.map(commentId => {
                      const comment = comments.entities[commentId];

                      if (!comment) {
                        return null;
                      }

                      const { id, name, email, body } = comment;

                      return (
                        <Grid item key={id} marginBottom={2}>
                          <Comment name={name} email={email} body={body} />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Fade>
      </Grid>
      <Navigation mount={mount} handleNavigate={handleNavigate} />
    </>
  );
};

export default Post;
