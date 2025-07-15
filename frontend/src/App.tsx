import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { IconButton, Box, useTheme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useColorMode } from "./themes/ColorModeContext";

// ✅ Auth helper: check token presence
const isAuthenticated = () => !!localStorage.getItem("token");

const App = () => {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  return (
    <Router>
      <Box sx={{ position: "relative", minHeight: "100vh" }}>
        {/* 🌙 Theme Toggle Button */}
        <IconButton
          sx={{ position: "absolute", top: 16, right: 16 }}
          onClick={toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {/* 🚀 App Routes */}
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
          <Route
            path="/login"
            element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Register />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
