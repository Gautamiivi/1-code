import React, { useState, useEffect } from "react";
import AddTask from "../components/AddTask";
import InProgress from "../components/InProgress";
import Pending from "../components/Pending";
import QA from "../components/QA";
import Done from "../components/Done";
import { TaskProvider } from "../context/TaskContext";
import Split from "react-split";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useColorMode } from "../themes/ColorModeContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

interface UserProfile {
  _id: string;
  email: string;
  name?: string;
}

const Dashboard = () => {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get<UserProfile>("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const getInitials = (email: string, name?: string): string => {
    if (name) return name[0].toUpperCase();
    return email ? email[0].toUpperCase() : "U";
  };

  return (
    <TaskProvider>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        {/* ✅ Title Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            mb: 1,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Performance Tracker
          </Typography>

          {/* Right Icons */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Theme Toggle */}
            <IconButton onClick={toggleColorMode} color="inherit">
              {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            {/* Profile Icon */}
            <IconButton
              onClick={handleProfileClick}
              color="inherit"
              sx={{ ml: 1 }}
            >
              {loadingUser ? (
                <CircularProgress size={24} />
              ) : (
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {getInitials(user?.email ?? "", user?.name)}
                </Avatar>
              )}
            </IconButton>

            {/* Profile Menu */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle1">
                  {user ? user.email : "Unknown User"}
                </Typography>
              </Box>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* ✅ Split Layout */}
        <Split
          sizes={[20, 25, 20, 20, 15]}
          minSize={200}
          gutterSize={8}
          className="split"
          style={{ height: "100%", display: "flex" }}
        >
          <Box sx={columnStyle}>
            <AddTask />
          </Box>
          <Box sx={columnStyle}>
            <InProgress />
          </Box>
          <Box sx={columnStyle}>
            <Pending />
          </Box>
          <Box sx={columnStyle}>
            <QA />
          </Box>
          <Box sx={columnStyle}>
            <Done />
          </Box>
        </Split>
      </Box>
    </TaskProvider>
  );
};

const columnStyle = {
  overflow: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  p: 1,
  m: 0.1,
  transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    bgcolor: "custom.taskCard",
    boxShadow: "0 0 8px rgba(0,0,0,0.1)",
  },
};

export default Dashboard;
