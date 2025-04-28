const express = require('express');
const router = express.Router();
const taskController = require('../Controllers/taskController');

// Define routes
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.post('/update', taskController.updateTask);
router.post('/cancel', taskController.cancelTask);

module.exports = router;
