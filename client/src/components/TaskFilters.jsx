import React from "react";

function TaskFilters({ filter, setFilter }) {
  return (
    <div className="task-filters">
      <button
        className={filter === "all" ? "filter active" : "filter"}
        onClick={() => setFilter("all")}
      >
        All
      </button>

      <button
        className={filter === "active" ? "filter active" : "filter"}
        onClick={() => setFilter("active")}
      >
        Active
      </button>

      <button
        className={filter === "completed" ? "filter active" : "filter"}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
}

export default TaskFilters;