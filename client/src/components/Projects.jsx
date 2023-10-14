import React from 'react';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import Files from './Files';
import Collaborators from './Collaborators.jsx';
import Messages from './Messages';
import Settings from './Settings';

function Projects({ handleFileUpload }) {
  const { path } = useRouteMatch();

  return (
    <>
      <div style={{ padding: '16px', borderBottom: '1px solid #ccc' }}>
        <NavLink to={`${path}/files`} activeClassName="activeLink" style={{ marginRight: '16px', textDecoration: 'none', color: 'inherit' }}>
          Files
        </NavLink>
        <NavLink to={`${path}/collaborators`} activeClassName="activeLink" style={{ marginRight: '16px', textDecoration: 'none', color: 'inherit' }}>
          Collaborators
        </NavLink>
        <NavLink to={`${path}/messages`} activeClassName="activeLink" style={{ marginRight: '16px', textDecoration: 'none', color: 'inherit' }}>
          Messages
        </NavLink>
        <NavLink to={`${path}/settings`} activeClassName="activeLink" style={{ textDecoration: 'none', color: 'inherit' }}>
          Settings
        </NavLink>
      </div>
      <Switch>
        <Route path={`${path}/files`} render={() => <Files handleFileUpload={handleFileUpload} />} />
        <Route path={`${path}/collaborators`} component={Collaborators} />
        <Route path={`${path}/messages`} component={Messages} />
        <Route path={`${path}/settings`} component={Settings} />
      </Switch>
    </>
  );
}

export default Projects;
