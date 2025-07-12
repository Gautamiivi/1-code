// src/theme.ts
import { createTheme } from "@mui/material/styles";

// Extend palette
declare module "@mui/material/styles" {
  interface Palette {
    custom?: {
      taskCard?: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      taskCard?: string;
    };
  }
}

const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#1976d2",
        light: "#90caf9",
        dark: "#1565c0",
      },
      background: {
        default: mode === "light" ? "#f5f5f5" : "#2e2e2e",
        paper: mode === "light" ? "#ffffff" : "#424242",
      },
      text: {
        primary: mode === "light" ? "#212121" : "#ffffff",
        secondary: mode === "light" ? "#616161" : "#cccccc",
      },
      custom: {
        taskCard: mode === "light" ? "#ffffff" : "#424242",
      },
    },
    typography: {
      fontFamily: '"Roboto", system-ui, Avenir, Helvetica, Arial, sans-serif',
      h1: {
        fontSize: "2.5rem",
        lineHeight: 1.2,
        color: mode === "light" ? "#212121" : "#ffffff",
      },
      h2: {
        color: mode === "light" ? "#424242" : "#f5f5f5",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: "0.6em 1.4em",
            textTransform: "none",
            fontWeight: 500,
            transition: "background-color 0.25s ease, transform 0.1s ease",
            "&:hover": {
              backgroundColor: "#1565c0",
              transform: "scale(1.03)",
            },
            "&:focus": {
              outline: "3px solid #90caf9",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#ffffff" : "#424242",
            borderRadius: 12,
            boxShadow:
              mode === "light"
                ? "0 2px 8px rgba(0, 0, 0, 0.1)"
                : "0 2px 8px rgba(0, 0, 0, 0.2)",
            padding: "1rem",
            margin: "0.5rem",
            "&:hover": {
              boxShadow:
                mode === "light"
                  ? "0 4px 20px rgba(0, 0, 0, 0.1)"
                  : "0 4px 20px rgba(255, 255, 255, 0.05)",
            },
          },
        },
      },
    },
  });

export default getTheme;
