import React from "react";

function Navbar({ onLogout, search, setSearch }) {
  const storedUser = localStorage.getItem("user");

  let user = null;

  if (storedUser) {
    try {
      user = JSON.parse(storedUser);
    } catch (error) {
      console.error("Unable to read user data:", error);
    }
  }

  const userName =
    user?.name ||
    user?.username ||
    user?.email ||
    "User";

  const firstLetter = userName
    .charAt(0)
    .toUpperCase();

  return (
    <header className="navbar">

      {/* =========================
          SEARCH
      ========================= */}
      <div className="search-box">

        <span>🔍</span>

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* =========================
          RIGHT SIDE
      ========================= */}
      <div className="navbar-right">

        {/* NOTIFICATION */}
        <button
          type="button"
          className="icon-button"
        >
          🔔
        </button>

        {/* USER */}
        <div className="user-menu">

          <div className="avatar">
            {firstLetter}
          </div>

          <span>
            {userName}
          </span>

          <button
            type="button"
            className="logout-button"
            onClick={onLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </header>
  );
}

export default Navbar;