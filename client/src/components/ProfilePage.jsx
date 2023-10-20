import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Modal,
  Paper,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { FIND_USER, FIND_PROFILE_BY_ID } from "../utils/queries";
import { ADD_PROFILE, UPDATE_PROFILE } from "../utils/mutations";
import theme from "../theme";

const ProfilePage = () => {
  const userId = localStorage.getItem("userId");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(FIND_USER, {
    variables: { id: userId },
  });

  const user = userData ? userData.findUser : null;

  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [links, setLinks] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [currentProfile, setCurrentProfile] = useState(null);

  const {
    loading: profileLoading,
    error: profileError,
    data: profileData,
    refetch: refetchProfile,
  } = useQuery(FIND_PROFILE_BY_ID, {
    variables: { userId },
    skip: !openModal || userLoading || !user || !user.id,
  });

  useEffect(() => {
    // Fetch user profile
    const fetchUserProfile = async () => {
      if (user && user.id) {
        try {
          const result = await refetchProfile({ userId: user.id });
          if (result && result.data && result.data.findProfileById) {
            setCurrentProfile(result.data.findProfileById);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [user, refetchProfile]);

  useEffect(() => {
    console.log("Profile Data:", profileData);
    // Check if profileData has been fetched and update state
    if (profileData && profileData.findProfileById) {
      setCurrentProfile(profileData.findProfileById);
    }
  }, [profileData]);

  const [addProfile] = useMutation(ADD_PROFILE, {
    refetchQueries: [
      { query: FIND_USER, variables: { id: userId } },
      { query: FIND_PROFILE_BY_ID, variables: { userId } },
    ],
    onCompleted: (data) => {
      // Update profile after adding a new profile
      if (data && data.addProfile) {
        setCurrentProfile(data.addProfile);
      }
    },
  });

  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    refetchQueries: [
      { query: FIND_USER, variables: { id: userId } },
      { query: FIND_PROFILE_BY_ID, variables: { userId } },
    ],
    onCompleted: (data) => {
      // Update profile after updating
      if (data && data.updateProfile) {
        setCurrentProfile(data.updateProfile);
      }
    },
  });

  const handleOpenModal = () => {
    // Set the modal fields with currentProfile values when the modal opens
    setLocation(currentProfile ? currentProfile.location : "");
    setBio(currentProfile ? currentProfile.bio : "");
    setImage(currentProfile ? currentProfile.image : "");
    setLinks(currentProfile ? currentProfile.links : []);

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleProfileAction = async () => {
    try {
      if (currentProfile) {
        // If a profile already exists, update it
        await updateProfile({
          variables: {
            userId,
            location,
            bio,
            image,
            links,
          },
        });
      } else {
        // If no profile exists, add a new one
        await addProfile({
          variables: {
            userId,
            location,
            bio,
            image,
            links,
          },
        });
      }

      setLocation("");
      setBio("");
      setImage("");
      setLinks([]);

      handleCloseModal();
    } catch (error) {
      console.error("Error handling profile action:", error);
    }
  };

  if (userLoading) return <p>Loading user...</p>;
  if (userError) return <p>Error fetching user: {userError.message}</p>;

  console.log("Current Profile:", currentProfile);

  return (
    <Container
      maxWidth="md"
      style={{
        marginTop: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {user && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <div>
              {currentProfile && currentProfile.image && (
                <img
                  src={currentProfile.image}
                  alt={`${user.username}'s profile`}
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    marginRight: "1rem",
                  }}
                />
              )}
            </div>
            <div>
              <Typography variant="h4" style={{ color: "#FFFFFF" }}>
                {user.username}'s Profile
              </Typography>
            </div>
          </div>
          {currentProfile && (
            <>
              <Typography
                variant="h5"
                style={{ color: "#FFFFFF", marginBottom: "1rem" }}
              >
                {currentProfile.location}
              </Typography>
              <Typography
                variant="body1"
                style={{ color: "#FFFFFF", marginBottom: "1rem" }}
              >
                <strong>Bio:</strong> {currentProfile.bio}
              </Typography>
            </>
          )}
          <div>
            {currentProfile ? (
              <Button
                variant="contained"
                color="info"
                onClick={handleOpenModal}
                style={{ alignSelf: "flex-end" }}
              >
                Update Profile
              </Button>
            ) : (
              <Button
                variant="contained"
                color="info"
                onClick={handleOpenModal}
                style={{ alignSelf: "flex-end" }}
              >
                Create Profile
              </Button>
            )}
          </div>
        </>
      )}

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
            {currentProfile ? "Update Profile" : "Create Profile"}
          </Typography>
          <form>
            <TextField
              label="Location"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
              label="Bio"
              multiline
              fullWidth
              value={bio}
              onChange={(e) => setBio(e.target.value)}
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
              label="Image URL"
              fullWidth
              value={image}
              onChange={(e) => setImage(e.target.value)}
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
              onClick={handleProfileAction}
              style={{ marginTop: "16px" }}
            >
              {currentProfile ? "Update Profile" : "Create Profile"}
            </Button>
          </form>
        </Paper>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
