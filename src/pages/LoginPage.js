import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import Alert from '../components/common/Alert';
import { AuthContext } from '../context/AuthContext';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const LoginPage = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { login, isAnonymous, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 1500); // 1.5 сек на показ уведомления

      return () => clearTimeout(timeout);
    }
  }, [success, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setError(null);
    setSuccess(false);

    const result = await login(values.email, values.password);
    setSubmitting(false);

    if (!result.success) {
      setError(result.message);
    } else {
      setSuccess(true);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
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
          message="Удачный логин!"
          onClose={() => setSuccess(false)}
        />
      )}

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
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
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginPage;
