import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { IconButton, Box, useTheme } from "@mui/material";
// import { Brightness4, Brightness7 } from "@mui/icons-material";
// import { useColorMode } from "./themes/ColorModeContext";

// ✅ Auth helper: check token presence
import { useState, useEffect } from "react";
const isAuthenticated = () => !!localStorage.getItem("token");

const App = () => {
  const [auth, setAuth] = useState(isAuthenticated());

  useEffect(() => {
    const handleStorageChange = () => {
      setAuth(isAuthenticated());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Box sx={{ position: "relative", minHeight: "100vh" }}>
        {/* 🚀 App Routes */}
        <Routes>
          <Route path="/" element={<Navigate to={auth ? "/dashboard" : "/login"} />} />
          <Route
            path="/login"
            element={auth ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={auth ? <Navigate to="/dashboard" /> : <Register />}
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
