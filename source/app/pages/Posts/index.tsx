import { LoadingStatus } from '@interfaces/state/loadingStatus';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { number, object, string } from 'yup';

import { Container, Fade, Grid } from '@mui/material';

import CustomCard from '@components/CustomCard';
import CustomSkeleton from '@components/CustomSkeleton';
import Header from '@components/Header';
import Navigation from '@components/Navigation';
import PostForm from '@components/PostForm';

import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useMount } from '@hooks/useMount';
import { addPost, fetchPosts, removePost } from '@state/thunks/post';

import styles from './style.m.scss';

import { getPostByIdPath } from '@constants/routes';

import type { PostCreatePayload } from '@interfaces/state/post';
import type { EntityId } from '@reduxjs/toolkit';
import type { FC } from 'react';

const validationSchema = object<PostCreatePayload>({
  userId: number().integer().positive().required(),
  title: string().required(),
  body: string().required(),
});

const Posts: FC = () => {
  const { mount, handleNavigate } = useMount();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const posts = useAppSelector(state => state.posts);

  const initialValues: PostCreatePayload = {
    userId: 0,
    title: '',
    body: '',
  };

  const handleClick = (postId: EntityId) => (): void => {
    navigate(getPostByIdPath(postId));
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleEdit = (): void => {
    setIsEdit(previousState => !previousState);
  };

  const handleSubmit = (values: PostCreatePayload): void => {
    dispatch(addPost(values));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <Container sx={{ pt: 4, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        create
        edit
        header={t('posts')}
        mount={mount}
        onCreate={handleOpen}
        onEdit={handleEdit}
      />
      <Fade in={mount}>
        <Grid
          container
          className={styles['post-section']}
          justifyContent="center"
          mt={2}
          spacing={2}
        >
          {posts.loadingStatus !== LoadingStatus.Idle || !posts ? (
            <CustomSkeleton />
          ) : (
            posts.ids.map(id => (
              <CustomCard
                key={id}
                asyncThunk={removePost(id)}
                isEdit={isEdit}
                title={posts.entities[id]?.title || ''}
                onClick={handleClick(id)}
              />
            ))
          )}
        </Grid>
      </Fade>
      <Navigation handleNavigate={handleNavigate} mount={mount} />
      <PostForm
        initialValues={initialValues}
        open={open}
        title={`${t('create')} ${t('post')}`}
        validationSchema={validationSchema}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export default Posts;
