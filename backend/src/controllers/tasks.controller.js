// controllers/tasks.controller.js
import svc from '../services/tasks.service.js';

console.log('svc keys:', Object.keys(svc));
// GET /api/tasks
export const getAllTasks = async (_req, res) => {
try{
  const tasks = await svc.getAllTasks();
  res.json(tasks ?? []);
  console.log('Retrieved tasks was successful' + (tasks ? `(${tasks.length} tasks)` : '(no tasks)'));
}
};

// POST /api/tasks
export const createTask = async (req, res) => {
  const created = await svc.createTask(req.body);
  if (!created) return res.status(400).json({ error: 'title is required (string)' });
  res.status(201).location(`/api/tasks/${created.id}`).json(created);
};

// GET /api/tasks/:id
export const getTaskById = async (req, res) => {
  const task = await svc.getTaskById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
};

// PUT /api/tasks/:id  (replace)
export const updateTaskById = async (req, res) => {
  const exists = await svc.getTaskById(req.params.id);
  if (!exists) return res.status(404).json({ error: 'Task not found' });

  const updated = await svc.updateTaskById(req.params.id, req.body);
  if (!updated) return res.status(400).json({ error: 'Invalid body (title required)' });
  res.json(updated);
};

// DELETE /api/tasks/:id
export const deleteTaskById = async (req, res) => {
  const removed = await svc.deleteTaskById(req.params.id);
  if (!removed) return res.status(404).json({ error: 'Task not found' });
  res.status(204).end();
};

// If you prefer an object:
export const ctrl = { getAllTasks, createTask, getTaskById, updateTaskById, deleteTaskById };
