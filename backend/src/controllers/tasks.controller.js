// controllers/tasks.controller.js
// traffic cop, for formating requests and responses
import svc from '../services/tasks.service.js'; //svc is an object with methods for task operations

console.log('svc keys:', Object.keys(svc)); // return an array of object keys
// GET /api/tasks
//curl -X GET http://localhost:3000/api/tasks
export const getAllTasks = async (request, respond) => {
  // Fetch all tasks from the service 
  //try to 
  try {
    const tasks = await svc.getAllTasks();
    console.log('Retrieved tasks was successful here they are!'); // log success message with number of tasks
    console.log(tasks);
    return respond.status(200).json(tasks); // return tasks as JSON response
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    respond.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST /api/tasks
//curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"playercard":"new player","desc":"new description","age":29,"active":true}'
export const createTask = async (request, respond, next) => {
  //focus on input validation for input data
  try {
    const created = await svc.createTask(request.body); // create a new task with the request body data which contains playercard, desc, age, active
    console.log('Created task: successful', created); // Log the created task
    return respond.status(201).json(created.id); // return the created task with 201 status code
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.error('Validation Error creating task:', error);
      return respond.status(400).json({ error: error.message }); // return 400 Bad Request for validation errors
    }
    return next(error); // pass other errors to the error handling middleware will send 500 Internal Server Error
  }
};

// GET /api/tasks/:id
export const getTaskById = async (request, respond) => {
  const task = await svc.getTaskById(request.params.id);
  if (!task) return respond.status(404).json({ error: 'Task not found' });
  respond.json(task);
};

// PUT /api/tasks/:id  (replace)
export const updateTaskById = async (request, respond) => {
  const exists = await svc.getTaskById(request.params.id);
  if (!exists) return respond.status(404).json({ error: 'Task not found' });

  const updated = await svc.updateTaskById(request.params.id, request.body);
  if (!updated) return respond.status(400).json({ error: 'Invalid body (title required)' });
  respond.json(updated);
};

// DELETE /api/tasks/:id
export const deleteTaskById = async (request, respond) => {
  const removed = await svc.deleteTaskById(request.params.id);
  if (!removed) return respond.status(404).json({ error: 'Task not found' });
  respond.status(204).end();
};

// If you prefer an object:
export const ctrl = { getAllTasks, createTask, getTaskById, updateTaskById, deleteTaskById };
