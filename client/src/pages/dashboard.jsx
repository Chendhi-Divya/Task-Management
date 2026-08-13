import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TaskFilters from "../components/TaskFilters";
import TaskTable from "../components/TaskTable";

function Dashboard() {
  const [filter, setFilter] = useState("all");

  // Temporary task data for UI development.
  // We will replace this with your backend data during Day 4.
  const [tasks, setTasks] = useState([
    {
      _id: "1",
      title: "Learn React",
      description: "Build Notion style frontend",
      completed: false,
      priority: "high",
      dueDate: null,
    },
    {
      _id: "2",
      title: "Learn Node.js",
      description: "Understand Express and APIs",
      completed: false,
      priority: "medium",
      dueDate: null,
    },
    {
      _id: "3",
      title: "Learn MongoDB",
      description: "Practice MongoDB and Mongoose",
      completed: true,
      priority: "low",
      dueDate: null,
    },
  ]);

  // Toggle task completed/uncompleted
  const handleToggleTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task._id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  // Delete task
  const handleDeleteTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task._id !== id)
    );
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div className="app-layout">

      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="main-area">

        {/* Top Navigation */}
        <Navbar onLogout={handleLogout} />

        {/* Dashboard Content */}
        <main className="dashboard">

          {/* Page Header */}
          <div className="page-header">

            <div>
              <div className="page-icon">
                📝
              </div>

              <h1>My Tasks</h1>

              <p>
                Manage your tasks and stay organized.
              </p>
            </div>

            <button
              className="new-task-button"
              onClick={() => alert("Create task feature coming in Day 4")}
            >
              + New task
            </button>

          </div>

          {/* Filters */}
          <TaskFilters
            filter={filter}
            setFilter={setFilter}
          />

          {/* Task Table */}
          <TaskTable
            tasks={filteredTasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />

        </main>
      </div>
    </div>
  );
}

export default Dashboard;