import { useTaskContext } from "../context/TaskContext";
import { Box, Typography, Stack } from "@mui/material";
import TaskCard from "./TaskCard";

const Done = () => {
  const { tasks } = useTaskContext();
  const doneTasks = tasks.filter((t) => t.status === "done");

  return (
    <Box className="column">
      <Typography variant="h6" gutterBottom className="column-title">
        Done
      </Typography>
      <Box className="scroll-area">
        <Stack spacing={1}>
          {doneTasks.length > 0 ? (
            doneTasks.map((task) => (
              <TaskCard key={task.id} {...task} />
            ))
          ) : (
            <Typography variant="body2" className="no-tasks">
              No completed tasks.
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default Done;
