import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2",
    },
    secondary: {
      main: "#090810",
    },
    info: {
      main: "#952D8A",
    },
    background: {
      paper: "#3B3C4B",
    },
    text: {
      primary: "#ffffff", // Set the text color to white
      placeholder: "#C8C7C7", // Set the color for placeholder text
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "white", // Set the checkbox color to white
        },
      },
    },
  },
});

export default theme;
