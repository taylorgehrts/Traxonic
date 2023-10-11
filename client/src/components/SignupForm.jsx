// SignUpForm.jsx
import React, { useState } from 'react';
import { TextField, Button, ThemeProvider} from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations'; // Import your actual mutation
import theme from '../theme';

const SignUpForm = () => {
  const [addUser] = useMutation(ADD_USER);

  const [userInput, setUserInput] = useState({
    username: '',
    email: '',
    password: '',
    first: '', // Added first name
    last: '',  // Added last name
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleSignUp = async () => {
    try {
      const result = await addUser({
        variables: userInput,
      });

      console.log('User created:', result);

      // If registration is successful, you might want to redirect the user or show a success message
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <ThemeProvider theme={theme}>
    <form>
      <TextField
        label="Username"
        name="username"
        value={userInput.username}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="First Name"
        name="first"
        value={userInput.first}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Last Name"
        name="last"
        value={userInput.last}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={userInput.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={userInput.password}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      
      <Button variant="contained" color="primary" onClick={handleSignUp}>
        Sign Up
      </Button>
    </form>
    </ThemeProvider>
  );
};

export default SignUpForm;
