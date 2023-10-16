import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Container, Typography, ThemeProvider } from '@mui/material';
import { ADD_PROJECT } from '../utils/mutations';
import theme from '../theme';

const ProjectsPage = ({ userId }) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [bpm, setBpm] = useState(0);
  const [description, setDescription] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [addProject] = useMutation(ADD_PROJECT);

  const handleAddProject = async () => {
    try {
      // Retrieve user ID from local storage
      const userId = localStorage.getItem('userId');
  
      const result = await addProject({
        variables: {
          userId,
          title,
          genre,
          bpm,
          description,
        },
      });
  
      // Handle the result as needed
      console.log('Project added successfully:', result.data.addProject);
  
      // Clear the form fields after successful submission
      setTitle('');
      setGenre('');
      setBpm();
      setDescription('');
  
      // After successfully adding a project, hide the form
      setShowForm(false);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth="xl"  sx={{ background: '#090810' }}>
      <Container maxWidth="md" style={{ marginTop: '1rem' }}>
        <Typography variant="h4" gutterBottom >
          Your Projects
        </Typography>

        {/* List of user's projects */}
        {/* (You can map over the user's projects and display them here) */}

        <Button
          variant="contained"
          color="info"
          onClick={() => setShowForm(true)}
          style={{ marginTop: '16px' }}
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
              InputLabelProps={{ style: { color: theme.palette.text.placeholder } }}
              sx={{
                input: {
                  WebkitTextFillColor: '#ffffff !important',
                  WebkitBoxShadow: '0 0 0px 1000px #3B3C4B inset !important',
                  transition: 'background-color 5000s ease-in-out 0s',
                },
              }}
            />
            <TextField
              label="Genre"
              fullWidth
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              margin="normal"
              InputLabelProps={{ style: { color: theme.palette.text.placeholder } }}
              sx={{
                input: {
                  WebkitTextFillColor: '#ffffff !important',
                  WebkitBoxShadow: '0 0 0px 1000px #3B3C4B inset !important',
                  transition: 'background-color 5000s ease-in-out 0s',
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
              InputLabelProps={{ style: { color: theme.palette.text.placeholder } }}
              sx={{
                input: {
                  WebkitTextFillColor: '#ffffff !important',
                  WebkitBoxShadow: '0 0 0px 1000px #3B3C4B inset !important',
                  transition: 'background-color 5000s ease-in-out 0s',
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
              InputLabelProps={{ style: { color: theme.palette.text.placeholder } }}
              sx={{
                input: {
                  WebkitTextFillColor: '#ffffff !important',
                  WebkitBoxShadow: '0 0 0px 1000px #3B3C4B inset !important',
                  transition: 'background-color 5000s ease-in-out 0s',
                },
              }}
            />
            <Button variant="contained" color="info" onClick={handleAddProject}>
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
