// Import the necessary components
import React, { useEffect, useState } from 'react';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import Files from './Files';
import Collaborators from './Collaborators.jsx';
import Messages from './Messages';
import Settings from './Settings';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FIND_PROJECT_BY_ID } from '../utils/queries'; // Replace with the actual path

function Project() {
  const { path, url } = useRouteMatch(); // Destructure url
  const { projectId } = useParams();
  console.log("Console log of projectId", projectId);

  // Use the useQuery hook to fetch project details
  const { loading, error, data } = useQuery(FIND_PROJECT_BY_ID, {
    variables: { projectId: projectId },
  });

  // State to store project details
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    // Check if data has been fetched and update state
    if (data) {
      setProjectDetails(data.findProjectById);
    }
  }, [data]);
  console.log("Console log of project details", projectDetails);

  // Render loading or error state
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!projectDetails) return <p>No project details available.</p>;

  return (
    <>
      <div style={{ padding: '16px', borderBottom: '1px solid #ccc' }}>
        <NavLink
          to={`${url}/files/`} // Use url here
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
          to={`${url}/collaborators`} // Add NavLink for Collaborators
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
          to={`${url}/messages`} // Add NavLink for Messages
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
          to={`${url}/settings`} // Add NavLink for Settings
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
          path={`${path}/files/`} // Update the path here
          render={(props) => <Files {...props} projectId={projectDetails.title} realProjectId={projectDetails.id}/>}
        />
        <Route
          path={`${path}/collaborators`} // Add Route for Collaborators
          render={(props) => <Collaborators {...props} projectId={projectDetails.title}  />}
        />
        <Route
          path={`${path}/messages`} // Add Route for Messages
          render={(props) => <Messages {...props} projectId={projectDetails.title} />}
        />
        <Route
          path={`${path}/settings`} // Add Route for Settings
          render={(props) => <Settings {...props} projectId={projectDetails.title} />}
        />
      </Switch>
    </>
  );
}

export default Project;
