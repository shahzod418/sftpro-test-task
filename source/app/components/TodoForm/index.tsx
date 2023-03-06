import { Form, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { number, object, string } from 'yup';

import { Button, Container, Drawer, Grid, TextField, Typography } from '@mui/material';

import { useAppDispatch } from '@hooks/redux';
import { addTodo } from '@state/thunks/todo';

import type { TodoCreatePayload } from '@interfaces/state/todo';
import type { FC, ReactNode } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const validationSchema = object<TodoCreatePayload>({
  userId: number().integer().positive().required(),
  title: string().required(),
});

const TodoForm: FC<Props> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleSubmit = (values: TodoCreatePayload): void => {
    dispatch(addTodo(values));
    onClose();
  };

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}>
      <Container maxWidth="sm" sx={{ mx: 'auto', py: 4 }}>
        <Grid item mb={4} xs={12}>
          <Typography align="center" variant="h4">
            {`${t('create')} ${t('todos')}`}
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              userId: 0,
              title: '',
            }}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, touched, errors }): ReactNode => (
              <Form>
                {(Object.keys(values) as (keyof typeof values)[]).map(value => (
                  <TextField
                    key={value}
                    fullWidth
                    error={touched[value] && Boolean(errors[value])}
                    helperText={touched[value] && errors[value]}
                    id={value}
                    label={t(value)}
                    sx={{ mb: 1 }}
                    value={values[value] || ''}
                    variant="standard"
                    onChange={handleChange}
                  />
                ))}
                <Button fullWidth sx={{ mt: 4 }} type="submit" variant="contained">
                  {t('submit')}
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Container>
    </Drawer>
  );
};

export default TodoForm;
