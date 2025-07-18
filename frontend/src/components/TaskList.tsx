import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: string;
  timeSpent: number;
}

interface Props {
  tasks: Task[];
}

const TaskList: React.FC<Props> = ({ tasks }) => {
  return (
    <Grid container spacing={2}>
      {tasks.map((task) => (
        <Grid component="div" item xs={12} sm={6} md={4} key={task._id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{task.title}</Typography>
              <Typography variant="body2">{task.description}</Typography>
              <Typography variant="caption">Status: {task.status}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskList;
