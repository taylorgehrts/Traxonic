// SplashPage.jsx
import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import SignUpForm from './SignupForm';
import SignInForm from './SignInForm';


const SplashPage = () => {
  return (
    <Container maxWidth="xl" sx={{ background: '#090810' }}>
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Sign Up
              </Typography>
              <SignUpForm />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Sign In
              </Typography>
              <SignInForm />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
    </Container>
  );
};

export default SplashPage;
