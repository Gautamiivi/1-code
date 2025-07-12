import React, { createContext, useContext, useState } from "react";

interface Task {
  id: number;
  ticketNo: string;
  title: string;
  status: "addTask" | "inProgress" | "pending" | "qa" | "done";
  timeSpent: number; // seconds
}

interface TaskContextType {
  tasks: Task[];
  activeTaskId: number | null;
  addTask: (task: Omit<Task, "id" | "status" | "timeSpent">) => void;
  moveTask: (id: number, status: Task["status"]) => void;
  setActiveTask: (id: number | null) => void;
  incrementTime: (id: number) => void;
  deleteTask: (id: number) => void;

}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTaskId, setActiveTask] = useState<number | null>(null);

  // ✅ Add a new task
  const addTask = (task: Omit<Task, "id" | "status" | "timeSpent">) => {
    const newTask: Task = {
      id: Date.now(),
      ...task,
      status: "addTask",
      timeSpent: 0,
    };
    setTasks((prev) => [...prev, newTask]);
  };
  const deleteTask = (id: number) => {
  setTasks((prev) => prev.filter((t) => t.id !== id));
};


  // ✅ Move task to a different section
  const moveTask = (id: number, status: Task["status"]) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );

    if (status === "inProgress") {
      // Only one active task at a time
      if (activeTaskId && activeTaskId !== id) {
        // Move old active task to Pending
        setTasks((prev) =>
          prev.map((t) =>
            t.id === activeTaskId ? { ...t, status: "pending" } : t
          )
        );
      }
      setActiveTask(id);
    } else if (activeTaskId === id) {
      setActiveTask(null); // Clear active task if moved out of In Progress
    }
  };

  // ✅ Increment time for a specific task
  const incrementTime = (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, timeSpent: t.timeSpent + 1 } : t
      )
    );
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
