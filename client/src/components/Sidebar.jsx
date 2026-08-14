import React from "react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="workspace-name">
        <div className="workspace-icon">T</div>
        <span>Task Manager</span>
      </div>

      <nav className="sidebar-menu">
        <button className="sidebar-item active">
          <span>🏠</span>
          Home
        </button>

        <button className="sidebar-item">
          <span>📝</span>
          My Tasks
        </button>
        
        <button className="sidebar-item">
          <span>📅</span>
          Calendar
        </button>
      </nav>

      <div className="sidebar-section">
        <p>WORKSPACE</p>

        <button className="sidebar-item">
          <span>📚</span>
          Learning
        </button>

        <button className="sidebar-item">
          <span>💼</span>
          Work
        </button>

        <button className="sidebar-item">
          <span>🚀</span>
          Projects
        </button>
      </div>

      <div className="sidebar-bottom">
        <button className="sidebar-item">
          <span>⚙️</span>
          Settings
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;