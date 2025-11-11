// src/services/tasks.service.js

//step 6, implement the business logic for each CRUD operation

let storage = [
    {id: 1, title: 'baseball', completed: false, description: 'play baseball on Saturday'},
    {id: 2, title: 'soccer', completed: true, description: 'soccer game on Sunday'},
    {id: 3, title: 'basketball', completed: false, description: 'basketball practice on Monday'},

]; // in-memory storage for tasks
let idCounter = storage.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1; // initialize idCounter to one more than the current max ID
//let idCounter = storage.length + 1; // simple counter to assign unique IDs if i didnt have to delete tasks

// Get all tasks
const getAllTasks = async () => {
    return storage;
};

// Create a new task
// activatedd by POST /api/tasks
const createTask = async (taskData) => {
    
    const newTask = { id: idCounter++, ...taskData }; // assign a new ID and then make a copy of all properties from taskData
    storage.push(newTask); // add the new task to storage
    return newTask;
};

// Get a task by ID
// activated by GET /api/tasks/:id
const getTaskById = async (id) => {
    const task = parseInt(id, 10); // convert id to integer, base of 10
    if (Number.isNaN(task)) return null; // if Number as in not a number, return null
    return storage.find(t => t.id === task) || null; // find and return the task with the matching ID or null if not found
};

// Update/ Replace a task by ID
// activated by PUT /api/tasks/:id
// we can also display the new update task after updating
const updateTaskById = async (id, taskData = {}) => {
    const taskID = parseInt(id, 10); // convert id to integer, base of 10
    if (Number.isNaN(taskID)) return null; // if Number as in not a number, return null
    const index = storage.findIndex(t => t.id === taskID); // find the index of the task with the matching ID
    if (index < 0 ) return null; // if not found, return null
    const updatedTask = { id: taskID, ...taskData }; // create the updated task object
    storage[index] = updatedTask; // replace the task in storage
    return updatedTask; // return the updated task

};

// Delete a task by ID. we can also return the deleted task if needed
// activated by DELETE /api/tasks/:id
const deleteTaskById = async (id) => {
    const taskID = parseInt(id, 10); // convert id to integer, base of 10
    if (Number.isNaN(taskID)) return false; // if Number as in not a number, return false
    const index = storage.findIndex(t => t.id === taskID); // find the index of the task with the matching ID

    if (index < 0 ) return false; // if not found, return false
    const [deletedTask] = storage.splice(index, 1); // remove the task from storage
    return deletedTask || null; // return true if deleted, else null

};

export default {
    getAllTasks,
    createTask,
    getTaskById,
    updateTaskById,
    deleteTaskById
};