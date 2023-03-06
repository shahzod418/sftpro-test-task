import { Form, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Container, Drawer, Grid, TextField, Typography } from '@mui/material';

import type { PostCreatePayload, PostUpdatePayload } from '@interfaces/state/post';
import type { FC, ReactNode } from 'react';
import type { ObjectSchema } from 'yup';

type Props = {
  title: string;
  open: boolean;
  onClose: () => void;
  initialValues: PostCreatePayload;
  onSubmit: (values: PostCreatePayload | PostUpdatePayload['data']) => void;
  validationSchema: ObjectSchema<Record<string, unknown>, PostCreatePayload | PostUpdatePayload>;
};

const PostForm: FC<Props> = ({
  title,
  open,
  onClose,
  initialValues,
  onSubmit,
  validationSchema,
}) => {
  const { t } = useTranslation();

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}>
      <Container maxWidth="sm" sx={{ mx: 'auto', py: 4 }}>
        <Grid item mb={4} xs={12}>
          <Typography align="center" variant="h4">
            {title}
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
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

export default PostForm;
