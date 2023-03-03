import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Fade, Grid, Slide, Typography } from '@mui/material';

import Navigation from '@components/Navigation';
import PostCard from '@components/PostCard';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useMount } from '@hooks/useMount';
import { fetchPosts } from '@state/thunks/posts';

import styles from './style.m.scss';

import type { FC } from 'react';

const Posts: FC = () => {
  const { t } = useTranslation();

  const posts = useAppSelector(state => state.posts);

  const dispatch = useAppDispatch();

  const { mount, handleNavigate } = useMount();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      <Grid container paddingX={24} paddingTop={4}>
        <Slide in={mount} direction="down">
          <Grid container marginBottom={2}>
            <Grid item>
              <Typography variant="h2" color="white">
                {t('posts')}
              </Typography>
            </Grid>
          </Grid>
        </Slide>
        {posts.ids.length !== 0 && (
          <Fade in={mount}>
            <Grid container spacing={2} justifyContent="center" className={styles.container}>
              {posts.ids.map(id => (
                <PostCard key={id} postId={id} title={posts.entities[id]?.title || ''} />
              ))}
            </Grid>
          </Fade>
        )}
      </Grid>
      <Navigation mount={mount} handleNavigate={handleNavigate} />
    </>
  );
};

export default Posts;
