const express = require('express');
const router = express.Router();//creates a router object from the Express module

const taskController = require('../controllers/taskController');

// Routes for tasks
router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:taskId', taskController.getTaskById);
router.put('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;
