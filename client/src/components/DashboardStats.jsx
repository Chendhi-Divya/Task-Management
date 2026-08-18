function DashboardStats({ tasks }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const activeTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const overdueTasks = tasks.filter((task) => {
    if (!task.dueDate || task.completed) return false;

    return new Date(task.dueDate) < new Date();
  }).length;

  return (
    <div className="dashboard-stats">
      <div className="stat-card">
        <div className="stat-info">
          <h3>{totalTasks}</h3>
          <p>Total Tasks</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <h3>{activeTasks}</h3>
          <p>Active Tasks</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <h3>{completedTasks}</h3>
          <p>Completed Tasks</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <h3>{overdueTasks}</h3>
          <p>Overdue Tasks</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;