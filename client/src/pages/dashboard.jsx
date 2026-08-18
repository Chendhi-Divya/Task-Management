import React, { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TaskFilters from "../components/TaskFilters";
import TaskTable from "../components/TaskTable";
import DashboardStats from "../components/DashboardStats";

function Dashboard() {
  // =========================
  // TASK STATE
  // =========================
  const [tasks, setTasks] = useState([]);

  // =========================
  // FILTER STATE
  // =========================
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // =========================
  // MODAL STATE
  // =========================
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  // =========================
  // EMPTY TASK
  // =========================
  const emptyTask = {
    title: "",
    description: "",
    priority: "medium",
    category: "General",
    dueDate: "",
  };

  const [newTask, setNewTask] = useState(emptyTask);

  // =========================
  // FETCH TASKS
  // =========================
  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);

      alert(
        error.response?.data?.message ||
          "Failed to fetch tasks"
      );
    }
  };

  // =========================
  // FETCH TASKS ON PAGE LOAD
  // =========================
  useEffect(() => {
    fetchTasks();
  }, []);

  // =========================
  // CREATE TASK
  // =========================
  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!newTask.title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    const taskData = {
      title: newTask.title.trim(),
      description: newTask.description.trim(),
      priority: newTask.priority,
      category: newTask.category || "General",
      dueDate: newTask.dueDate || null,
    };

    try {
      const response = await api.post("/tasks", taskData);

      console.log("Task created:", response.data);

      setNewTask({ ...emptyTask });
      setShowCreateTask(false);

      await fetchTasks();
    } catch (error) {
      console.error("CREATE TASK ERROR:", error);

      if (error.response) {
        alert(
          error.response.data?.message ||
            "Failed to create task"
        );
      } else if (error.request) {
        alert(
          "Unable to connect to the server. Please make sure the backend is running."
        );
      } else {
        alert("Failed to create task.");
      }
    }
  };

  // =========================
  // TOGGLE TASK COMPLETION
  // =========================
  const handleToggleTask = async (id) => {
    try {
      const task = tasks.find(
        (task) => task._id === id
      );

      if (!task) {
        return;
      }

      await api.put(`/tasks/${id}`, {
        completed: !task.completed,
      });

      await fetchTasks();
    } catch (error) {
      console.error(
        "Error updating task:",
        error
      );

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

    if (!editingTask?.title?.trim()) {
      alert("Please enter a task title.");
      return;
    }

    try {
      await api.put(
        `/tasks/${editingTask._id}`,
        {
          title: editingTask.title.trim(),

          description:
            editingTask.description?.trim() || "",

          priority:
            editingTask.priority || "medium",

          category:
            editingTask.category || "General",

          dueDate:
            editingTask.dueDate || null,
        }
      );

      setEditingTask(null);

      await fetchTasks();
    } catch (error) {
      console.error(
        "Error editing task:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to edit task"
      );
    }
  };

  // =========================
  // OPEN DELETE CONFIRMATION
  // =========================
  const handleDeleteTask = (id) => {
    setDeleteTaskId(id);
  };

  // =========================
  // CONFIRM DELETE
  // =========================
  const confirmDelete = async () => {
    if (!deleteTaskId) {
      return;
    }

    try {
      await api.delete(
        `/tasks/${deleteTaskId}`
      );

      setDeleteTaskId(null);

      await fetchTasks();
    } catch (error) {
      console.error(
        "Error deleting task:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete task"
      );
    }
  };

  // =========================
  // SEARCH + STATUS FILTER
  // =========================
  const filteredTasks = tasks
    .filter((task) => {
      const searchText =
        search.toLowerCase().trim();

      const title =
        task.title?.toLowerCase() || "";

      const description =
        task.description?.toLowerCase() || "";

      const matchesSearch =
        title.includes(searchText) ||
        description.includes(searchText);

      const matchesStatus =
        filter === "all" ||
        (filter === "active" &&
          !task.completed) ||
        (filter === "completed" &&
          task.completed);

      return (
        matchesSearch &&
        matchesStatus
      );
    })
    .sort((a, b) => {
      return (
        Number(a.completed) -
        Number(b.completed)
      );
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

      {/* =========================
          SIDEBAR
      ========================= */}
      <Sidebar />

      <div className="main-area">

        {/* =========================
            NAVBAR
        ========================= */}
        <Navbar
          onLogout={handleLogout}
          search={search}
          setSearch={setSearch}
        />

        <main className="dashboard">

          {/* =========================
              PAGE HEADER
          ========================= */}
          <div className="page-header">

            <div>

              <div className="page-icon">
                📝
              </div>

              <h1>My Tasks</h1>

              <p>
                Manage your tasks and stay
                organized.
              </p>

            </div>

            <button
              className="new-task-button"
              type="button"
              onClick={() =>
                setShowCreateTask(true)
              }
            >
              + New task
            </button>

          </div>

          {/* =========================
              DASHBOARD STATISTICS
          ========================= */}
          <DashboardStats tasks={tasks} />

          {/* =========================
              CREATE TASK MODAL
          ========================= */}
          {/* =========================
    CREATE TASK MODAL
========================= */}
{showCreateTask && (
  <div className="create-task-modal">

    <div className="create-task-form">

      <h2>Create New Task</h2>

      <form onSubmit={handleCreateTask}>

        {/* TASK TITLE */}
        <div className="form-group">
          <label htmlFor="task-title" className="form-label">
            Task Title
          </label>

          <input
            id="task-title"
            type="text"
            placeholder="Enter task title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                title: e.target.value,
              })
            }
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="form-group">
          <label htmlFor="task-description" className="form-label">
            Description
          </label>

          <textarea
            id="task-description"
            placeholder="Enter task description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                description: e.target.value,
              })
            }
          />
        </div>

        {/* PRIORITY */}
        <div className="form-group">
          <label htmlFor="task-priority" className="form-label">
            Priority
          </label>

          <select
            id="task-priority"
            className="form-select"
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
        </div>

        {/* CATEGORY */}
        <div className="form-group">
          <label htmlFor="task-category" className="form-label">
            Category
          </label>

          <select
            id="task-category"
            className="form-select"
            value={newTask.category}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                category: e.target.value,
              })
            }
          >
            <option value="General">
              General
            </option>

            <option value="Work">
              Work
            </option>

            <option value="Personal">
              Personal
            </option>

            <option value="Study">
              Study
            </option>
          </select>
        </div>

        {/* DUE DATE */}
        <div className="form-group">
          <label htmlFor="task-due-date" className="form-label">
            Due Date
          </label>

          <input
            id="task-due-date"
            type="date"
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                dueDate: e.target.value,
              })
            }
          />
        </div>

        {/* ACTIONS */}
        <div className="create-task-actions">

          <button
            type="button"
            onClick={() => {
              setShowCreateTask(false);
              setNewTask({
                ...emptyTask,
              });
            }}
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

          {/* =========================
              EDIT TASK MODAL
          ========================= */}
          {editingTask && (
            <div className="create-task-modal">

              <div className="create-task-form">

                <h2>Edit Task</h2>

                <form
                  onSubmit={handleEditTask}
                >

                  {/* TITLE */}
                  <input
                    type="text"
                    placeholder="Task title"
                    value={
                      editingTask.title || ""
                    }
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        title:
                          e.target.value,
                      })
                    }
                    required
                  />

                  {/* DESCRIPTION */}
                  <textarea
                    placeholder="Description"
                    value={
                      editingTask.description ||
                      ""
                    }
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        description:
                          e.target.value,
                      })
                    }
                  />

                  {/* PRIORITY */}
                  <label className="form-label">
                    Priority
                  </label>

                  <select
                    className="form-select"
                    value={
                      editingTask.priority ||
                      "medium"
                    }
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        priority:
                          e.target.value,
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

                  {/* CATEGORY */}
                  <label className="category-label">
                    Category
                  </label>

                  <select
                    className="category-select"
                    value={
                      editingTask.category ||
                      "General"
                    }
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        category:
                          e.target.value,
                      })
                    }
                  >
                    <option value="General">
                      General
                    </option>

                    <option value="Work">
                      Work
                    </option>

                    <option value="Personal">
                      Personal
                    </option>

                    <option value="Study">
                      Study
                    </option>
                  </select>

                  {/* DUE DATE */}
                  <input
                    type="date"
                    value={
                      editingTask.dueDate
                        ? editingTask.dueDate.split(
                            "T"
                          )[0]
                        : ""
                    }
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        dueDate:
                          e.target.value,
                      })
                    }
                  />

                  {/* ACTIONS */}
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

          {/* =========================
              DELETE CONFIRMATION
          ========================= */}
          {deleteTaskId && (
            <div className="create-task-modal">

              <div className="create-task-form">

                <h2>Delete Task?</h2>

                <p>
                  Are you sure you want
                  to delete this task?
                </p>

                <div className="create-task-actions">

                  <button
                    type="button"
                    onClick={() =>
                      setDeleteTaskId(null)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={confirmDelete}
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          )}

          {/* =========================
              TASK STATUS FILTERS
          ========================= */}
          <TaskFilters
            filter={filter}
            setFilter={setFilter}
          />

          {/* =========================
              TASK TABLE
          ========================= */}
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