import { Form, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Drawer, Grid, TextField, Typography } from '@mui/material';

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
      <Grid container padding={24} paddingTop={4} justifyContent="center">
        <Grid item xs={12} marginBottom={4}>
          <Typography variant="h4" align="center">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
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
                    sx={{ mb: 1 }}
                    id={value}
                    label={t(value)}
                    variant="standard"
                    value={values[value] || ''}
                    onChange={handleChange}
                    error={touched[value] && Boolean(errors[value])}
                    helperText={touched[value] && errors[value]}
                  />
                ))}
                <Button variant="contained" fullWidth type="submit" sx={{ mt: 4 }}>
                  {t('submit')}
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default PostForm;
