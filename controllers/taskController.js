const Task = require('../models/task');
const User = require('../models/user');

// Task controller methods
exports.createTask = async (req, res) => {
    try {
        const { title, description, userId, dueDate } = req.body;
    
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        const newTask = new Task({
          title,
          description,
          userId,
          dueDate
        });
    
        const task = await newTask.save();
        console.log('Database Connected');

        // Associate the task with the user
        user.tasks.push(task._id);
        console.log('Database Connected');

        // await user.save();
        // console.log('Database Connected');

    
        res.status(200).json(task);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    
  
  exports.getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  exports.getTaskById = async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const task = await Task.findById(taskId);
      if (!task) {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.json(task);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  exports.updateTask = async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const { title, description, dueDate, completed } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { title, description, dueDate, completed },
        { new: true }
      );
      if (!updatedTask) {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.json(updatedTask);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  exports.deleteTask = async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const deletedTask = await Task.findByIdAndRemove(taskId);
      if (!deletedTask) {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.json(deletedTask);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };