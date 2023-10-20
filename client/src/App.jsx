import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import SplashPage from "./components/SplashPage";
import Connect from "./components/Connect";
import ProjectsPage from "./components/ProjectsPage";
import Project from "./components/Project";
import Requests from "./components/Requests";
import ProfilePage from "./components/ProfilePage";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { Amplify } from "aws-amplify";
import awsmobile from "../../src/aws-exports";

// Initialize Amplify
Amplify.configure(awsmobile);

function App() {
  const bodyStyle = {
    backgroundColor: "#090810",
    margin: 0,
    padding: 0,
    minHeight: "100vh",
  };
  const { user } = useAuth(); // Access user from the context

  return (
    <AuthProvider>
      <Router>
        <div style={bodyStyle}>
          <NavBar />
          <Switch>
            <Route path="/" exact render={() => <SplashPage />} />
            {user ? (
              <>
                <Route path="/projects" exact component={ProjectsPage} />
                <Route path="/projects/:projectId" component={Project} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/connect" component={Connect} />
                <Route path="/requests" component={Requests} />
              </>
            ) : null}
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
