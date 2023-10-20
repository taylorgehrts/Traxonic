import React, { useState, useEffect, useRef } from "react";
import { Storage } from "aws-amplify";
import {
  Button,
  Container,
  Typography,
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
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import theme from "../theme";
import { handleFileUpload } from "./fileUtils";

function Files({ projectId, realProjectId }) {
  console.log("Project ID in the files.jsx:", projectId);
  console.log("Real Project ID in the Files.jsx:", realProjectId);

  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const audioPlayerRef = useRef(null);
  const [playingFile, setPlayingFile] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    
    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current.src = "";
      }
    };
  }, []);

  const handleCheckboxChange = (fileKey) => {
    setSelectedFiles((prevSelected) => {
      if (prevSelected.includes(fileKey)) {
        // Deselect file
        return prevSelected.filter((key) => key !== fileKey);
      } else {
        // Select file
        return [...prevSelected, fileKey];
      }
    });
  };

  const handlePlayPause = async (fileKey) => {
    try {
      const fileName = extractFileName(fileKey);
      const newAudioUrl = await Storage.get(`projects/${realProjectId}/${fileName}`);

      if (playingFile === fileKey) {
        // Pause if the same file is playing
        audio.pause();
        setPlayingFile(null);
      } else {
        // Play if a different file is selected
        if (audioUrl !== newAudioUrl) {
          // Set the new audio source only if it's different
          setAudioUrl(newAudioUrl);
          audio.src = newAudioUrl;
        }
        audio.play();
        setPlayingFile(fileKey);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  useEffect(() => {
  
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [audio]); 
  
  const isAudioFile = (fileKey) => {
    // Extract file extension
    const fileExtension = fileKey.split('.').pop();

    // List of audio file extensions you want to support
    const audioExtensions = ['mp3', 'wav', 'ogg', 'aac', 'flac'];

    // Check if the file extension is in the list of audio file extensions
    return audioExtensions.includes(fileExtension.toLowerCase());
  };
  

  // Function to extract the file name from the key
  const extractFileName = (key) => {
    const lastIndex = key.lastIndexOf("/");
    return key.substring(lastIndex + 1);
  };

  const fetchFiles = async () => {
    try {
      // Use Storage.list to get a list of objects in the project folder
      const response = await Storage.list(`projects/${realProjectId}/`);

      // Check if response.results is an array
      if (Array.isArray(response.results)) {
        // Use Promise.all to fetch additional details for each file
        const filesInFolder = await Promise.all(
          response.results.map(async (file) => {
            const details = await Storage.get(file.key);

            return {
              key: file.key,
              size: details.size, // Add size field
              lastModified: details.lastModified, // Add lastModified field
              ...details,
            };
          })
        );

        console.log("Files in folder:", filesInFolder); // Log the result

        // Update the state with the fetched files
        setFiles(filesInFolder);
      } else {
        console.error("Error fetching files: Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles(); // Fetch files when the component mounts
  }, []); // Empty dependency array to ensure it only runs once

  const handleDeleteIconClick = async () => {
    try {
      console.log("Selected files to delete:", selectedFiles);

      
      await Promise.all(
        selectedFiles.map(async (fileKey) => {
          await Storage.remove(fileKey); // Remove the file from S3
          handleRemoveFile(fileKey);
        })
      );

      // Clear selected files after deletion
      setSelectedFiles([]);

      // Fetch files after deletion
      await fetchFiles();
    } catch (error) {
      console.error("Error deleting files:", error);
    }
  };

  const handleDownloadIconClick = async () => {
    try {
      console.log("Selected files to download:", selectedFiles);

      
      const downloadPromises = selectedFiles.map(async (fileKey) => {
        try {
          const fileName = extractFileName(fileKey);
          const downloadUrl = await Storage.get(
            `projects/${realProjectId}/${fileName}`
          );
          return downloadUrl;
        } catch (storageError) {
          console.error(
            "Error getting download URL from Storage:",
            storageError
          );
          return null;
        }
      });

      const downloadUrls = await Promise.all(downloadPromises);

      console.log("Download URLs:", downloadUrls);

      // Automatically initiate download for each file
      for (const downloadUrl of downloadUrls) {
        if (downloadUrl) {
          window.open(downloadUrl, "_blank");
        }
      }
    } catch (error) {
      console.error("Error downloading files:", error);
    }
  };

  const handleRemoveFile = (fileKey) => {
    // Implement the logic to remove the file based on fileKey
    console.log("File removed successfully:", fileKey);
  };

  // const handleDownloadFile = (downloadUrl) => {
  //   // Implement the logic to handle file download
  //   console.log("Downloading file from:", downloadUrl);
  
  // };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="xl"
        sx={{ background: "#090810", marginTop: "0rem", paddingTop: "2rem" }}
      >
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
              Upload File
              <input
                type="file"
                onChange={async (event) => {
                  await handleFileUpload(event, realProjectId);
                  await fetchFiles(); // Fetch files after upload
                }}
                style={{ display: "none" }}
              />
            </Button>
          </Box>

          {/* Download and Delete Icons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
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
                  onChange={async (event) => {
                    await handleDeleteIconClick(event);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  style={{
                    color: "#FFFFFF",
                    cursor: "pointer",
                    marginRight: "8px",
                  }}
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
                      : files.map((file) => ({ ...file, id: file.key }))
                  )
                }
              />
            )}
            <ListItemText primary="Name" sx={{ color: "#FFFFFF", flex: 1 }} />
            {!isSmallScreen && (
              <>
                {/* <ListItemText
                  primary="Size"
                  sx={{ color: "#FFFFFF", flex: 1 }}
                />
                <ListItemText
                  primary="Last Modified"
                  sx={{ color: "#FFFFFF", flex: 1 }}
                /> */}
              </>
            )}
          </ListItem>
          <Divider sx={{ backgroundColor: "#FFFFFF" }} />

          {/* File List */}
          {files.map((file, index) => (
            <React.Fragment key={index}>
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
                  checked={selectedFiles.includes(file.key)}
                  onChange={() => handleCheckboxChange(file.key)}
                />
                <ListItemText
                  primary={extractFileName(file.key)}
                  sx={{ color: "#FFFFFF", flex: 1 }}
                />
                 {isAudioFile(file.key) && (
                <IconButton
                  style={{ color: "#FFFFFF", cursor: "pointer" }}
                  onClick={() => handlePlayPause(file.key)}
                >
                  {playingFile === file.key ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
              )}
                {!isSmallScreen && (
                  <>
                    <ListItemText
                      primary={file.lastModified}
                      sx={{ color: "#FFFFFF", flex: 1 }}
                    />
                    <ListItemText
                      primary={file.size}
                      sx={{ color: "#FFFFFF", flex: 1 }}
                    />
                  </>
                )}
                
                {console.log("File size:", file.size)}
                {console.log("File lastModified:", file.lastModified)}
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
