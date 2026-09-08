import { Router } from "express";
import pool from "../db/index.ts";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT *
       FROM tasks
       WHERE household_id = $1
       ORDER BY created_at DESC`,
      [1]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, time, assignedTo } = req.body;

    const result = await pool.query(
      `INSERT INTO tasks (household_id, assigned_to, title, time)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [1, assignedTo, title, time]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add task" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const result = await pool.query(
      `UPDATE tasks
       SET completed = $1
       WHERE id = $2
       RETURNING *`,
      [completed, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
        
    const result = await pool.query(
      `DELETE FROM tasks
      WHERE id = $1
      RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found"});
    }

    res.json(result.rows[0]);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task" })
  }
});

export default router;