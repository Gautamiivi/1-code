import AddTask from "../components/AddTask";
import InProgress from "../components/InProgress";
import Pending from "../components/Pending";
import QA from "../components/QA";
import Done from "../components/Done";
import { TaskProvider } from "../context/TaskContext";
import Split from "react-split";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useColorMode } from "../themes/ColorModeContext";

const Dashboard = () => {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

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
          {/* Title */}
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Performance Tracker
          </Typography>

          {/* Theme Toggle Button */}
          <IconButton onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

        {/* ✅ Split Layout */}
        <Split
          sizes={[20, 25, 20, 20, 15]}
          minSize={200}
          gutterSize={8}
          className="split"
          style={{ height: "100%", display: "flex" }}
        >
          <Box
            sx={{
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
            }}
          >
            <AddTask />
          </Box>

          <Box
            sx={{
              overflow: "auto",
              bgcolor: "background.paper",
              borderRadius: 2,
              p: 1,
              m: 0.1,
              "&:hover": {
                bgcolor: "custom.taskCard",
                boxShadow: "0 0 8px rgba(0,0,0,0.1)",
              },
            }}
          >
            <InProgress />
          </Box>

          <Box
            sx={{
              overflow: "auto",
              bgcolor: "background.paper",
              borderRadius: 2,
              p: 1,
              m: 0.1,
              "&:hover": {
                bgcolor: "custom.taskCard",
                boxShadow: "0 0 8px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Pending />
          </Box>

          <Box
            sx={{
              overflow: "auto",
              bgcolor: "background.paper",
              borderRadius: 2,
              p: 1,
              m: 0.1,
              "&:hover": {
                bgcolor: "custom.taskCard",
                boxShadow: "0 0 8px rgba(0,0,0,0.1)",
              },
            }}
          >
            <QA />
          </Box>

          <Box
            sx={{
              overflow: "auto",
              bgcolor: "background.paper",
              borderRadius: 2,
              p: 1,
              m: 0.1,
              "&:hover": {
                bgcolor: "custom.taskCard",
                boxShadow: "0 0 8px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Done />
          </Box>
        </Split>
      </Box>
    </TaskProvider>
  );
};

export default Dashboard;
