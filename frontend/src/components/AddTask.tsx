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
import { createTask } from "../utils/tasks"; // 🆕 API call

// ✅ Define allowed statuses
const allowedStatuses = ["addTask", "inProgress", "pending", "qa", "done"] as const;
type StatusType = (typeof allowedStatuses)[number];

const AddTask = () => {
  const { tasks, addTask } = useTaskContext();
  const addTaskTasks = tasks.filter((t) => t.status === "addTask");

  const [ticketNo, setTicketNo] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!ticketNo.trim() || !title.trim()) return;

    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const loggedInUserId = user?._id;
  
      // 🆕 Call backend API to save task
      const newTask = await createTask({
        ticketNo,
        title,
        status: "addTask", // Default status
        timeSpent: 0, 
        user:loggedInUserId,     // Default timeSpent
      });

      // ✅ Validate and cast backend status
      let safeStatus: StatusType;
      if (allowedStatuses.includes(newTask.status as StatusType)) {
        safeStatus = newTask.status as StatusType;
      } else {
        console.warn(`Invalid status received: ${newTask.status}, defaulting to "addTask"`);
        safeStatus = "addTask";
      }

      // 🆕 Update local context with new task
    await addTask({
        _id: String(newTask._id),
        ticketNo: newTask.ticketNo,
        title: newTask.title,
        status: safeStatus,
        timeSpent: newTask.timeSpent,
    });


      // Clear form
      setTicketNo("");
      setTitle("");
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task");
    } finally {
      setLoading(false);
    }
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
          sx={{ color: lightGreen }}
          variant="contained"
          color="primary"
          onClick={handleAdd}
          disabled={!ticketNo.trim() || !title.trim() || loading}
        >
          {loading ? "Adding..." : "Add Ticket"}
        </Button>
      </Stack>

      {/* List of Added Tasks */}
      <Box className="scroll-area" sx={{ mt: 1 }}>
        <Stack spacing={1}>
          {addTaskTasks.map((task) => (
            <TaskCard key={task._id} {...task} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default AddTask;
