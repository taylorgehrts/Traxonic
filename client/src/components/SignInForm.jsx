import React, { useState } from 'react';
import { TextField, Button, ThemeProvider } from '@mui/material';
import { Auth } from 'aws-amplify';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import theme from '../theme';
import { useAuth } from '../components/AuthContext'; 

const SignInForm = () => {
  const { onLogout } = useAuth();
  const [login] = useMutation(LOGIN);

  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  };

  const handleSignIn = async () => {
    try {
      // Use Promise.all to wait for both login and Amplify sign-in
      const [graphqlResult, amplifySignInResult] = await Promise.all([
        login({ variables: loginInput }),
        Auth.signIn(loginInput.email, loginInput.password),
      ]);
  
      // Handle GraphQL result
      const { data } = graphqlResult;
      console.log('GraphQL data:', data); // Log the entire data object
  
      if (data && data.login) {
        const { token, user } = data.login;
        console.log('authToken:', token);
  
        // Store tokens and user ID in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', user.id);
  
      
        // Force a page refresh
        window.location.reload();
      }
  
      // Handle Amplify sign-in result
      console.log('Amplify Sign-in result:', amplifySignInResult);
    } catch (error) {
      console.error('Error logging in:', error);
      
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
          InputLabelProps={{ style: { color: theme.palette.text.placeholder } }}
          sx={{
            input: {
              WebkitTextFillColor: '#ffffff !important',
              WebkitBoxShadow: '0 0 0px 1000px #3B3C4B inset !important',
              transition: 'background-color 5000s ease-in-out 0s',
            },
          }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={loginInput.password}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: theme.palette.text.placeholder } }}
          sx={{
            input: {
              WebkitTextFillColor: '#ffffff !important',
              WebkitBoxShadow: '0 0 0px 1000px #3B3C4B inset !important',
              transition: 'background-color 5000s ease-in-out 0s',
            },
          }}
        />
        <Button variant="contained" color="info" onClick={handleSignIn}>
          Sign In
        </Button>
      </form>
    </ThemeProvider>
  );
};

export default SignInForm;
