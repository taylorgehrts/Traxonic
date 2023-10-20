import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  useTheme,
} from "@mui/material";

const Requests = () => {
  const theme = useTheme();

  // Mock data for collaboration requests
  const collaborationRequests = [
    { id: 1, sender: "John Doe", project: "Project X" },
    { id: 2, sender: "Jane Smith", project: "Project Y" },
    { id: 3, sender: "Bob Johnson", project: "Project Z" },
  ];

  const handleAcceptRequest = (requestId) => {
    // Handle logic for accepting the collaboration request
    console.log(`Accepted collaboration request with ID ${requestId}`);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ background: "#090810", marginTop: "0rem", paddingTop: "2rem" }}
    >
      <Container maxWidth="md" sx={{ background: "#090810", padding: "2rem" }}>
        <Typography
          variant="h4"
          style={{ color: theme.palette.text.primary, marginBottom: "1rem" }}
        >
          Collaboration Requests
        </Typography>
        <Typography
          variant="body1"
          style={{ color: theme.palette.text.primary, marginBottom: "1rem" }}
        >
          Coming soon, you will be able to accept collaboration requests from
          other users
        </Typography>

        {collaborationRequests.map((request) => (
          <Card
            key={request.id}
            sx={{
              marginBottom: "16px",
              backgroundColor: "#1C1C1C",
              color: "#FFFFFF",
            }}
          >
            <CardContent>
              <Typography variant="h6">
                {request.sender} wants to collaborate on {request.project}
              </Typography>
              <Button
                variant="contained"
                color="info"
                onClick={() => handleAcceptRequest(request.id)}
                style={{ marginTop: "8px" }}
              >
                Accept
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* Message when there are no requests */}
        {collaborationRequests.length === 0 && (
          <Typography style={{ color: theme.palette.text.primary }}>
            No collaboration requests at the moment.
          </Typography>
        )}
      </Container>
    </Container>
  );
};

export default Requests;
