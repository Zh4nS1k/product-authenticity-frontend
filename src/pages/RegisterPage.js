import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography } from '@mui/material';
import Alert from '../components/common/Alert';
import { AuthContext } from '../context/AuthContext';

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too short').required('Required'),
});

const RegisterPage = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      {error && (
        <Alert
          severity="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}
      {success && (
        <Alert
          severity="success"
          message="Registration successful! You can now login."
          onClose={() => setSuccess(false)}
        />
      )}
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const result = await register(
              values.username,
              values.email,
              values.password
            );
            if (result.success) {
              setSuccess(true);
              setTimeout(() => navigate('/login'), 2000);
            } else {
              setError(result.message);
            }
          } catch (err) {
            setError('An error occurred during registration');
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              name="username"
              label="Username"
              fullWidth
              margin="normal"
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
            />
            <Field
              as={TextField}
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <Field
              as={TextField}
              name="password"
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              fullWidth
              sx={{ mt: 2 }}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterPage;
