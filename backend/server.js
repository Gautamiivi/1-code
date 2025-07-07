import express from "express";
import cors from "cors";

const app = express();
const PORT = 5001;

// Enable CORS for all origins
app.use(cors({ origin: "*" }));

// Parse incoming JSON requests
app.use(express.json());

// Dummy employee data
const employees = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" }
];

// Dummy tickets data
const tickets = [
  { id: 101, userId: 1, title: "Fix API bug", status: "Assigned", timeSpent: 0 },
  { id: 102, userId: 1, title: "Design Dashboard UI", status: "In Progress", timeSpent: 1200 },
  { id: 103, userId: 2, title: "QA Testing", status: "Pending", timeSpent: 3600 }
];

// Health check route
app.get("/", (req, res) => {
  res.send("✅ Backend is up and running!");
});

// Get all employees
app.get("/api/users", (req, res) => {
  res.status(200).json(employees);
});

// Get all tickets for a specific user
app.get("/api/users/:id/tickets", (req, res) => {
  const userTickets = tickets.filter(t => t.userId === parseInt(req.params.id));
  res.status(200).json(userTickets);
});

// Start a ticket
app.post("/api/tickets/:id/start", (req, res) => {
  const ticket = tickets.find(t => t.id === parseInt(req.params.id));
  if (ticket) {
    ticket.status = "In Progress";
    res.status(200).json({ message: "Ticket started", ticket });
  } else {
    res.status(404).json({ message: "Ticket not found" });
  }
});

// Pause a ticket
app.post("/api/tickets/:id/pause", (req, res) => {
  const ticket = tickets.find(t => t.id === parseInt(req.params.id));
  if (ticket) {
    ticket.status = "Pending";
    res.status(200).json({ message: "Ticket paused", ticket });
  } else {
    res.status(404).json({ message: "Ticket not found" });
  }
});

// Resume a ticket
app.post("/api/tickets/:id/resume", (req, res) => {
  const ticket = tickets.find(t => t.id === parseInt(req.params.id));
  if (ticket) {
    ticket.status = "In Progress";
    res.status(200).json({ message: "Ticket resumed", ticket });
  } else {
    res.status(404).json({ message: "Ticket not found" });
  }
});

// Complete a ticket
app.post("/api/tickets/:id/complete", (req, res) => {
  const ticket = tickets.find(t => t.id === parseInt(req.params.id));
  if (ticket) {
    ticket.status = "Done";
    res.status(201).json({ message: "Ticket completed", ticket });
  } else {
    res.status(404).json({ message: "Ticket not found" });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("💥 Unhandled error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
