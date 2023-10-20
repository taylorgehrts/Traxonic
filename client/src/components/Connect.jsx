import React from 'react';
import {
  Container,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Divider,
  useTheme,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Connect = () => {
  const theme = useTheme();

  // Mock data for collaborators
  const collaborators = [
    { id: 1, name: 'John Doe', instrument: 'Guitar', genre: 'Rock' },
    { id: 2, name: 'Jane Smith', instrument: 'Piano', genre: 'Classical' },
    { id: 3, name: 'Bob Johnson', instrument: 'Drums', genre: 'Pop' },
  ];

  // Track selected collaborators
  const [selectedCollaborators, setSelectedCollaborators] = React.useState([]);

  const handleCheckboxChange = (collaboratorId) => {
    setSelectedCollaborators((prevSelected) => {
      if (prevSelected.includes(collaboratorId)) {
        // Deselect collaborator
        return prevSelected.filter((id) => id !== collaboratorId);
      } else {
        // Select collaborator
        return [...prevSelected, collaboratorId];
      }
    });
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ background: "#090810", marginTop: "0rem", paddingTop: "2rem" }}
    >
      <Container maxWidth="md" sx={{ background: "#090810", padding: '2rem' }}>
        <Typography variant="h4" style={{ color: theme.palette.text.primary, marginBottom: '1rem' }}>
          Find Collaborators
        </Typography>

        {/* Mock search field */}
        <TextField
          label="Search for collaborators"
          fullWidth
          variant="outlined"
          margin="normal"
          InputLabelProps={{ style: { color: theme.palette.text.placeholder } }}
          InputProps={{
            style: { color: theme.palette.text.primary },
          }}
        />

        
        <Typography variant="body1" style={{ color: theme.palette.text.primary, marginBottom: '1rem' }}>
          Coming soon, you will be able to search for other users and invite them to collaborate on your projects.
          This will grant them access to your projects, allowing the free flow of musical ideas.
        </Typography>

        
        <IconButton
          color="info"
          aria-label="add collaborator"
          style={{ marginBottom: '1rem' }}
        >
          <AddIcon />
        </IconButton>

        {/* List of mock collaborators */}
        <List>
          {collaborators.map((collaborator) => (
            <React.Fragment key={collaborator.id}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  background: theme.palette.background.paper,
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Checkbox
                  color="default"
                  style={{ marginRight: '8px' }}
                  checked={selectedCollaborators.includes(collaborator.id)}
                  onChange={() => handleCheckboxChange(collaborator.id)}
                />
                <ListItemText
                  primary={collaborator.name}
                  secondary={`Instrument: ${collaborator.instrument}, Genre: ${collaborator.genre}`}
                  sx={{ color: theme.palette.text.primary, flex: 1, cursor: 'pointer' }}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Container>
    </Container>
  );
};

export default Connect;

