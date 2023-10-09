import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2', // Change this to your primary color
    },
    secondary: {
      main: '#388E3C', // Change this to your secondary color
    },
    background: {
      paper: '#3B3C4B', // Change this to your desired background color
    },
    text: {
        primary: '#ffffff', // Set the text color to white
      },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Change this to your desired font
  },
});

export default theme;
