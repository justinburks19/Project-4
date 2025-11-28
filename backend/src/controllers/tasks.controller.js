// controllers/tasks.controller.js
// traffic cop, for formating requests and responses
import {getAllTasks, createTask, getTaskById, updateTaskById, deleteTaskById} from '../services/tasks.service.js'; //svc is an object with methods for task operations

console.log('Tasks controller is now active, we have control of CRUD operations!✔️\n When tasks controller is active \n 🔽🔽🔽🔽 \n we will request from tasks services for the data.🖊️');

console.log('Tasks services,', Object.keys({getAllTasks, createTask, getTaskById, updateTaskById, deleteTaskById})); // return an array of object keys
// GET /api/tasks
//curl -X GET http://localhost:3000/api/tasks
export const getAllTasksController = async (request, respond) => {
  // Fetch all tasks from the service 
  //try to 
  try {
    const tasks = await getAllTasks();
    console.log('✅ Retrieved tasks was successful here they are!✅'); // log success message with number of tasks
    console.log(tasks);
    return respond.status(200).json(tasks); // return tasks as JSON response
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    respond.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST /api/tasks
/* curl `
  -Method POST `
  -Uri "http://localhost:3000/api/tasks" `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{
    "playerCard": "new player",
    "desc": "new description",
    "age": 30,
    "active": true
  }'


-H is for headers, we are setting the content type to application/json
-d is for data, we are sending a JSON object with playerCard, desc, age, active properties
*/
export const createTaskController = async (request, respond, next) => { //Standard Express middleware signature with next for error handling
  //focus on input validation for input data
  try {
    const created = await createTask(request.body); // create a new task with the request body data which contains playercard, desc, age, active
    console.log('✅ Created task: successful ✅', created); // Log the created task
    return (respond.status(201).json(created)) ; // return the created task with 201 status code
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.error('Validation Error creating task:', error);
      return respond.status(400).json({ error: error.message }); // return 400 Bad Request for validation errors
    }
    return next(error); // pass other errors to the error handling middleware will send 500 Internal Server Error
  }
};

// GET /api/tasks/:id
/* curl `
  -Method GET `
  -Uri "http://localhost:3000/api/tasks/ea6ff879-ba12-4059-9acc-9d411ec6165d"

  */
export const getTaskByIdController = async (request, respond) => {
  console.log('Fetching task with ID:', request.params.id); // log the requested task ID
  const task = await getTaskById(request.params.id);
  if (!task) return respond.status(404).json({ error: 'Task not found' });
  respond.json(task);
};


// PUT /api/tasks/:id  (replace)
/* curl `
  -Method PUT `
  -Uri "http://localhost:3000/api/tasks/82ae2ae5-2ecd-41af-838f-b67a33853d64" `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{
    "playerCard": "updated player",
    "desc": "updated description",
    "age": 35,
    "active": false
  }'

  */
export const updateTaskByIdController = async (request, respond) => {
  const exists = await getTaskById(request.params.id);
  if (!exists) return respond.status(404).json({ error: 'Task not found' });

  const updated = await updateTaskById(request.params.id, request.body);
  if (!updated) return respond.status(400).json({ error: 'Invalid body (playerCard required, desc required, age required, active required)' });
  respond.json(updated);
};

// DELETE /api/tasks/:id
  /* curl `
  -Method DELETE `
  -Uri "http://localhost:3000/api/tasks/fea18d39-6987-4e20-a52a-db31a818737a"
  */
  export const deleteTaskByIdController = async (request, respond) => {
  const removed = await deleteTaskById(request.params.id);
  if (!removed) return respond.status(404).json({ error: 'Task not found' });
  respond.status(204).end();
};
  
