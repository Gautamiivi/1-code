import { useTaskContext } from "../context/TaskContext";
import { Box, Typography, Stack } from "@mui/material";
import TaskCard from "./TaskCard";

const Pending = () => {
  const { tasks } = useTaskContext();
  const pendingTasks = tasks.filter((t) => t.status === "pending");

  return (
    <Box className="column">
      <Typography variant="h6" gutterBottom className="column-title">
        Pending
      </Typography>
      <Box className="scroll-area">
        <Stack spacing={1}>
          {pendingTasks.length > 0 ? (
            pendingTasks.map((task) => (
              <TaskCard key={task.id} {...task} />
            ))
          ) : (
            <Typography className="no-tasks">
              No pending tasks.
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default Pending;
