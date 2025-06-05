const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static "API is running" page
app.use(express.static(path.join(__dirname, 'public')));

// File path for tasks storage
const tasksFile = path.join(__dirname, 'tasks.json');

// Helper function to read tasks from JSON file
async function readTasks() {
  try {
    const data = await fs.readFile(tasksFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return default tasks
    return [
      { id: 1, title: 'Buy groceries', completed: false },
      { id: 2, title: 'Read a book', completed: true }
    ];
  }
}

// Helper function to write tasks to JSON file
async function writeTasks(tasks) {
  await fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2));
}

// GET /api/tasks - Return all tasks
app.get('/api/tasks', async (req, res) => {
  const tasks = await readTasks();
  res.json(tasks);
});

// POST /api/tasks - Add a new task
app.post('/api/tasks', async (req, res) => {
  const { title } = req.body;
  // Validation: title must not be empty
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required and cannot be empty' });
  }
  const tasks = await readTasks();
  const newTask = {
    id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title: title.trim(),
    completed: false
  };
  tasks.push(newTask);
  await writeTasks(tasks);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id - Mark task as completed
app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const tasks = await readTasks();
  const task = tasks.find(t => t.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  task.completed = true;
  await writeTasks(tasks);
  res.json(task);
});

// DELETE /api/tasks/:id - Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  let tasks = await readTasks();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks = tasks.filter(t => t.id !== parseInt(id));
  await writeTasks(tasks);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});