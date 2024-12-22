import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#775236",
        // light: '#ed6474'
      },
      secondary: {
        main: '#d7ccc3',
        // light: '#ffecab'
      },
      third: {
        main: '#8b6c54'
      }
    },
    typography: {
      fontFamily: ["Araboto-black", "Courier", "monospace"].join(","),
    },
  })
);

export default theme;