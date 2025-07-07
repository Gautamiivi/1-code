import { useEffect, useState } from "react";
import Split from "react-split";
import {
  Box, Typography, Paper, Card, CardContent, Button, Stack
} from "@mui/material";
import {
  PlayArrow, Pause, Replay, Done
} from "@mui/icons-material";
import {
  getUserTickets, startTicket, pauseTicket, resumeTicket, completeTicket
} from "../api/employeeApi";

interface Ticket {
  id: number;
  title: string;
  status: string;
  timeSpent: number;
}

const Dashboard = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const userId = 1; // Dummy user
  const sections = ["Assigned", "In Progress", "Pending", "QA", "Done"];

  const loadTickets = () => {
    getUserTickets(userId)
      .then(res => setTickets(res.data))
      .catch(err => console.error("Error fetching tickets:", err));
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleAction = async (id: number, action: string) => {
    try {
      if (action === "start") await startTicket(id);
      if (action === "pause") await pauseTicket(id);
      if (action === "resume") await resumeTicket(id);
      if (action === "complete") await completeTicket(id);
      loadTickets();
    } catch (err) {
      console.error(`Error performing ${action} on ticket ${id}:`, err);
    }
  };

  return (
    <Box sx={{ p: 2, height: "calc(100vh - 80px)" }}>
      <Typography variant="h4" gutterBottom>
        Employee profile dashboard
      </Typography>
      <Split
        className="split"
        sizes={[20, 20, 20, 20, 20]} // 5 columns equally divided
        minSize={150}
        gutterSize={8}
        expandToMin={false}
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        style={{ display: "flex", height: "100%" }}
      >
        {sections.map((section) => (
          <Paper
            key={section}
            elevation={3}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflowY: "auto"
            }}
          >
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ borderBottom: "1px solid #ddd", pb: 1 }}
            >
              {section}
            </Typography>
            {tickets
              .filter((t) => t.status === section)
              .map((t) => (
                <Card
                  key={t.id}
                  variant="outlined"
                  sx={{ mb: 2, bgcolor: "#f9f9f9" }}
                >
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {t.title}
                    </Typography>
                    <Typography variant="body2">Status: {t.status}</Typography>
                    <Typography variant="body2">
                      Time Spent: {t.timeSpent}s
                    </Typography>
                    <Stack direction="row" spacing={1} mt={1}>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<PlayArrow />}
                        onClick={() => handleAction(t.id, "start")}
                      >
                        Start
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="warning"
                        startIcon={<Pause />}
                        onClick={() => handleAction(t.id, "pause")}
                      >
                        Pause
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="info"
                        startIcon={<Replay />}
                        onClick={() => handleAction(t.id, "resume")}
                      >
                        Resume
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        startIcon={<Done />}
                        onClick={() => handleAction(t.id, "complete")}
                      >
                        Done
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
          </Paper>
        ))}
      </Split>
    </Box>
  );
};

export default Dashboard;
