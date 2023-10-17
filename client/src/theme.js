import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2', 
    },
    secondary: {
      main: '#090810', 
    },
    info: {
      main: '#952D8A', 
    },
    background: {
      paper: '#3B3C4B', 
    },
    text: {
        primary: '#ffffff', // Set the text color to white
        placeholder: '#C8C7C7', // Set the color for placeholder text
      },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Change this to your desired font
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "white", // Set the color to white or any other desired color
        },
      },
    },
  },
  
});

export default theme;
