import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import SplashPage from './components/SplashPage';
import Projects from './components/Projects';
import Connect from './components/Connect';
import { Amplify, Auth, Storage } from 'aws-amplify';
import awsConfig from '../src/aws-exports';

Amplify.configure(awsConfig);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser(); // Check for user on initial load
  }, []);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser();
      setUser(authUser);
    } catch (error) {
      setUser(null);
    }
  };

  // Function to handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    try {
      // Upload the file to the root of the S3 bucket
      const result = await Storage.put(file.name, file);
      console.log('File uploaded successfully:', result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Router>
      <NavBar user={user} />
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <SplashPage user={user} />
          )}
        />
        <Route path="/projects" render={() => (
          <Projects
            handleFileUpload={handleFileUpload} // Pass the function to Projects
            user={user}
          />
        )} />
        <Route path="/connect" component={Connect} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;
