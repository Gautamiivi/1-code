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
import { Brightness4, Brightness7, CalendarToday, Videocam, VideocamOff } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [meetingTime, setMeetingTime] = useState(0);
  const [isMeeting, setIsMeeting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get<UserProfile>("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        setUser(null);
        localStorage.removeItem("token"); // 🆕 logout if token is invalid
        navigate("/login", { replace: true });
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
    navigate("/login", { replace: true });
  };

  const handleMeetingToggle = () => {
    setIsMeeting((prev) => !prev);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isMeeting) {
      interval = setInterval(() => {
        setMeetingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isMeeting]);

  const getInitials = (email: string, name?: string): string => {
    if (name) return name[0].toUpperCase();
    return email ? email[0].toUpperCase() : "U";
  };

  if (loadingUser) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TaskProvider selectedDate={selectedDate} isMeeting={isMeeting}>
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
            {/* Meeting Timer */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mr: 2 }}>
              <IconButton onClick={handleMeetingToggle} color="inherit">
                {isMeeting ? <VideocamOff /> : <Videocam />}
              </IconButton>
              {isMeeting && (
                <Typography variant="caption">
                  {new Date(meetingTime * 1000).toISOString().substr(11, 8)}
                </Typography>
              )}
            </Box>
            {/* Date Picker */}
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              customInput={
                <IconButton color="inherit">
                  <CalendarToday />
                </IconButton>
              }
            />
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
              <Avatar sx={{ bgcolor: "primary.main" }}>
                {getInitials(user?.email ?? "", user?.name)}
              </Avatar>
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
          sizes={[20, 22, 20, 19, 19]}
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
