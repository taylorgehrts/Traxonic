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
        InputLabelProps={{style: { color: theme.palette.text.placeholder } }}
        sx={{
          'input:-webkit-autofill': {
            '-webkit-text-fill-color': '#ffffff !important',
            '-webkit-box-shadow': '0 0 0px 1000px #3B3C4B inset !important',
            transition: 'background-color 5000s ease-in-out 0s',
          },
        }}
      />
      <TextField
        label="First Name"
        name="first"
        value={userInput.first}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        InputLabelProps={{style: { color: theme.palette.text.placeholder } }}
        sx={{
          'input:-webkit-autofill': {
            '-webkit-text-fill-color': '#ffffff !important',
            '-webkit-box-shadow': '0 0 0px 1000px #3B3C4B inset !important',
            transition: 'background-color 5000s ease-in-out 0s',
          },
        }}
      />
      <TextField
        label="Last Name"
        name="last"
        value={userInput.last}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        InputLabelProps={{style: { color: theme.palette.text.placeholder } }}
        sx={{
          'input:-webkit-autofill': {
            '-webkit-text-fill-color': '#ffffff !important',
            '-webkit-box-shadow': '0 0 0px 1000px #3B3C4B inset !important',
            transition: 'background-color 5000s ease-in-out 0s',
          },
        }}
      />
      <TextField
        label="Email"
        name="email"
        value={userInput.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        InputLabelProps={{style: { color: theme.palette.text.placeholder } }}
        sx={{
          'input:-webkit-autofill': {
            '-webkit-text-fill-color': '#ffffff !important',
            '-webkit-box-shadow': '0 0 0px 1000px #3B3C4B inset !important',
            transition: 'background-color 5000s ease-in-out 0s',
          },
        }}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={userInput.password}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        InputLabelProps={{style: { color: theme.palette.text.placeholder } }}
        sx={{
    'input:-webkit-autofill': {
      '-webkit-text-fill-color': '#ffffff !important',
      '-webkit-box-shadow': '0 0 0px 1000px #3B3C4B inset !important',
      transition: 'background-color 5000s ease-in-out 0s',
    },
  }}
      />
      
      <Button variant="contained" color="info" onClick={handleSignUp}>
        Sign Up
      </Button>
    </form>
    </ThemeProvider>
  );
};

export default SignUpForm;
