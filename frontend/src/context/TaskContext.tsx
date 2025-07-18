import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchTasks, deleteTask as apiDeleteTask, updateTask as apiUpdateTask } from "../utils/tasks"; // 👈 Added updateTask import

// ✅ Allowed statuses
const allowedStatuses = ["addTask", "inProgress", "pending", "qa", "done"] as const;
export type StatusType = typeof allowedStatuses[number];

interface Task {
  _id: string; // MongoDB _id is string
  ticketNo: string;
  title: string;
  status: StatusType;
  timeSpent: number; // seconds
}

interface TaskContextType {
  tasks: Task[];
  activeTaskId: string | null;
  addTask: (task: Task) => void; // ❗ No Promise<void> needed
  moveTask: (id: string, status: Task["status"]) => void;
  setActiveTask: (id: string | null) => void;
  incrementTime: (id: string) => void;
  deleteTask: (id: string) => Promise<void>;
}


const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode; selectedDate: Date | null; isMeeting: boolean }> = ({ children, selectedDate, isMeeting }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTaskId, setActiveTask] = useState<string | null>(null);

  // ✅ Fetch tasks from backend on load
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksFromBackend = await fetchTasks(selectedDate);
        setTasks(
          tasksFromBackend.map((task: any) => ({
            _id: task._id,
            ticketNo: task.ticketNo,
            title: task.title,
            status: task.status,
            timeSpent: task.timeSpent,
          }))
        );
        const activeTask = tasksFromBackend.find(
          (t: any) => t.status === "inProgress"
        );
        if (activeTask) {
          setActiveTask(activeTask._id);
        }
      } catch (err) {
        console.error("❌ Failed to load tasks:", err);
      }
    };
    loadTasks();
  }, [selectedDate]);

  useEffect(() => {
    if (isMeeting) {
      const activeTask = tasks.find((t) => t.status === "inProgress");
      if (activeTask) {
        moveTask(activeTask._id, "pending");
      }
    }
  }, [isMeeting]);

  // ✅ Add a new task (sync with backend)
const addTask = async (task: Task): Promise<void> => {
  try {
    setTasks((prev) => [...prev, task]);
  } catch (err) {
    console.error("Failed to add task:", err);
    alert("Could not add task");
  }
};



  // ✅ Delete a task (sync with backend)
  const deleteTask = async (id: string) => {
    try {
      await apiDeleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("❌ Failed to delete task:", err);
      alert("Could not delete task");
    }
  };

  // ✅ Move task to a different section (sync with backend)
  const moveTask = async (taskId: string, newStatus: StatusType) => {
    try {
      console.log(`⏩ Moving task ${taskId} to ${newStatus}`);
  
      if (!allowedStatuses.includes(newStatus)) {
        throw new Error(`Invalid status: ${newStatus}`);
      }
  
      // If moving to "inProgress", check for an existing active task
      if (newStatus === "inProgress") {
        const currentActiveTask = tasks.find((t) => t.status === "inProgress");
        if (currentActiveTask && currentActiveTask._id !== taskId) {
          // Move the old active task to "pending"
          await apiUpdateTask(currentActiveTask._id, { status: "pending" });
        }
        setActiveTask(taskId); // Set new active task
      } else if (activeTaskId === taskId) {
        // If moving the active task out of "inProgress", stop the timer
        setActiveTask(null);
      }
  
      // Update the task's status
      const updatedTask = await apiUpdateTask(taskId, { status: newStatus });
  
      // Reload all tasks to ensure consistency
      const tasksFromBackend = await fetchTasks(selectedDate);
      const newTasks = tasksFromBackend.map((task: any) => ({
        _id: task._id,
        ticketNo: task.ticketNo,
        title: task.title,
        status: task.status,
        timeSpent: task.timeSpent,
      }));
      const movedTask = newTasks.find((t: any) => t._id === taskId);
      const otherTasks = newTasks.filter((t: any) => t._id !== taskId);
      if (movedTask) {
        setTasks([movedTask, ...otherTasks]);
      } else {
        setTasks(newTasks);
      }
  
    } catch (err: any) {
      console.error("❌ Error updating task:", err);
      alert("Failed to update task. Check your backend API.");
    }
  };

  // ✅ Increment time for a specific task (local only)
  const incrementTime = async (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, timeSpent: t.timeSpent + 1 } : t
      )
    );
    const task = tasks.find((t) => t._id === id);
    if (task) {
      await apiUpdateTask(id, { timeSpent: task.timeSpent + 1 });
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        activeTaskId,
        addTask,
        moveTask,
        setActiveTask,
        incrementTime,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// ✅ Hook to use context
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within TaskProvider");
  }
  return context;
};
