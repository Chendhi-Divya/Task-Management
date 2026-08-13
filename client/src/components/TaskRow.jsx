import React from "react";

function TaskRow({ task, onToggle, onDelete }) {
  return (
    <div className="task-row">

      <div className="task-name">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task._id)}
        />

        <div>
          <div
            className={
              task.completed
                ? "task-title completed"
                : "task-title"
            }
          >
            {task.title}
          </div>

          {task.description && (
            <div className="task-description">
              {task.description}
            </div>
          )}
        </div>
      </div>

      <div className="task-priority">
        <span
          className={`priority ${task.priority}`}
        >
          {task.priority || "medium"}
        </span>
      </div>

      <div className="task-status">
        {task.completed ? "Completed" : "Active"}
      </div>

      <div className="task-date">
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "No date"}
      </div>

      <div className="task-actions">
        <button
          onClick={() => onDelete(task._id)}
          className="delete-button"
        >
          🗑
        </button>
      </div>

    </div>
  );
}

export default TaskRow;