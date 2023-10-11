// SignInForm.jsx
import React, { useState } from 'react';
import { TextField, Button, ThemeProvider } from '@mui/material';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';  // Import your actual mutation
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
      // Handle error, show error message, etc.
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
