import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home'; // Import your home component
import Projects from './components/Projects'; // Import your projects component
import Connect from './components/Connect'; // Import your connect component

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/projects" component={Projects} />
        <Route path="/connect" component={Connect} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;
