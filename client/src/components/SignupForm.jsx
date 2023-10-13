import React, { useState } from "react";
import { TextField, Button, ThemeProvider } from "@mui/material";
import { Auth } from "aws-amplify"; // Import Auth from aws-amplify
import { useMutation } from "@apollo/client";
import { ADD_USER, VERIFY_USER } from "../utils/mutations";
import theme from "../theme";

const SignUpForm = () => {
  const [addUser] = useMutation(ADD_USER);
  const [verifyUser] = useMutation(VERIFY_USER); // Use the verification mutation

  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    first: "",
    last: "",
  });

  const [verificationCode, setVerificationCode] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleSignUp = async () => {
    try {
      // Use both your mutation and Auth.signUp inside Promise.all
      const [addUserResult, signUpResult] = await Promise.all([
        addUser({
          variables: userInput,
        }),
        Auth.signUp({
          username: userInput.email,
          password: userInput.password,
          attributes: {
            email: userInput.email,
            given_name: userInput.first,
            family_name: userInput.last,
          },
        }),
      ]);

      console.log("User created in your database:", addUserResult);
      console.log("User created in AWS Cognito:", signUpResult);

      // Prompt user to enter verification code
      alert(
        "A verification code has been sent to your email. Please enter the code to complete registration."
      );
    } catch (error) {
      console.error("Error creating user:", error);

      if (error.code === "UsernameExistsException") {
        alert(
          "Email address is already in use. Please use a different email address."
        );
      } else {
        console.error("Cognito Error:", error);
        alert("An error occurred during user registration. Please try again.");
      }
    }
  };

  const handleVerify = async () => {
    try {
      // Use Auth.confirmSignUp to send the verification code to AWS Cognito
      await Auth.confirmSignUp(userInput.email, verificationCode);

      // Verification successful
      alert("Registration successful!");
    } catch (error) {
      console.error("Error verifying user:", error);
      alert(
        "Failed to verify user. Please check the verification code and try again."
      );
    }
  };

  const handleResendCode = async () => {
    try {
      // Use Auth.resendSignUp to resend the verification code
      await Auth.resendSignUp(userInput.email);

      // Verification code resent successfully
      alert("Verification code resent successfully. Please check your email.");
    } catch (error) {
      console.error("Error resending verification code:", error);
      alert("Failed to resend verification code. Please try again.");
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
          InputLabelProps={{ style: { color: theme.palette.text.placeholder } }}
          sx={{
            input: {
              WebkitTextFillColor: "#ffffff !important",
              WebkitBoxShadow: "0 0 0px 1000px #3B3C4B inset !important",
              transition: "background-color 5000s ease-in-out 0s",
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
          InputLabelProps={{ style: { color: theme.palette.text.placeholder } }}
          sx={{
            input: {
              WebkitTextFillColor: "#ffffff !important",
              WebkitBoxShadow: "0 0 0px 1000px #3B3C4B inset !important",
              transition: "background-color 5000s ease-in-out 0s",
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
          InputLabelProps={{ style: { color: theme.palette.text.placeholder } }}
          sx={{
            input: {
              WebkitTextFillColor: "#ffffff !important",
              WebkitBoxShadow: "0 0 0px 1000px #3B3C4B inset !important",
              transition: "background-color 5000s ease-in-out 0s",
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
          InputLabelProps={{ style: { color: theme.palette.text.placeholder } }}
          sx={{
            input: {
              WebkitTextFillColor: "#ffffff !important",
              WebkitBoxShadow: "0 0 0px 1000px #3B3C4B inset !important",
              transition: "background-color 5000s ease-in-out 0s",
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
          InputLabelProps={{ style: { color: theme.palette.text.placeholder } }}
          sx={{
            input: {
              WebkitTextFillColor: "#ffffff !important",
              WebkitBoxShadow: "0 0 0px 1000px #3B3C4B inset !important",
              transition: "background-color 5000s ease-in-out 0s",
            },
          }}
        />
        <TextField
          label="Verification Code"
          name="verificationCode"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            style: { color: theme.palette.text.placeholder },
          }}
        />
        <Button variant="contained" color="info" onClick={handleVerify}>
          Verify
        </Button>

        <Button variant="contained" color="info" onClick={handleSignUp}>
          Sign Up
        </Button>
        <Button variant="contained" color="info" onClick={handleResendCode}>
          Resend Verification Code
        </Button>
      </form>
    </ThemeProvider>
  );
};

export default SignUpForm;
