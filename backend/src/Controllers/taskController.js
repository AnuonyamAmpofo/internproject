const db = require('../db');

// Fetch all tasks
const getAllTasks = async (req, res) => {
  try {
    const [tasks] = await db.query('SELECT * FROM tasks');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch one task by ID
const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const [task] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    if (task.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new task
const createTask = async (req, res) => {
  const { title, description, scheduled_time, tone_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO tasks (title, description, scheduled_time, tone_id, status) VALUES (?, ?, ?, ?, ?)',
      [title, description, scheduled_time, tone_id || 1, 'active']
    );
    res.status(201).json({ message: 'Task created successfully', taskId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing task
const updateTask = async (req, res) => {
  const { id, title, description, scheduled_time, tone_id } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE tasks SET title = ?, description = ?, scheduled_time = ?, tone_id = ? WHERE id = ?',
      [title, description, scheduled_time, tone_id, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel (deactivate) a task
const cancelTask = async (req, res) => {
  const { id } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE tasks SET status = ? WHERE id = ?',
      ['cancelled', id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Hard delete
const deleteTask = async (req, res) => {
    const { id } = req.body;
    try {
      const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  cancelTask,
  deleteTask
};
