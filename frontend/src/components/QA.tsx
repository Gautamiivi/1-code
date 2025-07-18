import { useTaskContext } from "../context/TaskContext";
import { Box, Typography, Stack } from "@mui/material";
import TaskCard from "./TaskCard";

const QA = () => {
  const { tasks } = useTaskContext();
  const qaTasks = tasks.filter((t) => t.status === "qa");

  return (
    <Box className="column">
      <Typography variant="h6" gutterBottom className="column-title">
        QA
      </Typography>
      <Box className="scroll-area">
        <Stack spacing={1}>
          {qaTasks.length > 0 ? (
            qaTasks.map((task) => (
              <TaskCard key={task.id} {...task} />
            ))
          ) : (
            <Typography className="no-tasks">
              No QA tasks.
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default QA;
