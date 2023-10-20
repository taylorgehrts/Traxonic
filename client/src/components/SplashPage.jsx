import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  ThemeProvider,
} from "@mui/material";
import SignUpForm from "./SignupForm";
import SignInForm from "./SignInForm";
import theme from "../theme"; // Import theme
import splashImage from "../assets/digital_music_background_311664.jpg";

const fadeInStyle = {
  animation: "fadeIn 1.3s ease-in-out forwards",
  animationDelay: "0.5s",
  opacity: 0,
};

const fadeInStyle2 = {
  animation: "fadeIn 1.3s ease-in-out forwards",
  animationDelay: "1.1s",
  opacity: 0,
};

const fadeInStyle3 = {
  animation: "fadeIn 1.3s ease-in-out forwards",
  animationDelay: "1.8s",
  opacity: 0,
};

const fadeInKeyframes = `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`;

const SplashPage = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const handleSignUpOpen = () => {
    setIsSignUpModalOpen(true);
  };

  const handleSignInOpen = () => {
    setIsSignInModalOpen(true);
  };

  const handleModalClose = () => {
    setIsSignUpModalOpen(false);
    setIsSignInModalOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* Include the styles */}
      <style>{`${fadeInKeyframes} @-webkit-keyframes ${fadeInKeyframes}`}</style>

      <Container
        maxWidth="xl"
        sx={{
          backgroundImage: `url(${splashImage})`,
          backgroundSize: "cover",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="md" sx={{ marginTop: "1rem" }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={7}>
              <Card sx={{ marginTop: "3rem", ...fadeInStyle }}>
                <CardContent>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: "#FFFFFF" }}
                  >
                    Welcome to Traxonic
                  </Typography>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#FFFFFF" }}
                  >
                    A Music Collaboration App
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
                    Collaborate seamlessly with musicians worldwide. Share your
                    musical concepts, exchange files, and realize your creative
                    vision. Say goodbye to cumbersome email chains and generic
                    platforms. Our platform is designed for musicians, offering
                    a streamlined experience for sharing files and
                    communication. <br></br>
                    <br></br>Unleash your creativity and explore new horizons in
                    music. Traxonic provides a space where artists connect,
                    ideas flourish, and music comes to life. Join our vibrant
                    community and be part of a revolutionary platform dedicated
                    to the art of collaboration.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
              <Card sx={{ marginTop: "3rem", ...fadeInStyle2 }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#FFFFFF" }}
                  >
                    Are You New Here?
                  </Typography>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={handleSignUpOpen}
                  >
                    Sign Up
                  </Button>
                </CardContent>
              </Card>
              <Card sx={{ marginTop: "1rem", ...fadeInStyle3 }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#FFFFFF" }}
                  >
                    We've Met
                  </Typography>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={handleSignInOpen}
                  >
                    Sign In
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Sign Up Modal */}
        <Dialog open={isSignUpModalOpen} onClose={handleModalClose}>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogContent>
            <SignUpForm />
          </DialogContent>
        </Dialog>

        {/* Sign In Modal */}
        <Dialog open={isSignInModalOpen} onClose={handleModalClose}>
          <DialogTitle>Sign In</DialogTitle>
          <DialogContent>
            <SignInForm />
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default SplashPage;
