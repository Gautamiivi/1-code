import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import TaskCard from "./TaskCard";
import { lightGreen } from "@mui/material/colors";

const AddTask = () => {
  const { tasks, addTask } = useTaskContext();
  const addTaskTasks = tasks.filter((t) => t.status === "addTask");

  const [ticketNo, setTicketNo] = useState("");
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!ticketNo.trim() || !title.trim()) return;
    addTask({ ticketNo, title });
    setTicketNo("");
    setTitle("");
  };

  return (
    <Box className="column">
      <Typography variant="h6" gutterBottom className="column-title">
        Add Task
      </Typography>

      {/* Add New Task Form */}
      <Stack spacing={1} className="form-section">
        <TextField
          size="small"
          label="Ticket No"
          value={ticketNo}
          onChange={(e) => setTicketNo(e.target.value)}
          fullWidth
        />
        <TextField
          size="small"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <Button
        sx={{color:lightGreen}}
          variant="contained"
          color="primary"
          onClick={handleAdd}
          disabled={!ticketNo.trim() || !title.trim()}
        >
          Add Ticket
        </Button>
      </Stack>

      {/* List of Added Tasks */}
      <Box className="scroll-area" sx={{mt:1}}>
        <Stack spacing={1}>
          {addTaskTasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default AddTask;
