import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    text: {
      primary: "#FFFFFF",
      secondary: "#FFFFFF80",
    },

    primary: {
      main: "#FFFFFF",
    },

    secondary: {
      main: "#62626280", // рамка інпутів
    },

    action: {
      active: "#844831",
      hover: "#B76547",
      disabled: "#C4CCC4",
    },

    background: {
      default: "#18181A", // фони де нема градієнту
      paper: "#272727", // картки граців
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif", // базовий шрифт для всього, крім h1/h2

    h1: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 400,
      fontSize: "24px", // xs

      [`@media (min-width:600px)`]: {
        fontSize: "40px", // sm
      },
      lineHeight: "100%",
      letterSpacing: "0%",
      textAlign: "center",
    },

    h2: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 400,
      fontSize: "20px", // xs

      [`@media (min-width:600px)`]: {
        fontSize: "32px", // sm
      },
      lineHeight: "100%",
      letterSpacing: "0%",
    },

    body1: {
      fontWeight: 400,
      fontSize: "16px", // xs

      [`@media (min-width:600px)`]: {
        fontSize: "20px", // sm
      },
      lineHeight: 1.2,
    },

    body2: { fontWeight: 300, fontSize: "24px", lineHeight: 1 },

    button: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "100%",
      textTransform: "none",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1536,
    },
  },
});
