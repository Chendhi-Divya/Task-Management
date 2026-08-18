import React from "react";

function TaskRow({ task, onToggle, onDelete, onEdit }) {
  return (
    <div className="task-row">
      {/* Task */}
      <div className="task-name">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task._id)}
        />

        <div>
          <div className="task-title">
            {task.title}
          </div>

          {task.description && (
            <div className="task-description">
              {task.description}
            </div>
          )}
        </div>
      </div>

      {/* Priority */}
      <div className="task-priority">
        <span className={`priority ${task.priority || "medium"}`}>
          {task.priority || "medium"}
        </span>
      </div>

      {/* Category */}
      <div className="task-category">
        {task.category || "General"}
      </div>

      {/* Status */}
      <div className="task-status">
        {task.completed ? "Completed" : "Active"}
      </div>

      {/* Due Date */}
      <div className="task-date">
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "No date"}
      </div>

      {/* Actions */}
      <div className="task-actions">
        <button
          type="button"
          className="edit-button"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          type="button"
          className="task-delete-button"
          onClick={() => onDelete(task._id)}
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export default TaskRow;