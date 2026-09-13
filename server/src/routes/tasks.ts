import { Router } from "express";
import pool from "../db/index.ts";
import auth, { type AuthRequest } from "../middleware/auth";

const router = Router();

router.get("/", auth, async (req: AuthRequest, res) => {
  try {
    const householdId = req.user?.householdId;

    if (!householdId) {
      return res.status(400).json({
        error: "User does not belong to a household",
      });
    }

    const result = await pool.query(
      `SELECT
        tasks.*,
        users.email AS assigned_to_email
      FROM tasks
      JOIN users ON tasks.assigned_to = users.id
      WHERE tasks.household_id = $1
      ORDER BY tasks.created_at DESC`,
      [householdId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

router.post("/", auth, async (req: AuthRequest, res) => {
  try {
    const { title, time, assignedTo } = req.body;

    const householdId = req.user?.householdId;

    if (!householdId) {
      return res.status(400).json({
        error: "User does not belong to a household",
      });
    }

    const assignedUserResult = await pool.query(
      `SELECT id
      FROM users
      WHERE id = $1
      AND household_id = $2`,
      [assignedTo, householdId]
    );

    if (assignedUserResult.rows.length === 0) {
      return res.status(400).json({
        error: "Assigned user does not belong to your household",
      });
    }

    const result = await pool.query(
      `INSERT INTO tasks (household_id, assigned_to, title, time)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [householdId, assignedTo, title, time]
    );

    const task = result.rows[0];

    const userResult = await pool.query(
      `SELECT email
      FROM users
      WHERE id = $1`,
      [task.assigned_to]
    );

res.status(201).json({
  ...task,
  assigned_to_email: userResult.rows[0].email,
});

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add task" });
  }
});

router.patch("/:id", auth, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const householdId = req.user?.householdId;

    const result = await pool.query(
      `UPDATE tasks
      SET completed = $1
      WHERE id = $2
      AND household_id = $3
      RETURNING *`,
      [completed, id, householdId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    const task = result.rows[0];

    const userResult = await pool.query(
      `SELECT email
      FROM users
      WHERE id = $1`,
      [task.assigned_to]
    );

    res.json({
      ...task,
      assigned_to_email: userResult.rows[0].email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

router.delete("/:id", auth, async (req, res) => {
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