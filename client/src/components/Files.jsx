import React, { useState } from "react";
import { handleFileUpload } from "./FileUtils";
import {
  Button,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Checkbox,
  IconButton,
  ThemeProvider,
  useMediaQuery,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import theme from "../theme";

function Files({ projectId, realProjectId }) {
  console.log("Project ID in the files.jsx:", projectId);
  console.log("Real Project ID in the Files.jsx:", realProjectId);

  // Sample file data for illustration purposes
  const files = [
    { id: 1, name: "File 1", duration: "3:45", size: "5MB" },
    { id: 2, name: "File 2", duration: "2:30", size: "3MB" },
    // ... add more file data as needed
  ];

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleCheckboxChange = (fileId) => {
    setSelectedFiles((prevSelected) => {
      if (prevSelected.includes(fileId)) {
        // Deselect file
        return prevSelected.filter((id) => id !== fileId);
      } else {
        // Select file
        return [...prevSelected, fileId];
      }
    });
  };

  const handleDeleteIconClick = () => {
    // Handle deletion logic here
    console.log("Selected files to delete:", selectedFiles);

    // Assuming you have a function to remove files
    // handleRemoveFile function needs to be implemented
    selectedFiles.forEach((fileId) => {
      handleRemoveFile(fileId);
    });

    // Clear selected files after deletion
    setSelectedFiles([]);
  };

  const handleDownloadIconClick = () => {
    // Handle download logic here
    console.log("Selected files to download:", selectedFiles);
    // Implement the logic to download selected files
  };

  const handleRemoveFile = (fileId) => {
    // Implement the logic to remove the file based on fileId
    console.log("File removed successfully:", fileId);
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
              Files for Project {projectId}
            </Typography>
            <Button
              variant="contained"
              color="info"
              component="label"
              style={{ marginLeft: "auto" }}
            >
              Choose File
              <input type="file" onChange={(event) => handleFileUpload(event, realProjectId)} style={{ display: "none" }} />
            </Button>
          </Box>

          {/* Download and Delete Icons */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
            {isSmallScreen ? (
              <>
                <IconButton
                  style={{ color: "#FFFFFF", cursor: "pointer" }}
                  onClick={handleDownloadIconClick}
                >
                  <DownloadIcon />
                </IconButton>
                <IconButton
                  style={{ color: "#FFFFFF", cursor: "pointer" }}
                  onClick={handleDeleteIconClick}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  style={{ color: "#FFFFFF", cursor: "pointer", marginRight: "8px" }}
                  onClick={handleDeleteIconClick}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  style={{ color: "#FFFFFF", cursor: "pointer" }}
                  onClick={handleDownloadIconClick}
                >
                  <DownloadIcon />
                </IconButton>
              </>
            )}
          </div>

          {/* File List Header */}
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
              checked={selectedFiles.length === files.length}
              onChange={() =>
                setSelectedFiles(
                  selectedFiles.length === files.length
                    ? []
                    : files.map((file) => file.id)
                )
              }
              />
            )}
            <ListItemText primary="Name" sx={{ color: "#FFFFFF", flex: 1 }} />
            {!isSmallScreen && (
              <>
                <ListItemText primary="Duration" sx={{ color: "#FFFFFF", flex: 1 }} />
                <ListItemText primary="Size" sx={{ color: "#FFFFFF", flex: 1 }} />
                <ListItemText primary="Upload" sx={{ color: "#FFFFFF", flex: 1 }} />
              </>
            )}
          </ListItem>
          <Divider sx={{ backgroundColor: "#FFFFFF" }} />

          {/* File List */}
          {files.map((file) => (
            <React.Fragment key={file.id}>
              <ListItem
                sx={{
                  background: "#090810",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Checkbox
                    color="default"
                    style={{ marginRight: "8px" }}
                    checked={selectedFiles.includes(file.id)}
                    onChange={() => handleCheckboxChange(file.id)}
                  />
                <ListItemText primary={file.name} sx={{ color: "#FFFFFF", flex: 1 }} />
                {!isSmallScreen && (
                  <>
                    <ListItemText primary={file.duration} sx={{ color: "#FFFFFF", flex: 1 }} />
                    <ListItemText primary={file.size} sx={{ color: "#FFFFFF", flex: 1 }} />
                    {/* Placeholder for Upload button */}
                    <ListItemText primary="Upload Button" sx={{ color: "#FFFFFF", flex: 1 }} />
                  </>
                )}
              </ListItem>
              <Divider sx={{ backgroundColor: "#FFFFFF" }} />
            </React.Fragment>
          ))}
        </Container>
      </Container>
    </ThemeProvider>
  );
}

export default Files;