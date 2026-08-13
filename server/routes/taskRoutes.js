const express = require("express");
const Task = require("../models/Task");
const protect = require("../middleware/authMiddleware");

const router = express.Router();


// ==========================================
// CREATE TASK
// POST /api/tasks
// ==========================================

router.post("/", protect, async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      category,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      category,
      user: req.user,
    });

    res.status(201).json(task);

  } catch (error) {
    console.error("Create task error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ==========================================
// GET ALL MY TASKS
// GET /api/tasks
// ==========================================

router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(tasks);

  } catch (error) {
    console.error("Get tasks error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ==========================================
// GET ONE TASK
// GET /api/tasks/:id
// ==========================================

router.get("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);

  } catch (error) {
    console.error("Get task error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ==========================================
// UPDATE TASK
// PUT /api/tasks/:id
// ==========================================

router.put("/:id", protect, async (req, res) => {
  try {
    const {
      title,
      description,
      completed,
      priority,
      dueDate,
      category,
    } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.completed = completed ?? task.completed;
    task.priority = priority ?? task.priority;
    task.dueDate = dueDate ?? task.dueDate;
    task.category = category ?? task.category;

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);

  } catch (error) {
    console.error("Update task error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ==========================================
// DELETE TASK
// DELETE /api/tasks/:id
// ==========================================

router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    console.error("Delete task error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


module.exports = router;