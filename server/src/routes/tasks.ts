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
    res.status(500).json({ error: String(error) });
  }
});

export default router;