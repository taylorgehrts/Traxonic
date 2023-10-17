import React, { useState } from "react";
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
  Checkbox,
  Divider,
  Modal,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT, REMOVE_PROJECT } from "../utils/mutations";
import { GET_PROJECTS, FIND_USER } from "../utils/queries";
import theme from "../theme";
import { useHistory } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from '@mui/material/ListItemIcon';

const ProjectsPage = () => {
  const history = useHistory();
  const userId = localStorage.getItem("userId");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { loading, error, data } = useQuery(GET_PROJECTS, {
    variables: { userId },
  });

  const { loading: userLoading, error: userError, data: userData } =
    useQuery(FIND_USER, {
      variables: { id: userId },
    });

  const projects = data ? data.getProjects : [];
  const user = userData ? userData.findUser : null;

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [bpm, setBpm] = useState(0);
  const [description, setDescription] = useState("");
  const [selectedProjects, setSelectedProjects] = useState([]); // Track selected projects
  const [showForm, setShowForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [addProject] = useMutation(ADD_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS, variables: { userId } }],
  });

  const [removeProject] = useMutation(REMOVE_PROJECT, {
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
      handleCloseModal();
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleProjectClick = (projectId) => {
    history.push(`/projects/${projectId}`);
  };

  const handleRemoveProject = async (projectId) => {
    try {
      const result = await removeProject({
        variables: { projectId },
      });

      // Handle the result or show a success message
      console.log('Project removed successfully:', result);

    } catch (error) {
      console.error('Error removing project:', error);
      // Handle the error or show an error message
    }
  };

  const handleDeleteIconClick = () => {
    // Handle deletion logic here
    console.log("Selected projects to delete:", selectedProjects);

    // Assuming you have a function to remove projects
    selectedProjects.forEach((projectId) => {
      handleRemoveProject(projectId);
    });

    // Clear selected projects after deletion
    setSelectedProjects([]);
  };

  const handleCheckboxChange = (projectId) => {
    setSelectedProjects((prevSelected) => {
      if (prevSelected.includes(projectId)) {
        // Deselect project
        return prevSelected.filter((id) => id !== projectId);
      } else {
        // Select project
        return [...prevSelected, projectId];
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ background: "#090810", marginTop: "0rem", paddingTop: "2rem" }}>
        <Container maxWidth="md">
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <Typography variant="h4" style={{ color: "#FFFFFF" }}>
              Your Projects
            </Typography>
            <Button
              variant="contained"
              color="info"
              onClick={handleOpenModal}
              style={{
                display: isSmallScreen ? "block" : "inline-block",
                marginLeft: "auto",
                marginTop: isSmallScreen ? "1rem" : "0",
              }}
            >
              Create New Project
            </Button>
          </Box>

          {/* Header row */}
          <ListItem
            sx={{
              background: "#090810",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {isSmallScreen && (
              <ListItemIcon
                style={{ color: "#FFFFFF", cursor: "pointer", marginRight: "-18px" }}
                onClick={handleDeleteIconClick}
              >
                <DeleteIcon />
              </ListItemIcon>
            )}
            <ListItemText primary="Title" sx={{ color: "#FFFFFF", flex: 1 }} />
            {!isSmallScreen && (
              <>
                <ListItemText primary="Genre" sx={{ color: "#FFFFFF", flex: 1 }} />
                <ListItemText primary="BPM" sx={{ color: "#FFFFFF", flex: 1 }} />
                <ListItemText primary="Owner" sx={{ color: "#FFFFFF", flex: 1 }} />
                <ListItemIcon
                  style={{ color: "#FFFFFF", cursor: "pointer", marginRight: "-18px" }}
                  onClick={handleDeleteIconClick}
                >
                  <DeleteIcon />
                </ListItemIcon>
              </>
            )}
          </ListItem>
          <Divider sx={{ backgroundColor: "#FFFFFF" }} />

          {/* List of user's projects */}
          <List>
            {projects.map((project) => (
              <React.Fragment key={project.id}>
                <ListItem
                  sx={{
                    background: "#090810",
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {isSmallScreen && (
                    <Checkbox
                      color="default"
                      style={{ marginRight: "8px" }}
                      checked={selectedProjects.includes(project.id)}
                      onChange={() => handleCheckboxChange(project.id)}
                    />
                  )}
                  <ListItemText
                    primary={project.title}
                    sx={{ color: "#FFFFFF", flex: 1, cursor: "pointer" }}
                    onClick={() => handleProjectClick(project.id)}
                  />
                  {!isSmallScreen && (
                    <>
                      <ListItemText primary={project.genre} sx={{ color: "#FFFFFF", flex: 1 }} />
                      <ListItemText primary={project.bpm} sx={{ color: "#FFFFFF", flex: 1 }} />
                      <ListItemText
                        primary={user ? user.username : "Unknown"}
                        sx={{ color: "#FFFFFF", flex: 1 }}
                      />
                    </>
                  )}
                  {!isSmallScreen && (
                    <Checkbox
                      color="default"
                      checked={selectedProjects.includes(project.id)}
                      onChange={() => handleCheckboxChange(project.id)}
                    />
                  )}
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFFFFF" }} />
              </React.Fragment>
            ))}
          </List>
        </Container>

        <Modal open={openModal} onClose={handleCloseModal}>
          <Paper
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom style={{ color: "#FFFFFF" }}>
              Create New Project
            </Typography>
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
                    color: "#FFFFFF",
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
                    color: "#FFFFFF",
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
                    color: "#FFFFFF",
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
                    color: "#FFFFFF",
                  },
                }}
              />
              <Button
                variant="contained"
                color="info"
                onClick={handleAddProject}
                style={{ marginTop: "16px" }}
              >
                Add Project
              </Button>
            </form>
          </Paper>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default ProjectsPage;
