import React, { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TaskFilters from "../components/TaskFilters";
import TaskTable from "../components/TaskTable";

function Dashboard() {
  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  // =========================
  // FETCH TASKS
  // =========================
  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");

      console.log("✅ Axios connected to backend");
      console.log("Tasks received from backend:", response.data);

      setTasks(response.data);
    } catch (error) {
      console.error("❌ Error fetching tasks:", error);

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Response:", error.response.data);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // =========================
  // CREATE TASK
  // =========================
  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tasks", {
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        dueDate: newTask.dueDate || null,
      });

      console.log("✅ Task created successfully");

      await fetchTasks();

      setShowCreateTask(false);

      setNewTask({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
      });
    } catch (error) {
      console.error("❌ Create task error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to create task"
      );
    }
  };

  // =========================
  // TOGGLE TASK
  // =========================
  const handleToggleTask = async (id) => {
    try {
      const task = tasks.find((task) => task._id === id);

      if (!task) return;

      await api.put(`/tasks/${id}`, {
        completed: !task.completed,
      });

      console.log("✅ Task status updated");

      await fetchTasks();
    } catch (error) {
      console.error("❌ Toggle task error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update task"
      );
    }
  };

  // =========================
  // EDIT TASK
  // =========================
  const handleEditTask = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/tasks/${editingTask._id}`, {
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate || null,
      });

      console.log("✅ Task edited successfully");

      await fetchTasks();

      setEditingTask(null);
    } catch (error) {
      console.error("❌ Edit task error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update task"
      );
    }
  };

  // =========================
  // DELETE TASK
  // =========================
  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);

      console.log("✅ Task deleted successfully");

      await fetchTasks();
    } catch (error) {
      console.error("❌ Delete task error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete task"
      );
    }
  };

  // =========================
  // FILTER TASKS
  // =========================
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Navbar onLogout={handleLogout} />

        <main className="dashboard">

          {/* HEADER */}
          <div className="page-header">
            <div>
              <div className="page-icon">📝</div>

              <h1>My Tasks</h1>

              <p>
                Manage your tasks and stay organized.
              </p>
            </div>

            <button
              className="new-task-button"
              onClick={() => setShowCreateTask(true)}
            >
              + New task
            </button>
          </div>

          {/* CREATE TASK */}
          {showCreateTask && (
            <div className="create-task-modal">
              <div className="create-task-form">

                <h2>Create New Task</h2>

                <form onSubmit={handleCreateTask}>

                  <input
                    type="text"
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        title: e.target.value,
                      })
                    }
                    required
                  />

                  <textarea
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        description: e.target.value,
                      })
                    }
                  />

                  <select
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        priority: e.target.value,
                      })
                    }
                  >
                    <option value="low">
                      Low
                    </option>

                    <option value="medium">
                      Medium
                    </option>

                    <option value="high">
                      High
                    </option>
                  </select>

                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        dueDate: e.target.value,
                      })
                    }
                  />

                  <div className="create-task-actions">

                    <button
                      type="button"
                      onClick={() =>
                        setShowCreateTask(false)
                      }
                    >
                      Cancel
                    </button>

                    <button type="submit">
                      Create Task
                    </button>

                  </div>

                </form>

              </div>
            </div>
          )}

          {/* EDIT TASK */}
          {editingTask && (
            <div className="create-task-modal">
              <div className="create-task-form">

                <h2>Edit Task</h2>

                <form onSubmit={handleEditTask}>

                  <input
                    type="text"
                    placeholder="Task title"
                    value={editingTask.title}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        title: e.target.value,
                      })
                    }
                    required
                  />

                  <textarea
                    placeholder="Description"
                    value={
                      editingTask.description || ""
                    }
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        description: e.target.value,
                      })
                    }
                  />

                  <select
                    value={
                      editingTask.priority ||
                      "medium"
                    }
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        priority: e.target.value,
                      })
                    }
                  >
                    <option value="low">
                      Low
                    </option>

                    <option value="medium">
                      Medium
                    </option>

                    <option value="high">
                      High
                    </option>
                  </select>

                  <input
                    type="date"
                    value={
                      editingTask.dueDate
                        ? editingTask.dueDate.split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        dueDate: e.target.value,
                      })
                    }
                  />

                  <div className="create-task-actions">

                    <button
                      type="button"
                      onClick={() =>
                        setEditingTask(null)
                      }
                    >
                      Cancel
                    </button>

                    <button type="submit">
                      Save Changes
                    </button>

                  </div>

                </form>

              </div>
            </div>
          )}

          {/* FILTERS */}
          <TaskFilters
            filter={filter}
            setFilter={setFilter}
          />

          {/* TASK TABLE */}
          <TaskTable
            tasks={filteredTasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onEdit={setEditingTask}
          />

        </main>
      </div>
    </div>
  );
}

export default Dashboard;