import React, { useEffect, useState } from "react";
import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom";
import Files from "./Files";
import Collaborators from "./Collaborators.jsx";
import Messages from "./Messages";
import Settings from "./Settings";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FIND_PROJECT_BY_ID } from "../utils/queries"; 

function Project() {
  const { path, url } = useRouteMatch(); 
  const { projectId } = useParams();
  console.log("Console log of projectId", projectId);

  // Use the useQuery to fetch project details
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
      <div style={{ padding: "16px", marginLeft: "20px", marginRight: "20px", borderBottom: "1px solid #ccc" }}>
        <NavLink
          to={`${url}/files/`} 
          activeClassName="activeLink"
          style={{
            marginRight: "16px",
            margin: "16px",
            textDecoration: "none",
            color: "white",
          }}
          activeStyle={{
            color: 'gray', 
          }}
        >
          Files
        </NavLink>
        <NavLink
          to={`${url}/collaborators`} 
          activeClassName="activeLink"
          style={{
            marginRight: "16px",
            textDecoration: "none",
            color: "white",
          }}
          activeStyle={{
            color: 'gray', 
          }}
        >
          Collaborators
        </NavLink>
        <NavLink
          to={`${url}/messages`} 
          activeClassName="activeLink"
          style={{
            marginRight: "16px",
            textDecoration: "none",
            color: "white",
          }}
          activeStyle={{
            color: 'gray', 
          }}
        >
          Messages
        </NavLink>
        <NavLink
          to={`${url}/settings`} 
          activeClassName="activeLink"
          style={{
            textDecoration: "none",
            color: "white",
          }}
          activeStyle={{
            color: 'gray', 
          }}
        >
          Settings
        </NavLink>
      </div>
      <Switch>
        <Route
          exact
          path={`${path}/files/`} // add route for files
          render={(props) => (
            <Files
              {...props}
              projectId={projectDetails.title}
              realProjectId={projectDetails.id}
            />
          )}
        />
        <Route
          path={`${path}/collaborators`} // Add Route for Collaborators
          render={(props) => (
            <Collaborators {...props} projectId={projectDetails.title} />
          )}
        />
        <Route
          path={`${path}/messages`} // Add Route for Messages
          render={(props) => (
            <Messages {...props} projectId={projectDetails.title} />
          )}
        />
        <Route
          path={`${path}/settings`} // Add Route for Settings
          render={(props) => (
            <Settings {...props} projectId={projectDetails.title} />
          )}
        />
        <Route
          render={(props) => (
            <Files
              {...props}
              projectId={projectDetails.title}
              realProjectId={projectDetails.id}
            />
          )}
        />
      </Switch>
    </>
  );
}

export default Project;
