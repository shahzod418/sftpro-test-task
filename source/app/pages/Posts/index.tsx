import { LoadingStatus } from '@interfaces/state/loadingStatus';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { number, object, string } from 'yup';

import { Fade, Grid } from '@mui/material';

import CustomCard from '@components/CustomCard';
import Header from '@components/Header';
import Navigation from '@components/Navigation';
import PostForm from '@components/PostForm';
import PostsSkeleton from '@components/PostsSkeleton';
import { getPostByIdPath } from '@constants/routes';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useMount } from '@hooks/useMount';
import { addPost, fetchPosts, removePost } from '@state/thunks/post';

import styles from './style.m.scss';

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

  const handleCreate = (): void => {
    setOpen(true);
  };

  const handleEdit = (): void => {
    setIsEdit(previousState => !previousState);
  };

  const handleSubmit = (values: PostCreatePayload): void => {
    dispatch(addPost(values));
    setOpen(false);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      <Grid container paddingX={24} paddingTop={4}>
        <Header
          mount={mount}
          header={t('posts')}
          create
          onCreate={handleCreate}
          edit
          onEdit={handleEdit}
        />
        <Fade in={mount}>
          <Grid container spacing={2} justifyContent="center" className={styles.container}>
            {posts.loadingStatus !== LoadingStatus.Idle ? (
              <PostsSkeleton />
            ) : (
              posts.ids.length !== 0 &&
              posts.ids.map(id => (
                <CustomCard
                  key={id}
                  title={posts.entities[id]?.title || ''}
                  isEdit={isEdit}
                  onClick={handleClick(id)}
                  asyncThunk={removePost(id)}
                />
              ))
            )}
          </Grid>
        </Fade>
      </Grid>
      <Navigation mount={mount} handleNavigate={handleNavigate} />
      <PostForm
        title={`${t('create')} ${t('post')}`}
        open={open}
        onClose={handleClose}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Posts;
