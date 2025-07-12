import React from "react";
import { useTaskContext } from "../context/TaskContext";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import BugReportIcon from "@mui/icons-material/BugReport";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

interface TaskCardProps {
  id: number;
  ticketNo: string;
  title: string;
  timeSpent: number;
  status: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  ticketNo,
  title,
  timeSpent,
  status,
}) => {
  const { moveTask, deleteTask } = useTaskContext();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <Card variant="outlined" className="task-card">
      <CardContent>
        <Typography variant="subtitle1" className="task-ticket">
          {ticketNo}
        </Typography>
        <Typography variant="body2" className="task-title">
          {title}
        </Typography>
        <Typography
          variant="caption"
          className={`task-time ${status === "inProgress" ? "active-time" : ""}`}
        >
          ⏱ {formatTime(timeSpent)}
        </Typography>

        <Stack direction="row" spacing={1} className="task-buttons">
          {status === "addTask" ? (
            <>
              <IconButton
                size="small"
                color="primary"
                onClick={() => moveTask(id, "inProgress")}
                title="Start Working"
              >
                <PlayArrowIcon />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={() => deleteTask(id)}
                title="Delete Task"
              >
                <DeleteIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                size="small"
                color={status === "inProgress" ? "primary" : "default"}
                onClick={() => moveTask(id, "inProgress")}
                title="Move to In Progress"
              >
                <PlayArrowIcon />
              </IconButton>
              <IconButton
                size="small"
                color={status === "pending" ? "warning" : "default"}
                onClick={() => moveTask(id, "pending")}
                title="Move to Pending"
              >
                <PauseIcon />
              </IconButton>
              <IconButton
                size="small"
                color={status === "qa" ? "secondary" : "default"}
                onClick={() => moveTask(id, "qa")}
                title="Move to QA"
              >
                <BugReportIcon />
              </IconButton>
              <IconButton
                size="small"
                color={status === "done" ? "success" : "default"}
                onClick={() => moveTask(id, "done")}
                title="Move to Done"
              >
                <CheckCircleIcon />
              </IconButton>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
