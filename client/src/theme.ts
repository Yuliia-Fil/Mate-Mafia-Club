import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    text: {
      primary: "#FFFFFF",
      secondary: "#FFFFFF80",
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
      fontSize: "40px",
      lineHeight: "100%",
      letterSpacing: "0%",
      textAlign: "center",
    },

    h2: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 400,
      fontSize: "32px",
      lineHeight: "100%",
      letterSpacing: "0%",
    },

    body1: { fontWeight: 400, fontSize: "20px", lineHeight: 1 },

    button: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
      fontSize: "16px",
    },
  },
});
