import React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AuthProvider } from "./components/AuthContext";

// Import BrowserRouter
import { BrowserRouter as Router } from "react-router-dom";

// const httpLink = createHttpLink({
//   uri: 'http://localhost:3001/graphql',
// });

const httpLink = createHttpLink({
  uri: "/graphql", // set for deploy
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("authToken");
  // console.log('Token from localStorage:', token);
  // console.log('Existing headers:', headers);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const AppWithApollo = () => (
  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>
);

createRoot(document.getElementById("root")).render(
  <>
    <CssBaseline />
    <Router>
      <ThemeProvider theme={theme}>
        <AppWithApollo />
      </ThemeProvider>
    </Router>
  </>
);
