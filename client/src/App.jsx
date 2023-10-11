import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import SplashPage from './components/SplashPage'; // Import the SplashPage component
import Projects from './components/Projects';
import Connect from './components/Connect';
import { Amplify, Storage } from 'aws-amplify';
import awsConfig from '../src/aws-exports';

Amplify.configure(awsConfig);

function App() {
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
      <NavBar />
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <SplashPage />
          )}
        />
        <Route path="/projects" render={() => (
          <Projects
            handleFileUpload={handleFileUpload} // Pass the function to Projects
          />
        )} />
        <Route path="/connect" component={Connect} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;
