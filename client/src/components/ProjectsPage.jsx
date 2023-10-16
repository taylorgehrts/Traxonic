import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  TextField,
  Button,
  Container,
  Typography,
  ThemeProvider,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ADD_PROJECT } from "../utils/mutations";
import { GET_PROJECTS, FIND_USER } from "../utils/queries";

import theme from "../theme";

const ProjectsPage = () => {
  const userId = localStorage.getItem("userId");

  // Use the GET_PROJECTS query to fetch projects
  const { loading, error, data } = useQuery(GET_PROJECTS, {
    variables: { userId },
  });

  // Use the FIND_USER query to fetch user details
  const { loading: userLoading, error: userError, data: userData } = useQuery(FIND_USER, {
    variables: { id: userId },
  });

  const projects = data ? data.getProjects : [];
  const user = userData ? userData.findUser : null;

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [bpm, setBpm] = useState(0);
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [addProject] = useMutation(ADD_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS, variables: { userId } }],
  });

  const handleAddProject = async () => {
    try {
      const result = await addProject({
        variables: {
          userId,
          title,
          genre,
          bpm,
          description,
        },
      });

      console.log("Project added successfully:", result.data.addProject);

      setTitle("");
      setGenre("");
      setBpm(0);
      setDescription("");

      setShowForm(false);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ background: "#090810" }}>
        <Container maxWidth="md" style={{ marginTop: "1rem" }}>
          <Typography variant="h4" gutterBottom>
            Your Projects
          </Typography>

          {/* List of user's projects */}
          <List>
          {projects.map((project) => (
    <ListItem
      key={project.id}
      sx={{ background: "#121212", marginBottom: "8px" }}
    >
      <Paper elevation={3} sx={{ padding: "16px", width: "100%" }}>
        <ListItemText
          primary={project.title}
          secondary={`Genre: ${project.genre} | BPM: ${
            project.bpm
          } | Owner: ${
            user ? user.username : "Unknown"
          }`}
        />
        {/* Add other project details as needed */}
      </Paper>
    </ListItem>
  ))}
          </List>

          <Button
            variant="contained"
            color="info"
            onClick={() => setShowForm(true)}
            style={{ marginTop: "16px" }}
          >
            Create New Project
          </Button>

          {showForm && (
            <form>
              <TextField
                label="Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                InputLabelProps={{
                  style: { color: theme.palette.text.placeholder },
                }}
                sx={{
                  input: {
                    WebkitTextFillColor: "#ffffff !important",
                    WebkitBoxShadow: "0 0 0px 1000px #3B3C4B inset !important",
                    transition: "background-color 5000s ease-in-out 0s",
                  },
                }}
              />
              <TextField
                label="Genre"
                fullWidth
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                margin="normal"
                InputLabelProps={{
                  style: { color: theme.palette.text.placeholder },
                }}
                sx={{
                  input: {
                    WebkitTextFillColor: "#ffffff !important",
                    WebkitBoxShadow: "0 0 0px 1000px #3B3C4B inset !important",
                    transition: "background-color 5000s ease-in-out 0s",
                  },
                }}
              />
              <TextField
                label="BPM"
                type="number"
                fullWidth
                value={bpm}
                onChange={(e) => setBpm(Number(e.target.value))}
                margin="normal"
                InputLabelProps={{
                  style: { color: theme.palette.text.placeholder },
                }}
                sx={{
                  input: {
                    WebkitTextFillColor: "#ffffff !important",
                    WebkitBoxShadow: "0 0 0px 1000px #3B3C4B inset !important",
                    transition: "background-color 5000s ease-in-out 0s",
                  },
                }}
              />
              <TextField
                label="Description"
                multiline
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                InputLabelProps={{
                  style: { color: theme.palette.text.placeholder },
                }}
                sx={{
                  input: {
                    WebkitTextFillColor: "#ffffff !important",
                    WebkitBoxShadow: "0 0 0px 1000px #3B3C4B inset !important",
                    transition: "background-color 5000s ease-in-out 0s",
                  },
                }}
              />
              <Button
                variant="contained"
                color="info"
                onClick={handleAddProject}
              >
                Add Project
              </Button>
            </form>
          )}
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default ProjectsPage;
