import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import SplashPage from './components/SplashPage';
import Connect from './components/Connect';
import ProjectsPage from './components/ProjectsPage';
import { AuthProvider } from './components/AuthContext'; // Update this path
import { Amplify } from 'aws-amplify';
import awsmobile from '../../src/aws-exports';

// Initialize Amplify
Amplify.configure(awsmobile);

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <SplashPage />
            )}
          />
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/connect" component={Connect} />
          {/* Add more routes as needed */}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
