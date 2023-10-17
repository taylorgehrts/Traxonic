import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import SplashPage from './components/SplashPage';
import Connect from './components/Connect';
import ProjectsPage from './components/ProjectsPage';
import Project from './components/Project';
import { AuthProvider } from './components/AuthContext'; // Update this path
import { Amplify } from 'aws-amplify';
import awsmobile from '../../src/aws-exports';

// Initialize Amplify
Amplify.configure(awsmobile);

function App() {
  const bodyStyle = {
    backgroundColor: '#090810',
    margin: 0,
    padding: 0,
    minHeight: '100vh',
  };
  return (
    <AuthProvider>
      <Router>
      <div style={bodyStyle}>
        <NavBar />
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <SplashPage />
            )}
          />
          <Route path="/projects" exact component={ProjectsPage} />
          <Route path="/projects/:projectId" component={Project} />
          <Route path="/connect" component={Connect} />
          {/* Add more routes as needed */}
        </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
