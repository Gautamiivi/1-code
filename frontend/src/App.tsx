import React from "react";
import Dashboard from "./components/Dashboard";
import { IconButton, Box, useTheme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useColorMode } from "./themes/ColorModeContext";

const App = () => {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  return (
    <Box sx={{ position: "relative" }}>
      {/* Theme Toggle Button */}
      <IconButton
        sx={{ position: "absolute", top: 16, right: 16 }}
        onClick={toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>

      {/* Dashboard */}
      <Dashboard />
    </Box>
  );
};

export default App;
