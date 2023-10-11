// SignInForm.jsx
import React, { useState } from 'react';
import { TextField, Button, ThemeProvider } from '@mui/material';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations'; // Import your actual mutation
import theme from '../theme';

const SignInForm = () => {
  const [login] = useMutation(LOGIN);

  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  };

  const handleSignIn = async () => {
    try {
      const result = await login({
        variables: loginInput,
      });

      console.log('User logged in:', result);

      // If login is successful, you might want to redirect the user or perform other actions
    } catch (error) {
      console.error('Error logging in:', error);

      // Check if the error has a networkError property
      if (error.networkError) {
        console.error('Network error:', error.networkError);
        // Handle network error, show appropriate message to the user
        alert('A network error occurred. Please check your internet connection and try again.');
      }

      // Check if the error has a graphQLErrors property
      if (error.graphQLErrors) {
        // Extract specific error information
        const firstError = error.graphQLErrors[0];
        console.error('GraphQL error:', firstError);

        // Handle specific error cases
        if (firstError.extensions.code === 'BAD_USER_INPUT') {
          // Handle invalid user input (e.g., wrong email or password)
          alert('Invalid email or password. Please try again.');
        } else if (firstError.extensions.code === 'UNAUTHENTICATED') {
          // Handle unauthenticated user
          alert('Authentication failed. Please check your email and password.');
        } else {
          // Handle other GraphQL errors
          alert('An error occurred during login. Please try again.');
        }
      }

      // Handle other types of errors as needed
      // ...

      // Show a generic error message to the user
      // You might want to customize this message based on the specific error
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <form>
        <TextField
          label="Email"
          name="email"
          value={loginInput.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={loginInput.password}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="info" onClick={handleSignIn}>
          Sign In
        </Button>
      </form>
    </ThemeProvider>
  );
};

export default SignInForm;
