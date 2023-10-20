import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  useTheme,
} from "@mui/material";

function Settings({ projectId }) {
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [bpm, setBpm] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    console.log("Saved changes");
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
          Settings for Project {projectId}
        </Typography>

        {/* Form for project settings */}
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputLabelProps={{ style: { color: theme.palette.text.placeholder } }}
          InputProps={{ style: { color: theme.palette.text.primary } }}
        />

        <TextField
          label="Genre"
          fullWidth
          margin="normal"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          InputLabelProps={{ style: { color: theme.palette.text.placeholder } }}
          InputProps={{ style: { color: theme.palette.text.primary } }}
        />

        <TextField
          label="BPM"
          type="number"
          fullWidth
          margin="normal"
          value={bpm}
          onChange={(e) => setBpm(e.target.value)}
          InputLabelProps={{ style: { color: theme.palette.text.placeholder } }}
          InputProps={{ style: { color: theme.palette.text.primary } }}
        />

        <TextField
          label="Description"
          multiline
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          InputLabelProps={{ style: { color: theme.palette.text.placeholder } }}
          InputProps={{ style: { color: theme.palette.text.primary } }}
        />

        <Button
          variant="contained"
          color="info"
          onClick={handleSave}
          style={{ marginTop: "16px" }}
        >
          Save
        </Button>
      </Container>
    </Container>
  );
}

export default Settings;
