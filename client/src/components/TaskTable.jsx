import React from "react";
import TaskRow from "./TaskRow";

function TaskTable({ tasks, onToggle, onDelete }) {
  return (
    <div className="task-table">

      <div className="task-table-header">
        <div>Task</div>
        <div>Priority</div>
        <div>Status</div>
        <div>Due date</div>
        <div></div>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No tasks found</h3>
          <p>
            Create your first task to get started.
          </p>
        </div>
      ) : (
        tasks.map((task) => (
          <TaskRow
            key={task._id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}

    </div>
  );
}

export default TaskTable;