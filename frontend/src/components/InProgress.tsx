import { useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";
import { Box, Typography, Stack } from "@mui/material";
import TaskCard from "./TaskCard";

const InProgress = () => {
  const { tasks, activeTaskId, incrementTime } = useTaskContext();
  const activeTask = tasks.find((t) => t.id === activeTaskId);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (activeTask) {
      interval = setInterval(() => {
        incrementTime(activeTask.id);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [activeTask, incrementTime]);

  return (
    <Box className="column">
      <Typography variant="h6" gutterBottom className="column-title">
        In Progress
      </Typography>
      <Box className="scroll-area">
        <Stack spacing={1}>
          {activeTask ? (
            <TaskCard {...activeTask} />
          ) : (
            <Typography className="no-tasks">No active task.</Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default InProgress;
