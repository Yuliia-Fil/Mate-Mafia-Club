import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App.tsx";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { theme } from "./data/theme.ts";
import "../index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router basename="/Mate-Mafia-Club/">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Router>
  </StrictMode>
);
