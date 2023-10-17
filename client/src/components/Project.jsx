import React, { useEffect, useState } from 'react';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import Files from './Files';
import Collaborators from './Collaborators.jsx';
import Messages from './Messages';
import Settings from './Settings';
import { useParams } from 'react-router-dom';

function Project({ handleFileUpload }) {
  const { path } = useRouteMatch();
  const { projectId } = useParams();

  // State to store project details
  const [projectDetails, setProjectDetails] = useState(null);

  // Placeholder function to fetch project details
  const fetchProjectDetails = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}`);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      // Check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setProjectDetails(data);
      } else {
        // Log the non-JSON response
        console.error('Non-JSON response:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };
  
  

  useEffect(() => {
    // Fetch project details when component mounts
    fetchProjectDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]); // Fetch details whenever projectId changes

  return (
    <>
      <div style={{ padding: '16px', borderBottom: '1px solid #ccc' }}>
        <NavLink
          to={`${path}/files`}
          activeClassName="activeLink"
          style={{
            marginRight: '16px',
            textDecoration: 'none',
            color: 'white',
          }}
        >
          Files
        </NavLink>
        <NavLink
          to={`${path}/collaborators`}
          activeClassName="activeLink"
          style={{
            marginRight: '16px',
            textDecoration: 'none',
            color: 'white',
          }}
        >
          Collaborators
        </NavLink>
        <NavLink
          to={`${path}/messages`}
          activeClassName="activeLink"
          style={{
            marginRight: '16px',
            textDecoration: 'none',
            color: 'white',
          }}
        >
          Messages
        </NavLink>
        <NavLink
          to={`${path}/settings`}
          activeClassName="activeLink"
          style={{
            textDecoration: 'none',
            color: 'white',
          }}
        >
          Settings
        </NavLink>
      </div>
      <Switch>
      <Route
  path={`${path}/files`}
  render={() => <Files  projectId={projectId} />}
/>
        <Route path={`${path}/collaborators`} component={Collaborators} />
        <Route path={`${path}/messages`} component={Messages} />
        <Route
          path={`${path}/settings`}
          render={() => <Settings projectDetails={projectDetails} />}
        />
      </Switch>
    </>
  );
}

export default Project;
