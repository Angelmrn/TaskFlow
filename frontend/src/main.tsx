import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App.tsx";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0f0f0f",
      paper: "#1a1a1a",
    },
    primary: {
      main: "#75b8e6",
      light: "#33c3ff",
      dark: "#316b92",
    },
    secondary: {
      main: "#7992b8",
    },
    error: {
      main: "#a82020",
      light: "#a54848",
      dark: "#dc2626",
    },
    text: {
      primary: "#ffffff",
      secondary: "#a0a0a0",
    },
    divider: "rgba(255,255,255,0.08)",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(255,255,255,0.06)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: "rgba(255,255,255,0.2)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: "none",
          border: "1px solid rgba(255,255,255,0.08)",
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
