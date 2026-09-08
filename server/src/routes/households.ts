import { Router } from "express";
import pool from "../db";
import auth, { type AuthRequest } from "../middleware/auth";

const router = Router();

router.post("/", auth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        error: "Authentication required",
      });
    }

    const userResult = await pool.query(
      `SELECT household_id
      FROM users
      WHERE id = $1`,
      [userId]
    );

    if (userResult.rows[0]?.household_id) {
      return res.status(400).json({
        error: "User already belongs to a household",
      });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "Household name is required",
      });
    }

    const inviteCode = Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase();

    const householdResult = await pool.query(
      `INSERT INTO households (name, invite_code)
       VALUES ($1, $2)
       RETURNING *`,
      [name, inviteCode]
    );

    const household = householdResult.rows[0];

    await pool.query(
      `UPDATE users
       SET household_id = $1
       WHERE id = $2`,
      [household.id, userId]
    );

    res.status(201).json(household);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create household",
    });
  }
});

router.post("/join", auth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        error: "Authentication required",
      });
    }

    const userResult = await pool.query(
      `SELECT household_id
      FROM users
      WHERE id = $1`,
      [userId]
    );

    if (userResult.rows[0]?.household_id) {
      return res.status(400).json({
        error: "User already belongs to a household",
      });
    }

    const { inviteCode } = req.body;

    if (!inviteCode) {
      return res.status(400).json({
        error: "Invite code is required",
      });
    }

    const householdResult = await pool.query(
      `SELECT *
       FROM households
       WHERE invite_code = $1`,
      [inviteCode.toUpperCase()]
    );

    if (householdResult.rows.length === 0) {
      return res.status(404).json({
        error: "Household not found",
      });
    }

    const household = householdResult.rows[0];

    await pool.query(
      `UPDATE users
       SET household_id = $1
       WHERE id = $2`,
      [household.id, userId]
    );

    res.json(household);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to join household",
    });
  }
});

router.get("/me", auth, async (req: AuthRequest, res) => {
  try {
    const householdId = req.user?.householdId;

    if (!householdId) {
      return res.status(400).json({
        error: "User does not belong to a household",
      });
    }

    const householdResult = await pool.query(
      `SELECT id, name, invite_code
       FROM households
       WHERE id = $1`,
      [householdId]
    );

    if (householdResult.rows.length === 0) {
      return res.status(404).json({
        error: "Household not found",
      });
    }

    const membersResult = await pool.query(
      `SELECT id, email
       FROM users
       WHERE household_id = $1
       ORDER BY id`,
      [householdId]
    );

    res.json({
      household: householdResult.rows[0],
      members: membersResult.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch household",
    });
  }
});

router.patch("/:id", auth, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const householdId = req.user?.householdId;

    if (!householdId) {
      return res.status(400).json({
        error: "User does not belong to a household",
      });
    }

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

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update task",
    });
  }
});

router.delete("/:id", auth, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const householdId = req.user?.householdId;

    if (!householdId) {
      return res.status(400).json({
        error: "User does not belong to a household",
      });
    }

    const result = await pool.query(
      `DELETE FROM tasks
       WHERE id = $1
       AND household_id = $2
       RETURNING *`,
      [id, householdId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete task",
    });
  }
});

export default router;