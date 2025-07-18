import api from "../utils/axios";

export const createTask = async (taskData: {
  ticketNo: string;
  title: string;
  status: string;
  timeSpent: number;
  user: string; // 👈 Add user here
}) => {
  const res = await api.post("/tasks", taskData);
  return res.data; // returns the created task
};

export const fetchTasks = async (date: Date | null) => {
  const res = await api.get("/tasks", {
    params: { date: date?.toISOString() },
  });
  return res.data; // returns array of tasks
};

export const deleteTask = async (taskId: string) => {
  await api.delete(`/tasks/${taskId}`);
};

// ✅ NEW: Update task status
export const updateTask = async (taskId: string, updates: { status?: string; timeSpent?: number }) => {
  const res = await api.put(`/tasks/${taskId}`, updates);
  return res.data; // returns updated task
};
