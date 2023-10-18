import React from 'react';
import {
  Container,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Avatar,
  useTheme,
  Paper,
  Card,
  CardContent,
} from '@mui/material';

const Messages = ({ projectId }) => {
  const theme = useTheme();

  // Mock data for messages
  const messages = [
    { id: 1, sender: 'John Doe', content: 'Hey, I love electronic music! 🎧', timestamp: '10:30 AM' },
    { id: 2, sender: 'Jane Smith', content: 'Me too! What\'s your favorite sub-genre?', timestamp: '10:35 AM' },
    { id: 3, sender: 'Bob Johnson', content: 'I\'m into techno and house. What about you?', timestamp: '10:40 AM' },
  ];

  return (
    <Container
      maxWidth="xl"
      sx={{ background: "#090810", marginTop: "0rem", paddingTop: "2rem" }}
    >
      <Container maxWidth="md" sx={{ background: "#090810", padding: '2rem' }}>
        <Typography variant="h4" style={{ color: theme.palette.text.primary, marginBottom: '1rem' }}>
          Messages for Project {projectId}
        </Typography>

        <Typography variant="body1" style={{ color: theme.palette.text.primary, marginBottom: '1rem' }}>
          Coming soon, you will be able to do real time messaging between users who you have invited to collaborate on your projects
        </Typography>
        <Paper elevation={3} sx={{ background: "#090810", padding: '1rem', maxHeight: '400px', overflowY: 'auto' }}>
          {/* List of mock messages */}
          <List>
            {messages.map((message) => (
              <Card key={message.id} sx={{ marginBottom: '16px' }}>
                <CardContent>
                  <ListItem>
                    <Avatar sx={{ bgcolor: theme.palette.info, marginRight: '8px' }}>
                      {message.sender[0]}
                    </Avatar>
                    <ListItemText
                      primary={message.sender}
                      secondary={`${message.timestamp} - ${message.content}`}
                      sx={{ color: theme.palette.text.primary }}
                    />
                  </ListItem>
                </CardContent>
              </Card>
            ))}
          </List>
        </Paper>

        {/* Input field for a new message */}
        <TextField
          label="Type your message..."
          fullWidth
          variant="outlined"
          margin="normal"
          InputLabelProps={{ style: { color: theme.palette.text.placeholder } }}
          InputProps={{
            style: { color: theme.palette.text.primary },
          }}
        />
      </Container>
    </Container>
  );
};

export default Messages;
